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
    
    // Here you would update the user's profile in your database
    // This is just a placeholder for the actual implementation
    try {
        const { error } = await supabase
            .from('profiles')
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
