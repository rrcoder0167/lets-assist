export type EventType = "oneTime" | "multiDay" | "sameDayMultiArea"
export type VerificationMethod = "qr-code" | "auto" | "manual"

interface BaseScheduleSlot {
  startTime: string
  endTime: string
  volunteers: number
}

export interface OneTimeSchedule extends BaseScheduleSlot {
  date: string
}

export interface MultiDaySlot extends BaseScheduleSlot {}

export interface MultiDayScheduleDay {
  date: string
  slots: MultiDaySlot[]
}

export interface MultiAreaRole extends BaseScheduleSlot {
  name: string
}

export interface MultiAreaSchedule {
  date: string
  overallStart: string
  overallEnd: string
  roles: MultiAreaRole[]
}

export interface ProjectSchedule {
  oneTime?: OneTimeSchedule
  multiDay?: MultiDayScheduleDay[]
  multiRole?: MultiAreaSchedule
}

export interface Profile {
  full_name: string | null
  avatar_url: string | null
  username: string | null
}

export interface Project {
  id: string
  title: string
  description: string
  location: string
  event_type: EventType
  verification_method: VerificationMethod
  require_login: boolean
  creator_id: string
  schedule: ProjectSchedule
  status: 'active' | 'completed' | 'cancelled'
  profiles: Profile
  created_at: string
}