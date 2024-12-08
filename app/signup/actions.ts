'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const validatedFields = signupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { error } = await supabase.auth.signUp(validatedFields.data)

  if (error) {
    return { error: { server: [error.message] } }
  }
  return { success: true }

  
}