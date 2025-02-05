"use client"
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client"
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
import { Skeleton } from "@/components/ui/skeleton"

// Modified schema: preprocess empty strings into undefined so that non-updated values pass validation.
const onboardingSchema = z.object({
    fullName: z.preprocess(
        (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val),
        z.string().min(3, 'Full name must be at least 3 characters').optional()
    ),
    username: z.preprocess(
        (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val),
        z.string().min(3, 'Username must be at least 3 characters').optional()
    ),
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
                    <AvatarImage src={url || undefined} alt="Profile picture" />
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

export default function AccountSettings() {
    const [isLoading, setIsLoading] = useState(false)
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
    const [checkingUsername, setCheckingUsername] = useState(false)
    const [defaultValues, setDefaultValues] = useState<OnboardingValues>({
        fullName: '',
        username: '',
        avatarUrl: undefined,
    });
    const [isDataLoading, setIsDataLoading] = useState(true)

    useEffect(() => {
        async function fetchUserProfile() {
            const supabase = createClient();
            try {
                const { data: { user } } = await supabase.auth.getUser(); // Add this line to get the current user
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('full_name, avatar_url, username')
                    .eq('id', user?.id)
                    .single();
                console.log(profileData);
      
             if (profileData) {
                 setDefaultValues({
                     fullName: profileData.full_name,
                     username: profileData.username,
                     avatarUrl: profileData.avatar_url,
                 });
             }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                toast.error('Failed to load profile data');
            } finally {
                setIsDataLoading(false)
            }
        }
        fetchUserProfile();
    }, []);

    const form = useForm<OnboardingValues>({
        resolver: zodResolver(onboardingSchema),
        defaultValues,
        values: defaultValues, // This ensures form updates when defaultValues change
    });

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

    function dataURLToFile(dataURL: string, filename: string): File {
        const arr = dataURL.split(',')
        const mimeMatch = arr[0].match(/:(.*?);/)
        const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg'
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, { type: mime })
    }

    // --- Changed: simply send avatarUrl as string ---
    async function onSubmit(data: OnboardingValues) {
        setIsLoading(true)
        const formData = new FormData()
        if (data.avatarUrl && typeof data.avatarUrl === 'string') {
            const avatarFile = dataURLToFile(data.avatarUrl, 'cropped-avatar.jpg')
            formData.append('avatarUrl', avatarFile) // Changed: must match actions.ts
        }
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'avatarUrl' && value) formData.append(key, value as string)
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
            setTimeout(() => {
                window.location.href = '/account/profile'
            }, 5000)
        }

        setIsLoading(false)
    }

    // Changed: disable submit when form is not dirty
    return (
        <div className="container mx-auto py-6 max-w-7xl">
            {/* Main Content Header */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your account settings and preferences
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            Update your profile information and how others see you
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isDataLoading ? (
                            <div className="space-y-6">
                                <Skeleton className="h-20 w-20 rounded-full" />
                                <Skeleton className="h-8 w-1/2" />
                                <Skeleton className="h-8 w-1/3" />
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="space-y-8">
                                        {/* Avatar Section */}
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

                                        {/* Personal Info Section */}
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="fullName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Full Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Your name" {...field} />
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
                                                                    placeholder="Choose a username" 
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
                                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                                    {usernameAvailable ? (
                                                                        <CircleCheck className="h-5 w-5 text-primary" />
                                                                    ) : (
                                                                        <XCircle className="h-5 w-5 text-destructive" />
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button type="submit" disabled={isLoading || !form.formState.isDirty}>
                                            {isLoading ? 'Saving Changes...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Toaster position="bottom-right" theme="dark" richColors />
        </div>
    )
}


