'use client'
import { useState } from 'react'
import { VIDEOS } from '@/lib/data'
import VideoCard from '@/components/VideoCard'
import type { Video, VideoCategory, SkillLevel } from '@/types'

const CATEGORIES: VideoCategory[] = [
  'Serving', 'Passing & Receiving', 'Setting', 'Attacking',
  'Blocking', 'Defense', 'Game IQ', 'Strength & Conditioning',
]
const LEVELS: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced']

export default function VideosClient({ videos, completedIds }: { videos: Video[]; completedIds: string[] }) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState<VideoCategory | 'All'>('All')
  const [level, setLevel] = useState<SkillLevel | 'All'>('All')

  const filtered = videos.filter(v => {
    if (cat !== 'All' && v.category !== cat) return false
    if (level !== 'All' && v.skill_level !== level) return false
    if (search && !v.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const completedCount = completedIds.length

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-black">Video Library 🎬</h1>
        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'var(--surface)', color: 'var(--green)' }}>
          {completedCount}/{videos.length} done
        </span>
      </div>

      <input
        type="text"
        placeholder="Search videos..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full rounded-xl px-4 py-2.5 text-sm mb-4 outline-none"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'inherit' }}
      />

      <div className="flex gap-2 mb-3 flex-wrap">
        {(['All', ...LEVELS] as const).map(l => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className="text-xs px-3 py-1.5 rounded-full font-bold transition-all"
            style={{ background: level === l ? 'var(--gold)' : 'var(--surface)', color: level === l ? '#000' : 'inherit' }}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {(['All', ...CATEGORIES] as const).map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className="text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all shrink-0"
            style={{
              background: cat === c ? 'var(--navy)' : 'var(--surface)',
              color: cat === c ? '#fff' : 'inherit',
              border: cat === c ? '1px solid #2d5a9e' : '1px solid var(--border)',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-xs opacity-50 mb-4">{filtered.length} video{filtered.length !== 1 ? 's' : ''}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(v => (
          <VideoCard key={v.id} video={v} alreadyCompleted={completedIds.includes(v.id)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 opacity-50">
          <div className="text-4xl mb-3">🔍</div>
          <p>No videos found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  )
}
