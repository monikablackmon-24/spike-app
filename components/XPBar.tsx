'use client'
import { getRankForXP, getXPForNextLevel } from '@/types'

export default function XPBar({ xp, level }: { xp: number; level: number }) {
  const rank = getRankForXP(xp)
  const { current, next } = getXPForNextLevel(xp)
  const pct = Math.min(100, Math.round((current / next) * 100))

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-xl" style={{ background: 'var(--surface)' }}>
      <div className="flex flex-col items-center min-w-[48px]">
        <span className="text-xs font-bold" style={{ color: rank.color }}>Lv.{level}</span>
        <span className="text-[10px] opacity-60">{rank.name}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-[11px] mb-1 opacity-70">
          <span style={{ color: 'var(--gold)' }}>{xp.toLocaleString()} XP</span>
          <span>{current}/{next}</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <div className="h-full rounded-full xp-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}
