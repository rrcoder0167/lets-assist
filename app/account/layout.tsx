"use client"
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Search, Menu } from "lucide-react"
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const sidebarItems = [
    {
      title: 'Profile',
      href: '/account/profile'
    },
    {
      title: 'Privacy & Security',
      href: '/account/security'
    },
    {
      title: 'Authentication',
      href: '/account/authentication'
    },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredItems = sidebarItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const pathname = usePathname()

    return (
        <div className="flex flex-col h-screen">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center p-4 border-b">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="mr-2"
                >
                    <Menu className="h-6 w-6" />
                </Button>
                <div className="flex-1 relative">
                    <Input 
                        placeholder="Search settings..." 
                        className="pl-10" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Hidden on mobile by default */}
                <aside className={`
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                    fixed lg:relative
                    top-0 left-0
                    h-full w-64
                    bg-background
                    border-r
                    transition-transform
                    duration-200
                    ease-in-out
                    z-20
                    lg:block
                `}>
                    <div className="w-full px-5 space-y-2 py-4">
                        {/* Search bar - Hidden on mobile */}
                        <div className="relative mb-4 hidden lg:block">
                            <Input 
                                placeholder="Search settings..." 
                                className="pl-10" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
                        </div>
                        {filteredItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-start ${
                                        pathname === item.href ? 'text-foreground font-semibold' : 'text-muted-foreground font-normal'
                                    }`}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 lg:hidden z-10"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main content */}
                <main className="flex-1 p-4 lg:p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
