'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export async function signup(formData: FormData) {
  const validatedFields = signupSchema.safeParse({
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
      

      if (authError || !user) {
        console.log(authError)
        throw authError
      }
      console.log('here')
      // 2. Generate temporary username from user ID
      const tempUsername = `user_${user.id.slice(0, 8)}`
      console.log(tempUsername)

      // 3. Create matching profile with temporary username
      const { error: profileError } = await supabase
          .from('profiles')
          .insert({
              id: user.id,
              username: tempUsername,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
          })

      if (profileError) {
        console.log(profileError)
        throw profileError
      }

      return { success: true }
  } catch (error) {
      return { error: { server: [(error as Error).message] } }
  }
}