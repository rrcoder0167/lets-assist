'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { login } from './actions'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Toaster, toast } from 'sonner'
// import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: "Login - Lets Assist",
//   description:
//     "Login to the Lets Assist Dashboard",
// };

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

type LoginValues = z.infer<typeof loginSchema>

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(data: LoginValues) {
        setIsLoading(true)
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => formData.append(key, value))

        const result = await login(formData)

        if (result.error) {
            const errors = result.error
            Object.keys(errors).forEach((key) => {
                if (key in errors && key in loginSchema.shape) {
                    form.setError(key as keyof LoginValues, {
                        type: 'server',
                        message: errors[key as keyof typeof errors]?.[0],
                    })
                }
            })
            toast.error('Incorrect email or password.')
        } else if (result.success) {
            // form.reset()
            window.location.href = '/home'
            
        }

        setIsLoading(false)
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="mx-auto max-w-sm mb-12">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <Button variant="outline" className="w-full mb-2">
                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Login with Google
                            </Button>
                            <div className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="m@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center">
                                                <FormLabel>Password</FormLabel>
                                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="underline">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Toaster position="bottom-center" theme="dark" richColors />
        </div>
    )
}
