"use client"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar as AvatarUI, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Upload, CircleCheck, XCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Toaster, toast } from 'sonner'
import { completeOnboarding } from './actions'
import type { OnboardingValues } from './actions'
import { z } from 'zod'
import ImageCropper from '@/components/ImageCropper'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

// --- Changed: update schema to use string for preview only ---
const onboardingSchema = z.object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    avatarUrl: z.string().optional(),
})

interface AvatarProps {
    url: string
    onUpload: (url: string) => void
}

function Avatar({ url, onUpload }: AvatarProps) {
    const [tempImageUrl, setTempImageUrl] = useState<string>('')
    const [showCropper, setShowCropper] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) { // 5 MB limit
            toast.error('File size exceeds 5 MB. Please upload a smaller file.')
            return
        }

        const fileUrl = URL.createObjectURL(file)
        setTempImageUrl(fileUrl)
        setShowCropper(true)
    }

    // --- Changed: just pass the cropped base64 image ---
    const handleCropComplete = (croppedImage: string) => {
        onUpload(croppedImage)
        setShowCropper(false)
        setTempImageUrl('')
    }

    const handleCropCancel = () => {
        setShowCropper(false)
        setTempImageUrl('')
    }

    return (
        <>
            <div className="flex items-center space-x-4">
                <AvatarUI className="w-20 h-20">
                    <AvatarImage src={url} alt="Profile picture" />
                    <AvatarFallback>
                        {url ? 'PIC' : 'ADD'}
                    </AvatarFallback>
                </AvatarUI>
                <div>
                    <Button variant="outline" className="relative">
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Picture
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleUpload}
                            accept="image/jpeg,image/png,image/jpg"
                        />
                    </Button>
                </div>
            </div>

            <Dialog open={showCropper} onOpenChange={setShowCropper}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle className="sr-only">Image Cropper</DialogTitle>
                    {showCropper && (
                        <ImageCropper
                            imageSrc={tempImageUrl}
                            onCropComplete={handleCropComplete}
                            onCancel={handleCropCancel}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default function NewUserOnboarding() {
    // ...existing code...
    const [isLoading, setIsLoading] = useState(false)
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
    const [checkingUsername, setCheckingUsername] = useState(false)
    const form = useForm<OnboardingValues>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            fullName: '',
            username: '',
            avatarUrl: undefined,
        },
    })

    // ...existing code...
    async function handleUsernameBlur(e: React.FocusEvent<HTMLInputElement>) {
        const username = e.target.value.trim()
        if (username.length < 3) {
            setUsernameAvailable(null)
            return
        }
        setCheckingUsername(true)
        const res = await fetch(`/api/check-username?username=${encodeURIComponent(username)}`)
        const data = await res.json()
        setUsernameAvailable(data.available)
        setCheckingUsername(false)
    }

    // --- Changed: simply send avatarUrl as string ---
    async function onSubmit(data: OnboardingValues) {
        setIsLoading(true)
        const formData = new FormData()
        // --- Changed: do not append avatarUrl so server doesn't get base64 ---
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'avatarUrl' && value) formData.append(key, value as any)
        })

        const result = await completeOnboarding(formData)

        if (!result) return

        if (result.error) {
            const errors = result.error
            Object.keys(errors).forEach((key) => {
                form.setError(key as keyof OnboardingValues, {
                    type: 'server',
                    message: errors[key as keyof typeof errors]?.[0],
                })
            })
            toast.error('Failed to update profile. Please try again.')
        } else {
            form.reset()
            toast.success('Profile updated successfully!')
        }

        setIsLoading(false)
    }

    return (
        <>
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-sm mx-auto mb-12">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-left">Welcome!</CardTitle>
                    <CardDescription className="text-left">
                        Let&apos;s get your account set up
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input 
                                                    placeholder="johndoe123" 
                                                    {...field} 
                                                    onChange={(e) => {
                                                        const noSpaces = e.target.value.replace(/\s/g, '')
                                                        field.onChange(noSpaces)
                                                    }}
                                                    onBlur={(e) => {
                                                        field.onBlur()
                                                        handleUsernameBlur(e)
                                                    }}
                                                />
                                            </FormControl>
                                            {checkingUsername && (
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                                                </div>
                                            )}
                                            {usernameAvailable !== null && !checkingUsername && (
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-200">
                                                    {usernameAvailable ? (
                                                        <CircleCheck className="h-5 w-5 text-primary animate-in fade-in-50 duration-200" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5 text-destructive animate-in fade-in-50 duration-200" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="avatarUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profile Picture</FormLabel>
                                        <FormControl>
                                            <Avatar 
                                              url={typeof field.value === 'string' ? field.value : ''} 
                                              onUpload={(url) => field.onChange(url)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Complete Setup'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Toaster position="bottom-right" theme="dark" richColors />
        </div>
        {/* ...existing code... */}
        </>
    )
}
