'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const signupSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export async function signup(formData: FormData) {
  const validatedFields = signupSchema.safeParse({
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      password: formData.get('password'),
  })

  if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors }
  }

  const supabase = await createClient()

  try {
      // 1. Create auth user
      const { data: { user }, error: authError } = await supabase.auth.signUp({
            email: validatedFields.data.email,
            password: validatedFields.data.password,
            options: {
                data: {
                    created_at: new Date().toISOString()
                }
            }
        })

      if (authError) {
        if (authError.message.includes('User already registered')) {
          return { error: { server: ['ACCEXISTS0'] } }
        }
        throw authError
      }

      if (!user) {
        throw new Error('No user returned')
      }

      // 2. Create matching profile with full name
      const { error: profileError } = await supabase
          .from('profiles')
          .insert({
              id: user.id,
              full_name: validatedFields.data.fullName,
              username: `user_${user.id?.slice(0, 8)}`, // --- Changed: default username
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
          })

      if (profileError) {
        console.log(profileError)
        throw profileError
      }

      return { success: true }
  } catch (error) {
      if (error instanceof Error && error.message.includes('User already registered')) {
        return { error: { server: ['ACCEXISTS0'] } }
      }
      return { error: { server: [(error as Error).message] } }
  }
}