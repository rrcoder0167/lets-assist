import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  UserCircle, 
  Shield, 
  Mail, 
  Share2, 
  Database 
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'Profile',
    icon: <UserCircle className="w-4 h-4 mr-2" />,
    href: '/settings/profile'
  },
  {
    title: 'Privacy & Security',
    icon: <Shield className="w-4 h-4 mr-2" />,
    href: '/settings/privacy'
  },
  {
    title: 'Email Settings',
    icon: <Mail className="w-4 h-4 mr-2" />,
    href: '/settings/email'
  },
  {
    title: 'Connected Accounts',
    icon: <Share2 className="w-4 h-4 mr-2" />,
    href: '/settings/connections'
  },
  {
    title: 'Data & Storage',
    icon: <Database className="w-4 h-4 mr-2" />,
    href: '/settings/data'
  }
]

export function SettingsSidebar() {
  return (
    <div className="w-64 px-4 space-y-2 py-4">
      {sidebarItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant="ghost"
            className="w-full justify-start font-normal"
          >
            {item.icon}
            {item.title}
          </Button>
        </Link>
      ))}
    </div>
  )
}
