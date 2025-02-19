"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MapPin, ImagePlus, Plus, ChevronRight, ChevronLeft, Calendar as CalendarIcon, CalendarClock, UsersRound, Trash2, PlusCircle, AlertCircle } from "lucide-react"
import { useEventForm } from "@/hooks/use-event-form"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { TimePicker } from "@/components/ui/time-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CreateProject() {
  const { 
    state, 
    nextStep, 
    prevStep, 
    setEventType, 
    updateBasicInfo, 
    addMultiDaySlot, 
    addMultiDayEvent, 
    addRole,
    updateOneTimeSchedule,
    updateMultiDaySchedule,
    updateMultiRoleSchedule,
    removeDay,
    removeSlot,
    removeRole,
    canProceed
  } = useEventForm()

  const getValidationMessage = () => {
    if (!canProceed()) {
      switch (state.step) {
        case 1:
          return "Please fill in all required fields"
        case 3:
          if (state.eventType === 'oneTime') {
            return "Please select a date, time, and number of volunteers"
          }
          if (state.eventType === 'multiDay') {
            return "Please ensure all days have valid dates, times, and volunteer counts"
          }
          if (state.eventType === 'sameDayMultiArea') {
            return "Please ensure all roles have names, valid times, and volunteer counts"
          }
        default:
          return ""
      }
    }
    return ""
  }

  const isTimeRangeInvalid = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return false
    const [startHour, startMinute] = startTime.split(":").map(Number)
    const [endHour, endMinute] = endTime.split(":").map(Number)
    
    if (endHour < startHour) return true
    if (endHour === startHour && endMinute <= startMinute) return true
    return false
  }

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <p className="text-sm text-muted-foreground">Let&apos;s start with the essential details of your project</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Santa Cruz Beach Cleanup" 
                  value={state.basicInfo.title}
                  onChange={(e) => updateBasicInfo('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2">
                  <Input 
                    id="location" 
                    placeholder="Enter location" 
                    className="flex-1"
                    value={state.basicInfo.location}
                    onChange={(e) => updateBasicInfo('location', e.target.value)}
                  />
                  <Button variant="outline" type="button">
                    <MapPin className="h-4 w-4 mr-2" />
                    Map
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your project (max 1000 characters)"
                  className="h-32"
                  maxLength={1000}
                  value={state.basicInfo.description}
                  onChange={(e) => updateBasicInfo('description', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Choose Event Type</CardTitle>
              <p className="text-sm text-muted-foreground">Select the format that best fits your event</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div 
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  state.eventType === 'oneTime' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
                onClick={() => setEventType('oneTime')}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">Single Event</h3>
                    <p className="text-sm text-muted-foreground">A one-time event on a specific date</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                {state.eventType === 'oneTime' && (
                  <div className="mt-4 p-4 bg-card rounded-md">
                    <p className="text-sm">Example: Beach cleanup event on February 20th, 2024 from 4 PM to 9 PM</p>
                  </div>
                )}
              </div>

              <div 
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  state.eventType === 'multiDay' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
                onClick={() => setEventType('multiDay')}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">Multiple Day Event</h3>
                    <p className="text-sm text-muted-foreground">Event spans across multiple days with different time slots</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10">
                    <CalendarClock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                {state.eventType === 'multiDay' && (
                  <div className="mt-4 p-4 bg-card rounded-md">
                    <p className="text-sm">Example: Workshop series with morning and afternoon sessions across different days</p>
                  </div>
                )}
              </div>

              <div 
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  state.eventType === 'sameDayMultiArea' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
                onClick={() => setEventType('sameDayMultiArea')}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">Multi-Role Event</h3>
                    <p className="text-sm text-muted-foreground">Single day event with different volunteer roles</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10">
                    <UsersRound className="h-6 w-6 text-primary" />
                  </div>
                </div>
                {state.eventType === 'sameDayMultiArea' && (
                  <div className="mt-4 p-4 bg-card rounded-md">
                    <p className="text-sm">Example: Community festival needing decorators, cooks, and cleaners at different times</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Schedule Your Event</CardTitle>
              <p className="text-sm text-muted-foreground">
                {state.eventType === 'oneTime' && "Pick a date and time for your event"}
                {state.eventType === 'multiDay' && "Set up your event schedule across multiple days"}
                {state.eventType === 'sameDayMultiArea' && "Define different roles and their timings"}
              </p>
            </CardHeader>
            <CardContent>
              {renderScheduleStep()}
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Finalize Your Project</CardTitle>
              <p className="text-sm text-muted-foreground">Add any additional materials to help volunteers understand the project better</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Cover Image</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                  <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Upload a cover image for your project</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <div>
                <Label>Additional Files (Optional)</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                  <Plus className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Add any supporting documents</p>
                  <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Project Summary</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Title:</strong> {state.basicInfo.title || 'Not set'}</p>
                  <p><strong>Location:</strong> {state.basicInfo.location || 'Not set'}</p>
                  <p><strong>Event Type:</strong> {state.eventType === 'oneTime' ? 'Single Event' : 
                    state.eventType === 'multiDay' ? 'Multiple Day Event' : 'Multi-Role Event'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  const renderScheduleStep = () => {
    if (state.eventType === 'oneTime') {
      const timeRangeInvalid = isTimeRangeInvalid(state.schedule.oneTime.startTime, state.schedule.oneTime.endTime)

      return (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1.5",
                      !state.schedule.oneTime.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {state.schedule.oneTime.date ? 
                      format(new Date(state.schedule.oneTime.date), "PPP") : 
                      "Pick a date"
                    }
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={state.schedule.oneTime.date ? new Date(state.schedule.oneTime.date) : undefined}
                    onSelect={(date) => 
                      updateOneTimeSchedule('date', date ? format(date, 'yyyy-MM-dd') : '')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Volunteers Needed</Label>
              <Input 
                type="number" 
                min="1" 
                className="mt-1.5"
                value={state.schedule.oneTime.volunteers}
                onChange={(e) => updateOneTimeSchedule('volunteers', parseInt(e.target.value))}
              />
            </div>
          </div>
            <div className="grid sm:grid-cols-2 gap-4">
            <TimePicker
              label="Start Time"
              value={state.schedule.oneTime.startTime}
              onChangeAction={(time: string) => updateOneTimeSchedule('startTime', time)}
              error={timeRangeInvalid}
              errorMessage={timeRangeInvalid ? "Start time must be before end time" : undefined}
            />
            <TimePicker
              label="End Time"
              value={state.schedule.oneTime.endTime}
              onChangeAction={(time: string) => updateOneTimeSchedule('endTime', time)}
              error={timeRangeInvalid}
              errorMessage={timeRangeInvalid ? "End time must be after start time" : undefined}
            />
            </div>
        </div>
      )
    }

    if (state.eventType === 'multiDay') {
      return (
        <div className="space-y-6">
          {state.schedule.multiDay.map((day, dayIndex) => (
            <div key={dayIndex} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <Label>Day {dayIndex + 1}</Label>
                {dayIndex > 0 && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeDay(dayIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !day.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {day.date ? 
                          format(new Date(day.date), "PPP") : 
                          "Pick a date"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={day.date ? new Date(day.date) : undefined}
                        onSelect={(date) => 
                          updateMultiDaySchedule(dayIndex, 'date', date ? format(date, 'yyyy-MM-dd') : '')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {day.slots.map((slot, slotIndex) => {
                  const timeRangeInvalid = isTimeRangeInvalid(slot.startTime, slot.endTime)
                  return (
                    <div key={slotIndex} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <Label>Time Slot {slotIndex + 1}</Label>
                        {slotIndex > 0 && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeSlot(dayIndex, slotIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                        <TimePicker
                          value={slot.startTime}
                          onChangeAction={(time: string) => updateMultiDaySchedule(dayIndex, 'startTime', time, slotIndex)}
                          error={timeRangeInvalid}
                          errorMessage={timeRangeInvalid ? "Invalid time" : undefined}
                        />
                        <TimePicker
                          value={slot.endTime}
                          onChangeAction={(time: string) => updateMultiDaySchedule(dayIndex, 'endTime', time, slotIndex)}
                          error={timeRangeInvalid}
                          errorMessage={timeRangeInvalid ? "Invalid time" : undefined}
                        />
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="Volunteers"
                          value={slot.volunteers}
                          onChange={(e) => updateMultiDaySchedule(dayIndex, 'volunteers', e.target.value, slotIndex)}
                        />
                        </div>
                    </div>
                  )
                })}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={() => addMultiDaySlot(dayIndex)}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Time Slot
                </Button>
              </div>
            </div>
          ))}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={addMultiDayEvent}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Another Day
          </Button>
        </div>
      )
    }

    if (state.eventType === 'sameDayMultiArea') {
      const overallTimeInvalid = isTimeRangeInvalid(state.schedule.multiRole.overallStart, state.schedule.multiRole.overallEnd)

      return (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1.5",
                      !state.schedule.multiRole.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {state.schedule.multiRole.date ? 
                      format(new Date(state.schedule.multiRole.date), "PPP") : 
                      "Pick a date"
                    }
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={state.schedule.multiRole.date ? new Date(state.schedule.multiRole.date) : undefined}
                    onSelect={(date) => 
                      updateMultiRoleSchedule('date', date ? format(date, 'yyyy-MM-dd') : '')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Overall Event Hours</Label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                <TimePicker
                  value={state.schedule.multiRole.overallStart}
                  onChangeAction={(time: string) => updateMultiRoleSchedule('overallStart', time)}
                  error={overallTimeInvalid}
                  errorMessage={overallTimeInvalid ? "Invalid time" : undefined}
                />
                <TimePicker
                  value={state.schedule.multiRole.overallEnd}
                  onChangeAction={(time: string) => updateMultiRoleSchedule('overallEnd', time)}
                  error={overallTimeInvalid}
                  errorMessage={overallTimeInvalid ? "Invalid time" : undefined}
                />
                </div>
            </div>
          </div>

          {state.schedule.multiRole.roles.map((role, roleIndex) => {
            const roleTimeInvalid = isTimeRangeInvalid(role.startTime, role.endTime)
            return (
              <div key={roleIndex} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <Label>Role {roleIndex + 1}</Label>
                  {roleIndex > 0 && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeRole(roleIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  <Input 
                    placeholder="Role name (e.g., Event Decoration)"
                    value={role.name}
                    onChange={(e) => updateMultiRoleSchedule('name', e.target.value, roleIndex)}
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Time Slot</Label>
                        <div className="grid grid-cols-2 gap-2 mt-1.5">
                        <TimePicker
                          value={role.startTime}
                          onChangeAction={(time: string) => updateMultiRoleSchedule('startTime', time, roleIndex)}
                          error={roleTimeInvalid}
                          errorMessage={roleTimeInvalid ? "Invalid time" : undefined}
                        />
                        <TimePicker
                          value={role.endTime}
                          onChangeAction={(time: string) => updateMultiRoleSchedule('endTime', time, roleIndex)}
                          error={roleTimeInvalid}
                          errorMessage={roleTimeInvalid ? "Invalid time" : undefined}
                        />
                        </div>
                    </div>
                    <div>
                      <Label>Volunteers Needed</Label>
                      <Input 
                        type="number" 
                        min="1" 
                        className="mt-1.5"
                        value={role.volunteers}
                        onChange={(e) => updateMultiRoleSchedule('volunteers', parseInt(e.target.value), roleIndex)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={addRole}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Another Role
          </Button>
        </div>
      )
    }

    return null
  }

  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Create a Volunteering Project</h1>
        <Progress value={(state.step / 4) * 100} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span className={state.step === 1 ? "text-primary font-medium" : ""}>Basic Info</span>
          <span className={state.step === 2 ? "text-primary font-medium" : ""}>Event Type</span>
          <span className={state.step === 3 ? "text-primary font-medium" : ""}>Schedule</span>
          <span className={state.step === 4 ? "text-primary font-medium" : ""}>Finalize</span>
        </div>
      </div>

      <div className="space-y-8">
        {renderStep()}

        {getValidationMessage() && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {getValidationMessage()}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between gap-4">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={state.step === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={nextStep}
            disabled={!canProceed()}
          >
            {state.step === 4 ? 'Create Project' : 'Continue'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}