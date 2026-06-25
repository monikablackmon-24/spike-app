import SkillRadar from '@/components/RadarChart'
import XPBar from '@/components/XPBar'
import { DEMO_PROFILE, BADGES } from '@/lib/data'
import { getLevelForXP, getRankForXP, RANK_TIERS } from '@/types'

const EARNED_BADGE_IDS = ['b1', 'b5', 'b7']

export default function ProfilePage() {
  const profile = DEMO_PROFILE
  const level = getLevelForXP(profile.xp)
  const rank = getRankForXP(profile.xp)

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      {/* Profile header */}
      <div className="rounded-xl p-5 text-center" style={{ background: 'var(--surface)' }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-3" style={{ background: 'var(--navy)' }}>
          🏐
        </div>
        <h1 className="text-xl font-black">Athlete #1</h1>
        <p className="font-bold mt-1" style={{ color: rank.color }}>{rank.name}</p>
        <p className="text-sm opacity-50 mt-0.5">Level {level} · {profile.xp.toLocaleString()} XP</p>
        <div className="mt-3">
          <XPBar xp={profile.xp} level={level} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Streak', value: `${profile.streak_count}🔥`, sub: 'days' },
          { label: 'Videos', value: '34', sub: 'watched' },
          { label: 'Sessions', value: '12', sub: 'completed' },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'var(--surface)' }}>
            <div className="text-xl font-black">{s.value}</div>
            <div className="text-[11px] opacity-50">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Skill Radar */}
      <div className="rounded-xl p-4" style={{ background: 'var(--surface)' }}>
        <h2 className="font-black mb-4">Skill Radar</h2>
        <SkillRadar ratings={profile.skill_ratings} />
        <div className="grid grid-cols-2 gap-2 mt-4">
          {Object.entries(profile.skill_ratings).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between rounded-lg px-3 py-1.5 text-sm" style={{ background: 'var(--surface2)' }}>
              <span className="capitalize opacity-70">{key}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div className="h-full rounded-full" style={{ width: `${val}%`, background: 'var(--gold)' }} />
                </div>
                <span className="font-bold text-xs">{val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="rounded-xl p-4" style={{ background: 'var(--surface)' }}>
        <h2 className="font-black mb-4">Badges</h2>
        <div className="grid grid-cols-4 gap-3 md:grid-cols-5">
          {BADGES.map(badge => {
            const earned = EARNED_BADGE_IDS.includes(badge.id)
            return (
              <div key={badge.id} className="flex flex-col items-center text-center gap-1" title={badge.description}>
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${earned ? 'badge-earned' : 'opacity-30 grayscale'}`}
                  style={{ background: earned ? 'var(--navy)' : 'var(--surface2)' }}
                >
                  {badge.icon}
                </div>
                <span className="text-[10px] font-medium leading-tight">{badge.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Rank progression */}
      <div className="rounded-xl p-4" style={{ background: 'var(--surface)' }}>
        <h2 className="font-black mb-4">Rank Path</h2>
        <div className="space-y-2">
          {RANK_TIERS.map(tier => {
            const reached = profile.xp >= tier.min
            return (
              <div key={tier.name} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ background: reached ? 'var(--surface2)' : 'transparent', opacity: reached ? 1 : 0.4 }}>
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: tier.color }} />
                <span className="font-bold text-sm flex-1" style={{ color: reached ? tier.color : 'inherit' }}>{tier.name}</span>
                <span className="text-xs opacity-60">{tier.min === 0 ? '0' : tier.min.toLocaleString()}+ XP</span>
                {reached && <span className="text-xs">✓</span>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
