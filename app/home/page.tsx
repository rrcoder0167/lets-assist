import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server'
// import DemoClientComponent from "@/components/DemoClientComponent";
import { EmailVerificationToast } from "@/components/EmailVerificationToast";

export default async function Home(){
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    return (
        <div>
            <main className="p-8">
            <EmailVerificationToast />
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Hello, {data?.user?.email ?? 'Guest'}</h1>
                </div>
                <p>Welcome to your volunteering platform dashboard.</p>
                

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* List your upcoming volunteering events here */}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Display recent activities or stats */}
                        </CardContent>
                    </Card>
                </div>
                {/* <DemoClientComponent /> */}
            </main>
        </div>
    );
};
