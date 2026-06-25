export type Role = 'player' | 'coach' | 'parent' | 'admin'
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type Position = 'Setter' | 'Outside Hitter' | 'Libero' | 'Middle' | 'Opposite' | 'DS'
export type VideoCategory =
  | 'Serving'
  | 'Passing & Receiving'
  | 'Setting'
  | 'Attacking'
  | 'Blocking'
  | 'Defense'
  | 'Game IQ'
  | 'Strength & Conditioning'

export interface User {
  id: string
  email: string
  role: Role
  display_name: string
  avatar?: string
}

export interface Profile {
  user_id: string
  level: number
  xp: number
  streak_count: number
  last_active: string
  skill_ratings: SkillRatings
}

export interface SkillRatings {
  serve: number
  pass: number
  set: number
  attack: number
  block: number
  defense: number
  fitness: number
}

export interface Video {
  id: string
  title: string
  category: VideoCategory
  skill_level: SkillLevel
  position?: Position
  youtube_id: string
  thumbnail: string
  duration: string
  description: string
  xp_reward: number
}

export interface Plan {
  id: string
  title: string
  tier: SkillLevel
  duration_weeks: number
  days_per_week: number
  session_length: string
  focus: string
  description: string
  sessions: PlanSession[]
}

export interface PlanSession {
  week: number
  day: number
  title: string
  video_ids: string[]
  notes?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: string
  earned?: boolean
  earned_at?: string
}

export interface TeamMember {
  id: string
  display_name: string
  avatar?: string
  level: number
  xp: number
  streak_count: number
  last_active: string
  active_plan?: string
}

export const RANK_TIERS = [
  { name: 'Rookie', min: 0, max: 500, levels: [1, 2, 3], color: '#6B7280' },
  { name: 'Club Player', min: 501, max: 1500, levels: [4, 5, 6], color: '#3B82F6' },
  { name: 'Varsity', min: 1501, max: 3500, levels: [7, 8, 9], color: '#8B5CF6' },
  { name: 'All-Star', min: 3501, max: 7000, levels: [10, 11, 12], color: '#F59E0B' },
  { name: 'Elite', min: 7001, max: 12000, levels: [13, 14, 15], color: '#EF4444' },
  { name: 'MVP', min: 12001, max: Infinity, levels: [16], color: '#F5A623' },
]

export function getRankForXP(xp: number) {
  return RANK_TIERS.find(r => xp >= r.min && xp <= r.max) ?? RANK_TIERS[0]
}

export function getLevelForXP(xp: number): number {
  if (xp < 500) return Math.floor(xp / 167) + 1
  if (xp < 1500) return Math.floor((xp - 500) / 333) + 4
  if (xp < 3500) return Math.floor((xp - 1500) / 667) + 7
  if (xp < 7000) return Math.floor((xp - 3500) / 1167) + 10
  if (xp < 12000) return Math.floor((xp - 7000) / 1667) + 13
  return 16
}

export function getXPForNextLevel(xp: number): { current: number; next: number } {
  const rank = RANK_TIERS.find(r => xp >= r.min && xp <= r.max) ?? RANK_TIERS[0]
  return { current: xp - rank.min, next: rank.max - rank.min }
}
