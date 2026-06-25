'use client'
import { useState } from 'react'
import { PLANS, VIDEOS } from '@/lib/data'
import type { Plan } from '@/types'

const TIER_COLOR: Record<string, string> = {
  Beginner: '#27AE60',
  Intermediate: '#F5A623',
  Advanced: '#EF4444',
}

function PlanCard({ plan, active, onSelect }: { plan: Plan; active: boolean; onSelect: () => void }) {
  return (
    <div
      className="rounded-xl p-5 cursor-pointer transition-all"
      style={{
        background: 'var(--surface)',
        border: active ? `2px solid var(--gold)` : '2px solid var(--border)',
      }}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: TIER_COLOR[plan.tier], color: '#fff' }}
        >
          {plan.tier}
        </span>
        {active && <span className="text-xs font-bold" style={{ color: 'var(--gold)' }}>✓ Active</span>}
      </div>
      <h3 className="font-black text-base mb-1">{plan.title}</h3>
      <p className="text-xs opacity-60 mb-3">{plan.description}</p>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: 'Weeks', value: plan.duration_weeks },
          { label: 'Days/wk', value: plan.days_per_week },
          { label: 'Per session', value: plan.session_length },
        ].map(s => (
          <div key={s.label} className="rounded-lg py-2" style={{ background: 'var(--surface2)' }}>
            <div className="font-black text-sm">{s.value}</div>
            <div className="text-[10px] opacity-50">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PlansPage() {
  const [activePlanId, setActivePlanId] = useState('plan-intermediate')
  const [expandedSession, setExpandedSession] = useState<string | null>(null)
  const activePlan = PLANS.find(p => p.id === activePlanId)!

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-xl font-black">Training Plans 📋</h1>

      {/* Plan cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {PLANS.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            active={plan.id === activePlanId}
            onSelect={() => setActivePlanId(plan.id)}
          />
        ))}
      </div>

      {/* Active plan detail */}
      <div>
        <h2 className="font-black text-lg mb-4 flex items-center gap-2">
          <span style={{ color: 'var(--gold)' }}>🗓</span> {activePlan.title} — Week 1
        </h2>
        <div className="space-y-3">
          {activePlan.sessions.filter(s => s.week === 1).map(session => {
            const key = `${session.week}-${session.day}`
            const isOpen = expandedSession === key
            const sessionVideos = VIDEOS.filter(v => session.video_ids.includes(v.id))
            return (
              <div key={key} className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)' }}>
                <button
                  onClick={() => setExpandedSession(isOpen ? null : key)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <div>
                    <p className="font-bold text-sm">{session.title}</p>
                    <p className="text-xs opacity-50 mt-0.5">{sessionVideos.length} videos · ~{sessionVideos.length * 12} min</p>
                  </div>
                  <span className="text-lg">{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                  <div className="border-t px-4 py-3 space-y-3" style={{ borderColor: 'var(--border)' }}>
                    {sessionVideos.map(v => (
                      <div key={v.id} className="flex items-center gap-3 rounded-lg p-2" style={{ background: 'var(--surface2)' }}>
                        <img src={v.thumbnail} alt={v.title} className="w-16 h-10 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-tight truncate">{v.title}</p>
                          <p className="text-[11px] opacity-50">{v.duration} · +{v.xp_reward} XP</p>
                        </div>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: TIER_COLOR[v.skill_level] + '33', color: TIER_COLOR[v.skill_level] }}>
                          {v.skill_level}
                        </span>
                      </div>
                    ))}
                    <button
                      className="w-full py-2 rounded-lg text-sm font-bold transition-opacity hover:opacity-80 mt-2"
                      style={{ background: 'var(--gold)', color: '#000' }}
                    >
                      Start Session → +50 XP
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
