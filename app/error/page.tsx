"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-[380px] shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2 text-destructive">
                        <AlertCircle className="h-6 w-6" />
                        Authentication Error
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                    <p>There was a problem signing you in.</p>
                    <p>Please try again or contact support if the issue persists.</p>
                </CardContent>
                <CardFooter className="flex justify-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => router.push("/login")}
                    >
                        Back to Login
                    </Button>
                    <Button
                        onClick={() => router.push("/")}
                    >
                        Go to Home
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}