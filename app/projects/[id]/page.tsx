import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Users, Share2, Clock } from "lucide-react"
import { format } from 'date-fns'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProjectDetails(params: Props): Promise<React.ReactElement> {
  const { id } = await params.params
  const supabase = await createClient()
  
  // Fetch project data
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      profiles(full_name, avatar_url, username)
    `)
    .eq('id', id)
    .single()
  
  if (error || !project) {
    notFound()
  }

  // Get the creator profile data
  const creator = project.profiles
  
  // Get the schedule data based on event type
  const scheduleData = project.schedule[project.event_type]
  
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{project.location}</span>
            </div>
          </div>
          <Button variant="outline" className="w-20" size="icon">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About this Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{project.description}</p>
              
              {/* Render different content based on event type */}
              {project.event_type === 'oneTime' && (
                <div className="mt-4">
                  <Badge variant="secondary" className="mr-2">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    {format(new Date(scheduleData.date), 'EEEE, MMMM d, yyyy')}
                  </Badge>
                  <Badge variant="secondary">
                    <Clock className="h-4 w-4 mr-1" />
                    {scheduleData.startTime} - {scheduleData.endTime}
                  </Badge>
                </div>
              )}
              
              {/* Add rendering for multiDay and sameDayMultiArea types */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volunteer Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Render opportunities based on event type */}
              {project.event_type === 'oneTime' && (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-lg">One-time Event</h3>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Clock className="h-4 w-4" />
                        <span>{scheduleData.startTime} - {scheduleData.endTime}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary">
                        <Users className="h-4 w-4 mr-1" />
                        {scheduleData.volunteers} spots available
                      </Badge>
                      <Button variant="secondary" size="sm">
                        Sign Up
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Add rendering for multiDay and sameDayMultiArea types */}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Coordinator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{creator.full_name || 'Anonymous'}</p>
              <p className="text-muted-foreground">@{creator.username || 'user'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                Map placeholder
              </div>
              <Button variant="outline" className="w-full mt-4">
                <MapPin className="h-4 w-4 mr-2" />
                Open in Google Maps
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}