import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Users, Share2, Clock } from "lucide-react"
// import Link from "next/link"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProjectDetails(params: Props): Promise<React.ReactElement> {
  const { id } = await params.params;
  // Mock data - will be replaced with real data from backend
  const project = {
    id: id,
    title: 'Community Festival Support',
    location: 'Central Community Center',
    description: 'Join us for our annual community festival. We need volunteers for various roles throughout the day to make this event successful.',
    eventType: 'sameDayMultiArea', // oneTime, multiDay, or sameDayMultiArea
    date: '2025-02-20',
    overallStartTime: '10:00 AM',
    overallEndTime: '7:30 PM',
    areas: [
      {
        name: 'Event Decoration',
        startTime: '10:00 AM',
        endTime: '6:00 PM',
        capacity: 15,
        registered: 8
      },
      {
        name: 'Event Cooking',
        startTime: '10:00 AM',
        endTime: '6:00 PM',
        capacity: 10,
        registered: 4
      },
      {
        name: 'Event Cleaning',
        startTime: '6:30 PM',
        endTime: '7:30 PM',
        capacity: 5,
        registered: 2
      }
    ],
    coordinator: {
      name: "Sarah Johnson",
      contact: "sarah@example.com"
    }
  }

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
              <div className="mt-4">
                <Badge variant="secondary" className="mr-2">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {project.date}
                </Badge>
                <Badge variant="secondary">
                  <Clock className="h-4 w-4 mr-1" />
                  {project.overallStartTime} - {project.overallEndTime}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volunteer Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {project.areas.map((area, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{area.name}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <Clock className="h-4 w-4" />
                          <span>{area.startTime} - {area.endTime}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="secondary">
                          <Users className="h-4 w-4 mr-1" />
                          {area.capacity - area.registered} spots left
                        </Badge>
                        <Button variant="secondary" size="sm">
                          Sign Up
                        </Button>
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded p-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{area.registered} of {area.capacity} volunteers registered</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Coordinator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{project.coordinator.name}</p>
              <p className="text-muted-foreground">{project.coordinator.contact}</p>
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