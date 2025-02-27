import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export default function AcknowledgementsPage() {
    return (
        <div className="mx-auto justify-center max-w-4xl py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Acknowledgements</h1>
                <p className="text-muted-foreground">We gratefully acknowledge the following open source projects and contributors</p>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Creator & Developer</CardTitle>
                        <CardDescription>Project lead for idea, creation, development, and marketing.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Link href="https://rrcoder0167.is-a.dev" className="text-chart-3 font-semibold">Riddhiman Rana</Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>GitHub Repository</CardTitle>
                        <CardDescription>Source code and project details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Link href="https://github.com/rrcoder0167/lets-assist" className="text-chart-3 font-semibold">lets-assist</Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Core Technologies</CardTitle>
                        <CardDescription>The foundation of our platform</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><strong><Link href="https://nextjs.org/" className="text-chart-3 font-semibold">Next.js</Link></strong> - Our React framework</p>
                        <p><strong><Link href="https://tailwindcss.com/" className="text-chart-3 font-semibold">Tailwind CSS</Link></strong> - For styling and design system</p>
                        <p><strong><Link href="https://supabase.com/" className="text-chart-3 font-semibold">Supabase</Link></strong> - Backend and authentication</p>
                        <p><strong><Link href="https://vercel.com" className="text-chart-3 font-semibold">Vercel</Link></strong> - Project Deployment</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>UI Components</CardTitle>
                        <CardDescription>Beautiful and accessible components</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><strong><Link href="https://ui.shadcn.com/" className="text-chart-3 font-semibold">shadcn/ui</Link></strong> - For our component system</p>
                        <p><strong><Link href="https://lucide.dev/" className="text-chart-3 font-semibold">Lucide Icons</Link></strong> - Beautiful open source icons</p>
                        <p><strong><Link href="https://simpleicons.org/" className="text-chart-3 font-semibold">Simple Icons</Link></strong> - Brand and logo icons</p>
                        <p><strong><Link href="https://ui.aceternity.com/" className="text-chart-3 font-semibold">Aceternity UI</Link></strong> - Landing Page components</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}