'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const onboardingSchema = z.object({
    firstName: z.string().min(1, 'First name must be at least 1 character'),
    lastName: z.string().min(1, 'Last name must be at least 1 character'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    avatarUrl: z.string().optional(),
})

export type OnboardingValues = z.infer<typeof onboardingSchema>

export async function completeOnboarding(formData: FormData) {
    const validatedFields = onboardingSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
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
                first_name: validatedFields.data.firstName,
                last_name: validatedFields.data.lastName,
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
