'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

export async function login(formData: FormData) {
    const supabase = await createClient()

    const validatedFields = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { error } = await supabase.auth.signInWithPassword(validatedFields.data)

    if (error) {
        return { error: { server: [error.message] } }
    }

    return { success: true }
}