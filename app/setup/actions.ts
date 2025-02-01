'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const onboardingSchema = z.object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    avatarUrl: z.string().optional(),
})

export type OnboardingValues = z.infer<typeof onboardingSchema>

export async function completeOnboarding(formData: FormData) {
    const avatarFile = formData.get('avatarUrl') as File;
    if (avatarFile && avatarFile.size > 5 * 1024 * 1024) { // 5MB limit
        return { error: { avatarUrl: ['Avatar file size must be less than 5MB'] } }
    }

    const validatedFields = onboardingSchema.safeParse({
        fullName: formData.get('fullName'),
        username: formData.get('username'),
        avatarUrl: formData.get('avatarUrl'),
    })

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const supabase = await createClient()
    
    // New: Check if username is unique
    const { data: existingUser, error: selectError } = await supabase
        .from('users')
        .select('username')
        .eq('username', validatedFields.data.username)
        .maybeSingle()
        
    if (selectError) {
        return { error: { server: ['Failed to check username uniqueness'] } }
    }
    
    if (existingUser) {
        return { error: { username: ['Username is already taken'] } }
    }

    try {
        const { error } = await supabase
            .from('users')
            .upsert({
                full_name: validatedFields.data.fullName,
                username: validatedFields.data.username,
                avatar_url: validatedFields.data.avatarUrl,
                updated_at: new Date().toISOString(),
            })

        if (error) throw error
        
        return { success: true }
    } catch (error) {
        return { error: { server: ['Failed to update profile'] } }
    }
}

export async function checkUsernameUnique(username: string) {
    const supabase = await createClient()
    const { data: existingUser, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle()
    if (error) {
        return { available: false, error: error.message }
    }
    return { available: !existingUser }
}
