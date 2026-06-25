import { createClient } from '@/lib/supabase/server'
import { VIDEOS } from '@/lib/data'
import VideosClient from './VideosClient'

export default async function VideosPage() {
  let completedIds: string[] = []
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('video_completions')
        .select('video_id')
        .eq('user_id', user.id)
      completedIds = data?.map(r => r.video_id) ?? []
    }
  } catch {}

  return <VideosClient videos={VIDEOS} completedIds={completedIds} />
}
