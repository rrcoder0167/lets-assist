import React from 'react';
import { Card } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server';
import { EmailVerificationToast } from "@/components/EmailVerificationToast";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Users, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { NoAvatar } from '@/components/NoAvatar';

export default async function Home() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profileData } = await supabase
                    .from('profiles')
                    .select('full_name, avatar_url, username')
                    .eq('id', user?.id)
                    .single();
    const userName = profileData?.full_name || 'JD';

    // This is just mock data for UI purposes
    const mockProjects = [
        {
            id: '1',
            title: 'Santa Cruz Beach Cleanup',
            location: 'Santa Cruz Main Beach, CA',
            creator: 'Jane Doe',
            slots: [
                { day: 'Saturday', times: ['9:30 AM - 11:30 AM', '2:00 PM - 4:00 PM'], capacity: 10 },
                { day: 'Sunday', times: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'], capacity: 15 }
            ],
            totalSpots: 50,
            spotsLeft: 35
        },
        // Add more mock projects here for testing
    ];

    return (
        <div className="min-h-screen">
            <EmailVerificationToast />
            <main className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={profileData?.avatar_url} alt={userName} />
                    <AvatarFallback>
                    <NoAvatar fullName={profileData?.full_name} />
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold">Hi, {userName}</h1>
                    <p className="text-sm text-muted-foreground">Check out the latest projects</p>
                </div>
                </div>
                <Link href="/projects/create">
                <Button size="lg" className="font-semibold flex items-center gap-1">
                    <Plus className="h-10 w-10"></Plus>
                    Create Project
                </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockProjects.map((project) => (
                <Card key={project.id} className="p-4 hover:shadow-lg transition-shadow max-w-sm">
                    <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3">
                        <Avatar className="w-12 h-12">
                        <AvatarImage src="" alt={project.creator} />
                        <AvatarFallback>
                            <NoAvatar fullName={project.creator} />
                        </AvatarFallback>
                        </Avatar>
                        <div>
                        <h2 className="text-xl font-semibold">{project.title}</h2>
                        <div className="flex items-center text-muted-foreground gap-1">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{project.location}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1"></div>
                            <span className="font-medium">{project.creator}</span>
                        </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium mb-1">Available Days:</p>
                        <div className="flex flex-wrap gap-2">
                            {mockProjects[0].slots.map((slot, index) => (
                                <Badge key={index} variant="outline" className="px-2 py-1 text-xs">
                                    {slot.day}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <Badge variant="secondary" className="inline-flex items-center gap-1 px-2 py-1">
                            <Users className="h-4 w-4" />
                            <span className="text-xs">{mockProjects[0].spotsLeft} spots left</span>
                        </Badge>
                    </div>
                </Card>
                ))}
            </div>
        </main>
    </div>
);
}
