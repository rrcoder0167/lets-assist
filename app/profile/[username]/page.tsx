import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { notFound } from "next/navigation"

interface Profile {
  username: string
  full_name: string
  avatar_url: string | null
  bio: string | null
  location: string | null
  created_at: string
}

export default async function ProfilePage({
  params,
}: {
  params: { username: string }
}) {
  const supabase = await createClient()

  // Fetch user profile data
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username)
    .single<Profile>()

  if (error || !profile) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-8 mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name} />
            <AvatarFallback>
              {profile.full_name?.split(" ").map((n: string) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{profile.full_name}</h1>
            <p className="text-muted-foreground">@{profile.username}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profile.bio && (
              <div>
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p>{profile.bio}</p>
              </div>
            )}
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm text-muted-foreground">Joined</h3>
                <p>{format(new Date(profile.created_at), "MMMM d, yyyy")}</p>
              </div>
              {profile.location && (
                <div>
                  <h3 className="text-sm text-muted-foreground">Location</h3>
                  <p>{profile.location}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}