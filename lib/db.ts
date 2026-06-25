import { createClient } from '@/lib/supabase/client'
import { getLevelForXP } from '@/types'

export async function getProfile() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return data
}

export async function completeVideo(videoId: string, xpReward: number) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Insert completion (ignore if already done)
  const { error } = await supabase
    .from('video_completions')
    .insert({ user_id: user.id, video_id: videoId, xp_awarded: xpReward })

  if (!error) {
    // Award XP
    await supabase.rpc('award_xp', { p_user_id: user.id, p_xp: xpReward })
    // Update streak
    await supabase.rpc('update_streak', { p_user_id: user.id })
  }
}

export async function completeSession(planId: string, sessionKey: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('session_completions')
    .insert({ user_id: user.id, plan_id: planId, session_key: sessionKey, xp_awarded: 50 })

  if (!error) {
    await supabase.rpc('award_xp', { p_user_id: user.id, p_xp: 50 })
    await supabase.rpc('update_streak', { p_user_id: user.id })
  }
}

export async function getCompletedVideoIds(): Promise<string[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('video_completions')
    .select('video_id')
    .eq('user_id', user.id)

  return data?.map(r => r.video_id) ?? []
}

export async function getActivePlan() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('plan_assignments')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return data
}

export async function assignPlan(planId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Deactivate existing plans
  await supabase
    .from('plan_assignments')
    .update({ is_active: false })
    .eq('user_id', user.id)

  // Assign new plan
  await supabase
    .from('plan_assignments')
    .insert({ user_id: user.id, plan_id: planId })
}

export async function getEarnedBadgeIds(): Promise<string[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('badges')
    .select('badge_id')
    .eq('user_id', user.id)

  return data?.map(r => r.badge_id) ?? []
}
