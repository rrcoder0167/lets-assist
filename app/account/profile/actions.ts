'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const onboardingSchema = z.object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters').optional(),
    username: z.string().min(3, 'Username must be at least 3 characters').optional(),
    avatarUrl: z.string().optional(), // Changed to accept string instead of File
})

export type OnboardingValues = z.infer<typeof onboardingSchema>

export async function completeOnboarding(formData: FormData) {
    const supabase = await createClient()
    const userId = (await supabase.auth.getUser()).data.user?.id

    const validatedFields = onboardingSchema.safeParse({
        fullName: formData.get('fullName') || undefined,
        username: formData.get('username') || undefined,
        avatarUrl: formData.get('avatarUrl') || undefined,
    })

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }
    
    const { fullName, username, avatarUrl } = validatedFields.data;
    
    // Create an update object with only provided fields
    const updateFields: { full_name?: string; username?: string; avatar_url?: string; updated_at?: string } = {};
    if (fullName) updateFields.full_name = fullName;
    if (username) updateFields.username = username;
    
    if (avatarUrl && avatarUrl.startsWith('data:image')) {
        // Handle base64 image upload
        const base64Str = avatarUrl.split(',')[1];
        const buffer = Buffer.from(base64Str, 'base64');
        const fileName = `${userId}-${Date.now()}.jpg`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, buffer, {
                contentType: 'image/jpeg',
                upsert: false,
                cacheControl: '0',
            });
        
        if (uploadError) {
            console.log(uploadError)
            return { error: { avatarUrl: ['Failed to upload avatar'] } }
        }
        
        const { data: publicUrlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName)

        const timestamp = Date.now()
        updateFields.avatar_url = `${publicUrlData.publicUrl}?v=${timestamp}`
    }
    
    updateFields.updated_at = new Date().toISOString()

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
