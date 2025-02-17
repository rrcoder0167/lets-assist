"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function AuthenticationPage() {
    const [isConnecting, setIsConnecting] = useState(false)
    const [isGoogleConnected, setIsGoogleConnected] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        checkGoogleConnection()
    }, [])

    const checkGoogleConnection = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const { identities } = user
            const isGoogleLinked = identities?.some(identity => identity.provider === 'google') ?? false
            setIsGoogleConnected(isGoogleLinked)
        }
    }

    const handleGoogleConnect = async () => {
        setIsConnecting(true)
        try {
            if (isGoogleConnected) {
                // Future: Implement disconnect functionality
                toast.error('Disconnecting accounts is not yet supported')
                return
            }

            const { data: { url }, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?from=authentication`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            })

            if (error) throw error
            if (url) window.location.href = url
            
        } catch (error) {
            console.error('Error connecting Google account:', error)
            toast.error('Failed to connect Google account. Please try again.')
        } finally {
            setIsConnecting(false)
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="container mx-auto py-6 max-w-7xl">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Authentication</h1>
                        <p className="text-muted-foreground">
                            Manage your connected accounts and sign-in methods
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Connected Accounts</CardTitle>
                            <CardDescription>
                                Connect your accounts for a seamless sign-in experience
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <svg 
                                        className="h-6 w-6" 
                                        aria-hidden="true" 
                                        focusable="false" 
                                        data-prefix="fab" 
                                        data-icon="google" 
                                        role="img" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 488 512"
                                    >
                                        <path 
                                            fill="currentColor" 
                                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                        />
                                    </svg>
                                    <div>
                                        <h4 className="text-sm font-semibold">Google Account</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {isGoogleConnected 
                                                ? "Your account is connected with Google" 
                                                : "Connect your account with Google for easier sign-in"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Button 
                                        variant={isGoogleConnected ? "outline" : "default"}
                                        onClick={handleGoogleConnect}
                                        disabled={isConnecting}
                                    >
                                        {isConnecting ? "Connecting..." : 
                                         isGoogleConnected ? "Connected" : "Connect"}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Two-Factor Authentication</CardTitle>
                            <CardDescription>
                                Add an extra layer of security to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">Authenticator App</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Use an authenticator app to generate two-factor codes
                                    </p>
                                </div>
                                <Button variant="outline" disabled>
                                    Coming Soon
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    )
}