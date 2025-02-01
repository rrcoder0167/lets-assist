import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
// app/auth/confirm/route.ts

export async function GET(request: NextRequest) {
  console.log('confirm route')
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'
  
  if (!token_hash || !type) {
    redirect('/error?message=Missing confirmation parameters')
  }

  const supabase = await createClient()
  
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  })
  

  if (error) {
    console.error('Verification error:', error)
    redirect('/error?message=' + encodeURIComponent(error.message))
  }

  redirect(`${next}?confirmed=true`)
}