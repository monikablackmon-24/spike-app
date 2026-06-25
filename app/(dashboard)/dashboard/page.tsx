import XPBar from '@/components/XPBar'
import { DEMO_PROFILE, VIDEOS, PLANS } from '@/lib/data'
import { getLevelForXP } from '@/types'
import Link from 'next/link'

const DAILY_CHALLENGE = {
  title: 'Serve Fundamentals',
  description: 'Watch 2 serving videos and complete 1 workout session.',
  xp: 25,
  progress: 1,
  total: 3,
}

export default function DashboardPage() {
  const profile = DEMO_PROFILE
  const level = getLevelForXP(profile.xp)
  const recentVideos = VIDEOS.slice(0, 4)
  const activePlan = PLANS[1]

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black">Hey, Athlete! 👋</h1>
          <p className="text-sm opacity-60">Keep your streak going — train today.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-sm animate-flame" style={{ background: '#1a2535', color: '#F5A623' }}>
          🔥 {profile.streak_count} day streak
        </div>
      </div>

      {/* XP Bar */}
      <XPBar xp={profile.xp} level={level} />

      {/* Daily Challenge */}
      <div className="rounded-xl p-4 border" style={{ background: 'var(--navy)', borderColor: '#2d5a9e' }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-60">Daily Challenge</p>
            <h2 className="font-bold text-base">{DAILY_CHALLENGE.title}</h2>
            <p className="text-sm opacity-70 mt-0.5">{DAILY_CHALLENGE.description}</p>
          </div>
          <span className="text-sm font-black px-3 py-1 rounded-full shrink-0 ml-2" style={{ background: 'var(--gold)', color: '#000' }}>
            +{DAILY_CHALLENGE.xp} XP
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#0f1923' }}>
            <div className="h-full rounded-full xp-bar-fill" style={{ width: `${(DAILY_CHALLENGE.progress / DAILY_CHALLENGE.total) * 100}%` }} />
          </div>
          <span className="text-xs font-bold opacity-70">{DAILY_CHALLENGE.progress}/{DAILY_CHALLENGE.total}</span>
        </div>
      </div>

      {/* Active Plan */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold">Active Plan</h2>
          <Link href="/plans" className="text-xs font-bold" style={{ color: 'var(--gold)' }}>View All →</Link>
        </div>
        <div className="rounded-xl p-4" style={{ background: 'var(--surface)' }}>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: 'var(--orange)', color: '#fff' }}>
                {activePlan.tier}
              </span>
              <h3 className="font-bold">{activePlan.title}</h3>
              <p className="text-xs opacity-60 mt-1">{activePlan.duration_weeks} weeks · {activePlan.days_per_week}x/week · {activePlan.session_length}</p>
            </div>
            <Link
              href="/plans"
              className="text-sm font-bold px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
              style={{ background: 'var(--gold)', color: '#000' }}
            >
              Continue
            </Link>
          </div>
          <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs font-bold mb-2 opacity-60">TODAY&apos;S SESSION</p>
            <p className="text-sm font-medium">{activePlan.sessions[0].title}</p>
          </div>
        </div>
      </div>

      {/* Continue Watching */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold">Continue Watching</h2>
          <Link href="/videos" className="text-xs font-bold" style={{ color: 'var(--gold)' }}>See All →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {recentVideos.map(v => (
            <Link key={v.id} href="/videos" className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)' }}>
              <div className="relative aspect-video">
                <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
                <span className="absolute bottom-1.5 right-1.5 text-[10px] bg-black/80 text-white px-1.5 py-0.5 rounded">{v.duration}</span>
              </div>
              <div className="p-2">
                <p className="text-[11px] font-bold leading-tight line-clamp-2">{v.title}</p>
                <p className="text-[10px] opacity-50 mt-0.5">{v.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Sessions', value: '12', icon: '💪' },
          { label: 'Videos', value: '34', icon: '🎬' },
          { label: 'Badges', value: '3', icon: '🏅' },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'var(--surface)' }}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-lg font-black">{s.value}</div>
            <div className="text-[11px] opacity-50">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
