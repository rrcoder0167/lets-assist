'use client'

import { EventType, Project, MultiDayScheduleDay, SameDayMultiAreaSchedule, OneTimeSchedule, Profile } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Users, Share2, Clock } from "lucide-react"
import { format } from 'date-fns'
import { useToast } from "@/hooks/use-toast"
import { signUpForProject } from './actions'
import { formatTimeTo12Hour } from '@/lib/utils'

type Props = {
  project: Project
  creator: Profile | null
}

type ScheduleData = OneTimeSchedule | MultiDayScheduleDay[] | SameDayMultiAreaSchedule | undefined

export default function ProjectDetails({ project, creator }: Props): React.ReactElement {
  const { toast } = useToast()
  
  // Handle different schedule types properly
  const getScheduleData = (): ScheduleData => {
    if (project.event_type === 'oneTime') {
      return project.schedule.oneTime as OneTimeSchedule;
    } else if (project.event_type === 'multiDay') {
      return project.schedule.multiDay as MultiDayScheduleDay[];
    } else if (project.event_type === 'sameDayMultiArea') {
      return project.schedule.sameDayMultiArea as SameDayMultiAreaSchedule;
    }
    return undefined;
  }
  
  const scheduleData = getScheduleData();

  const handleSignUp = async (scheduleId: string) => {
    const result = await signUpForProject(project.id, scheduleId)
    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive"
      })
    } else {
      toast({
        title: "Success!",
        description: "You have successfully signed up for this project.",
      })
    }
  }

  const renderSchedule = (eventType: EventType) => {
    if (!scheduleData) return null

    switch (eventType) {
      case 'oneTime': {
        const oneTimeData = scheduleData as OneTimeSchedule
        return (
          <div className="mt-4 space-y-2">
            <Badge variant="secondary">
              <CalendarDays className="h-4 w-4 mr-1" />
              {format(new Date(oneTimeData.date), 'EEEE, MMMM d, yyyy')}
            </Badge>
            <Badge variant="secondary">
              <Clock className="h-4 w-4 mr-1" />
              {formatTimeTo12Hour(oneTimeData.startTime)} - {formatTimeTo12Hour(oneTimeData.endTime)}
            </Badge>
          </div>
        )
      }
      
      case 'multiDay': {
        const multiDayData = scheduleData as MultiDayScheduleDay[]
        return (
          <div className="mt-4 space-y-4">
            {multiDayData.map((day, index) => (
              <div key={index} className="space-y-2">
                <Badge variant="secondary">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {format(new Date(day.date), 'EEEE, MMMM d, yyyy')}
                </Badge>
                <div className="ml-6 space-y-2">
                  {day.slots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex items-center gap-4">
                      <Badge variant="secondary">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTimeTo12Hour(slot.startTime)} - {formatTimeTo12Hour(slot.endTime)}
                      </Badge>
                      <Badge variant="outline">
                        <Users className="h-4 w-4 mr-1" />
                        {slot.volunteers} spots
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      }
      
      case 'sameDayMultiArea': {
        const multiAreaData = scheduleData as SameDayMultiAreaSchedule;
        return (
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                <CalendarDays className="h-4 w-4 mr-1" />
                {format(new Date(multiAreaData.date), 'EEEE, MMMM d, yyyy')}
              </Badge>
              <Badge variant="secondary">
                <Clock className="h-4 w-4 mr-1" />
                Event Hours: {formatTimeTo12Hour(multiAreaData.overallStart)} - {formatTimeTo12Hour(multiAreaData.overallEnd)}
              </Badge>
            </div>
            <div className="space-y-3">
              {multiAreaData.roles?.map((role, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium mb-1">{role.name}</h4>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{formatTimeTo12Hour(role.startTime)} - {formatTimeTo12Hour(role.endTime)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="secondary">
                          <Users className="h-4 w-4 mr-1" />
                          {role.volunteers} spots
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      }
    }
  }
  
  const renderVolunteerOpportunities = () => {
    if (!scheduleData) return null

    switch (project.event_type) {
      case 'oneTime': {
        const oneTimeData = scheduleData as OneTimeSchedule
        return (
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-lg">One-time Event</h3>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeTo12Hour(oneTimeData.startTime)} - {formatTimeTo12Hour(oneTimeData.endTime)}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="secondary">
                  <Users className="h-4 w-4 mr-1" />
                  {oneTimeData.volunteers} spots available
                </Badge>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleSignUp('oneTime')}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )
      }
      
      case 'multiDay': {
        const multiDayData = scheduleData as MultiDayScheduleDay[]
        return multiDayData.map((day, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4 last:mb-0">
            <h3 className="font-medium text-lg mb-3">
              {format(new Date(day.date), 'EEEE, MMMM d, yyyy')}
            </h3>
            <div className="space-y-4">
              {day.slots.map((slot, slotIndex) => (
                <div key={slotIndex} className="flex items-center justify-between border-t pt-4 first:border-t-0 first:pt-0">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatTimeTo12Hour(slot.startTime)} - {formatTimeTo12Hour(slot.endTime)}</span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="secondary">
                      <Users className="h-4 w-4 mr-1" />
                      {slot.volunteers} spots available
                    </Badge>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => handleSignUp(`${day.date}-${slotIndex}`)}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      }

      case 'sameDayMultiArea': {
        const multiAreaData = scheduleData as SameDayMultiAreaSchedule;
        return (
          <div className="space-y-4">
            {multiAreaData.roles?.map((role, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{role.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatTimeTo12Hour(role.startTime)} - {formatTimeTo12Hour(role.endTime)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="secondary">
                      <Users className="h-4 w-4 mr-1" />
                      {role.volunteers} spots available
                    </Badge>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => handleSignUp(role.name)}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
  }
  
  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">{project.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{project.location}</span>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
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
              {renderSchedule(project.event_type)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volunteer Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              {renderVolunteerOpportunities()}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Coordinator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{creator?.full_name || 'Anonymous'}</p>
              <p className="text-muted-foreground">@{creator?.username || 'user'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {project.verification_method === 'qr-code' && (
                  <>
                    <Badge variant="outline">QR Code Check-in</Badge>
                    <p className="text-sm text-muted-foreground">Volunteers will check-in by scanning a QR code</p>
                  </>
                )}
                {project.verification_method === 'manual' && (
                  <>
                    <Badge variant="outline">Manual Check-in</Badge>
                    <p className="text-sm text-muted-foreground">Organizer will check-in volunteers manually</p>
                  </>
                )}
                {project.verification_method === 'auto' && (
                  <>
                    <Badge variant="outline">Automatic Check-in</Badge>
                    <p className="text-sm text-muted-foreground">System will handle check-ins automatically</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}