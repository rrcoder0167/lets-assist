"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function SecurityPage() {
    const [isLoadingEmail, setIsLoadingEmail] = useState(false)
    const [isLoadingPassword, setIsLoadingPassword] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState("")

    const handleEmailChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoadingEmail(true)
        // TODO: Implement email change
        setIsLoadingEmail(false)
    }

    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoadingPassword(true)
        // TODO: Implement password change
        setIsLoadingPassword(false)
    }

    const handleDeleteAccount = async () => {
        if (deleteConfirmation !== "delete my account") {
            toast.error("Please type the confirmation phrase correctly")
            return
        }
        // TODO: Implement account deletion
        setShowDeleteDialog(false)
    }

    return (
        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
        >
        <div className="container mx-auto py-6 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Privacy & Security</h1>
                <p className="text-muted-foreground">
                    Manage your email, password, and account security
                </p>
            </div>

            <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Email Address</CardTitle>
                        <CardDescription>Change your email address</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleEmailChange} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-email">Current Email</Label>
                                <Input id="current-email" type="email" disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-email">New Email</Label>
                                <Input id="new-email" type="email" required />
                            </div>
                            <Button type="submit" disabled={isLoadingEmail}>
                                {isLoadingEmail ? "Updating..." : "Update Email"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>Change your password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input id="confirm-password" type="password" required />
                            </div>
                            <Button type="submit" disabled={isLoadingPassword}>
                                {isLoadingPassword ? "Updating..." : "Update Password"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-destructive mt-6">
                <CardHeader>
                    <CardTitle className="text-destructive">Delete Account</CardTitle>
                    <CardDescription>
                        Permanently delete your account and all associated data
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <DialogTrigger asChild>
                            <Button variant="destructive">Delete Account</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove all associated data.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="confirm">
                                        Type &quot;delete my account&quot; to confirm
                                    </Label>
                                    <Input
                                        id="confirm"
                                        value={deleteConfirmation}
                                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                                        placeholder="delete my account"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteAccount}
                                    disabled={deleteConfirmation !== "delete my account"}
                                >
                                    Delete Account
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
        </motion.div>
    )
}