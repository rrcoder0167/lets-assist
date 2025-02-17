import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { notFound } from "next/navigation"

interface Profile {
    username: string
    full_name: string
    avatar_url: string | null
    bio: string | null
    location: string | null
    created_at: string
    education: Education[]
    experience: Experience[]
    volunteering: Volunteering[]
    skills: string[]
    certifications: Certification[]
    social_links: SocialLinks
    contact_info: ContactInfo
}

interface Education {
    school: string
    degree: string
    field: string
    start_date: string
    end_date: string | null
    description: string | null
}

interface Experience {
    company: string
    title: string
    start_date: string
    end_date: string | null
    description: string
    location: string
}

interface Volunteering {
    organization: string
    role: string
    start_date: string
    end_date: string | null
    description: string
    impact: string
}

interface Certification {
    name: string
    issuer: string
    date: string
    expires: string | null
    credential_id: string
}

interface SocialLinks {
    linkedin?: string
    github?: string
    twitter?: string
    portfolio?: string
}

interface ContactInfo {
    email: string
    phone?: string
    preferred_contact_method: string
}

export default async function ProfilePage({
    params,
}: {
    params: { username: string }
}) {
    const supabase = await createClient()

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', params.username)
        .single<Profile>()

    if (error || !profile) {
        notFound()
    }

    return (
        <div className="container max-w-6xl py-8 mx-auto space-y-8">
            {/* Profile Header Card */}
            <Card>
                <CardHeader className="flex flex-row items-center gap-6">
                    <Avatar className="h-32 w-32">
                        <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name} />
                        <AvatarFallback>
                            {profile.full_name?.split(" ").map((n: string) => n[0]).join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{profile.full_name}</h1>
                        <p className="text-xl text-muted-foreground">@{profile.username}</p>
                        {profile.location && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <IconMapPin className="h-4 w-4" />
                                <span>{profile.location}</span>
                            </div>
                        )}
                        <div className="flex gap-2 mt-2">
                            {profile.social_links && Object.entries(profile.social_links).map(([platform, url]) => (
                                url && <SocialLink key={platform} platform={platform} url={url} />
                            ))}
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="about" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="volunteering">Volunteering</TabsTrigger>
                    <TabsTrigger value="skills">Skills & Certifications</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-4">
                    <Card>
                        <CardContent className="pt-6">
                            <h2 className="text-xl font-semibold mb-4">About</h2>
                            <p className="text-lg">{profile.bio}</p>
                            
                            <Separator className="my-6" />
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                                    <p>{format(new Date(profile.created_at), "MMMM d, yyyy")}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                                    {profile.contact_info?.email && <p>{profile.contact_info.email}</p>}
                                    {profile.contact_info?.phone && <p>{profile.contact_info.phone}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                    <Card>
                        <CardContent className="pt-6">
                            {profile.experience?.map((exp, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold">{exp.title}</h3>
                                            <p className="text-muted-foreground">{exp.company}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {format(new Date(exp.start_date), "MMM yyyy")} - 
                                            {exp.end_date ? format(new Date(exp.end_date), "MMM yyyy") : "Present"}
                                        </p>
                                    </div>
                                    <p className="mt-2">{exp.description}</p>
                                    {index < profile.experience.length - 1 && <Separator className="my-4" />}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Similar TabsContent sections for education, volunteering, and skills */}
                {/* Add more sections as needed */}
            </Tabs>
        </div>
    )
}

function SocialLink({ platform, url }: { platform: string; url: string }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
        >
            {/* Add appropriate icon based on platform */}
            {platform}
        </a>
    )
}

// Add an icon component for the location pin
function IconMapPin(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    )
}