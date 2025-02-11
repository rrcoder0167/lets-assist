'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const onboardingSchema = z.object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters').optional(),
    username: z.string().min(3, 'Username must be at least 3 characters').optional(),
    avatarUrl: z.instanceof(File).optional(),
})

export type OnboardingValues = z.infer<typeof onboardingSchema>

export async function completeOnboarding(formData: FormData) {
    const avatarFile = formData.get('avatarUrl') as File | null;

    const supabase = await createClient()
    const userId = (await supabase.auth.getUser()).data.user?.id

    const validatedFields = onboardingSchema.safeParse({
        fullName: formData.get('fullName') || undefined,
        username: formData.get('username') || undefined,
        avatarUrl: avatarFile || undefined,
    })

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }
    
    // Destructure validated fields.
    const { fullName, username, avatarUrl: avatarFileInput } = validatedFields.data;
    // Early return if no changes provided.
    
    // Create an update object with only provided fields.
    const updateFields: { full_name?: string; username?: string; avatar_url?: string; updated_at?: string } = {};
    if (fullName) updateFields.full_name = fullName;
    if (username) updateFields.username = username;
    
    if (avatarFileInput) {
        const fileExt = avatarFileInput.name.split('.').pop()
        const fileName = `${userId}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, avatarFileInput, {
                upsert: false,
                cacheControl: '0', // Disable caching on Supabase side
            });
        
        if (uploadError) {
            console.log(uploadError)
            return { error: { avatarUrl: ['Failed to upload avatar'] } }
        }
        
        const { data: publicUrlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName)

        // Add timestamp to URL to bust browser cache
        const timestamp = Date.now()
        updateFields.avatar_url = `${publicUrlData.publicUrl}?v=${timestamp}`
    }
    
    // Always update timestamp if any change is present.
    updateFields.updated_at = new Date().toISOString()

    // Changed: use update() to patch only provided fields so that missing fields are not overwritten.
    const { error: updateError } = await supabase
        .from('profiles')
        .update(updateFields)
        .eq('id', userId)

    if (updateError) {
        console.log(updateError)
        return { error: { server: ['Failed to update profile'] } }
    }
    return { success: true }
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
