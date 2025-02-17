"use server"

import { createClient } from '@/utils/supabase/server'

export async function deleteAccount() {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
            throw new Error("No user found")
        }

        // Delete from public.profiles first
        const { error: profileError } = await supabase
            .from('profiles')
            .delete()
            .eq('id', user.id)

        if (profileError) {
            throw new Error(`Failed to delete profile: ${profileError.message}`)
        }

        // Sign out first to invalidate session
        await supabase.auth.signOut()

        // Delete user account
        const { error: userError } = await supabase.rpc('delete_user')

        if (userError) {
            throw new Error(`Failed to delete user: ${userError.message}`)
        }
        
        return { success: true }
    } catch (error) {
        throw error
    }
}