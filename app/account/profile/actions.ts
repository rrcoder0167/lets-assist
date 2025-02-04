'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const onboardingSchema = z.object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters').optional(), // changed: optional update
    username: z.string().min(3, 'Username must be at least 3 characters').optional(),   // changed: optional update
    avatarUrl: z.instanceof(File).optional(),
})

export type OnboardingValues = z.infer<typeof onboardingSchema>

export async function completeOnboarding(formData: FormData) {
    const avatarFile = formData.get('avatarUrl') as File | null;

    const supabase = await createClient()
    const userId = (await supabase.auth.getUser()).data.user?.id

    const validatedFields = onboardingSchema.safeParse({
        fullName: formData.get('fullName') || undefined, // changed: use undefined when empty
        username: formData.get('username') || undefined,   // changed: use undefined when empty
        avatarUrl: avatarFile || undefined,                // changed: if no file, pass undefined
    })

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }
    
    // Destructure validated fields.
    const { fullName, username, avatarUrl: avatarFileInput } = validatedFields.data;
    // Early return if no changes provided.
    if (!fullName && !username && !avatarFileInput) {
        return { error: { server: ['No changes provided'] } } // changed: no update if no new values
    }
    
    // Create an update object with only provided fields.
    const updateFields: { full_name?: string; username?: string; avatar_url?: string; updated_at?: string } = {};
    if (fullName) updateFields.full_name = fullName;
    if (username) updateFields.username = username;
    
    if (avatarFileInput) {
        const fileExt = avatarFileInput.name.split('.').pop()
        // Fallback username if not provided.
        const fileName = `${username || 'user'}_${Date.now()}.${fileExt}` // changed: use provided username or fallback
        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, avatarFileInput)
        
        if (uploadError) {
            console.log(uploadError)
            return { error: { avatarUrl: ['Failed to upload avatar'] } }
        }
        
        const { data: publicUrlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName)
        updateFields.avatar_url = publicUrlData.publicUrl // changed: assign uploaded avatar URL if provided
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
