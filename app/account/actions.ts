'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const onboardingSchema = z.object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters').optional(),
    avatarUrl: z.instanceof(File).optional(),
})

export type OnboardingValues = z.infer<typeof onboardingSchema>

export async function completeOnboarding(formData: FormData) {
    const avatarFile = formData.get('avatarUrl') as File | null; // --- Changed: allow null

    const supabase = await createClient()
    const userId = (await supabase.auth.getUser()).data.user?.id

    const validatedFields = onboardingSchema.safeParse({
        fullName: formData.get('fullName'),
        username: formData.get('username'),
        avatarUrl: avatarFile || undefined, // --- Changed: if no file, pass undefined
    })

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    let avatarUrl: string | null = null
    if (validatedFields.data.avatarUrl) { // Use validated avatarUrl
        const avatarFile = validatedFields.data.avatarUrl
        const fileExt = avatarFile.name.split('.').pop()
        const fileName = `${validatedFields.data.username}_${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, avatarFile)
        
        if (uploadError) {
            console.log(uploadError)
            return { error: { avatarUrl: ['Failed to upload avatar'] } }
        }

        const { data: publicUrlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName)
        avatarUrl = publicUrlData.publicUrl
    }

    const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
            id: userId,
            full_name: validatedFields.data.fullName,
            username: validatedFields.data.username,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString()
        })

    if (upsertError) {
        console.log(upsertError)
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
