'use client'
import { useState } from 'react'
import type { Video } from '@/types'

const LEVEL_COLOR: Record<string, string> = {
  Beginner: '#27AE60',
  Intermediate: '#F5A623',
  Advanced: '#EF4444',
}

export default function VideoCard({ video, onComplete }: { video: Video; onComplete?: (id: string) => void }) {
  const [playing, setPlaying] = useState(false)
  const [completed, setCompleted] = useState(false)

  function handleComplete() {
    setCompleted(true)
    onComplete?.(video.id)
  }

  return (
    <div className="rounded-xl overflow-hidden card-glow transition-all" style={{ background: 'var(--surface)' }}>
      {playing ? (
        <div className="relative aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="relative w-full aspect-video group focus:outline-none"
        >
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--gold)' }}>
              <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium text-white" style={{ background: LEVEL_COLOR[video.skill_level] }}>
            {video.skill_level}
          </span>
          <span className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded bg-black/70 text-white">
            {video.duration}
          </span>
        </button>
      )}
      <div className="p-3">
        <p className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-50">{video.category}</p>
        <h3 className="font-bold text-sm leading-tight mb-1">{video.title}</h3>
        <p className="text-xs opacity-60 line-clamp-2">{video.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs font-bold" style={{ color: 'var(--gold)' }}>+{video.xp_reward} XP</span>
          {playing && !completed && (
            <button
              onClick={handleComplete}
              className="text-xs px-3 py-1 rounded-full font-bold transition-colors hover:opacity-90"
              style={{ background: 'var(--green)', color: '#fff' }}
            >
              Mark Complete ✓
            </button>
          )}
          {completed && (
            <span className="text-xs font-bold animate-pop" style={{ color: 'var(--green)' }}>
              ✓ Completed! +{video.xp_reward} XP
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
