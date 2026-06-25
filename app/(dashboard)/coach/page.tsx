import { DEMO_TEAM, PLANS } from '@/lib/data'
import { formatTimeAgo } from '@/lib/utils'

function statusColor(lastActive: string) {
  const hours = (Date.now() - new Date(lastActive).getTime()) / 3600000
  if (hours < 24) return '#27AE60'
  if (hours < 72) return '#F5A623'
  return '#EF4444'
}

export default function CoachPage() {
  const team = DEMO_TEAM
  const activeCount = team.filter(m => (Date.now() - new Date(m.last_active).getTime()) < 86400000).length
  const avgStreak = Math.round(team.reduce((acc, m) => acc + m.streak_count, 0) / team.length)
  const avgLevel = Math.round(team.reduce((acc, m) => acc + m.level, 0) / team.length)

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black">Coach Dashboard 📊</h1>
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full font-bold" style={{ background: 'var(--navy)', color: '#8ab' }}>
          Invite Code: <span className="font-black text-white ml-1">SPIKE-2026</span>
        </div>
      </div>

      {/* Team overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Players', value: team.length, icon: '👥' },
          { label: 'Active Today', value: activeCount, icon: '✅' },
          { label: 'Avg Streak', value: `${avgStreak}🔥`, icon: '' },
          { label: 'Avg Level', value: avgLevel, icon: '⭐' },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'var(--surface)' }}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xl font-black">{s.value}</div>
            <div className="text-[11px] opacity-50">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Roster */}
      <div>
        <h2 className="font-black mb-3">Roster</h2>
        <div className="space-y-3">
          {team.map(player => {
            const color = statusColor(player.last_active)
            const needsAttention = (Date.now() - new Date(player.last_active).getTime()) > 259200000

            return (
              <div
                key={player.id}
                className="rounded-xl p-4"
                style={{ background: 'var(--surface)', border: needsAttention ? '1px solid #EF4444' : '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black shrink-0" style={{ background: 'var(--navy)' }}>
                    {player.display_name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{player.display_name}</span>
                      {needsAttention && <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: '#EF444430', color: '#EF4444' }}>Inactive</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs opacity-60">
                      <span>Lv.{player.level}</span>
                      <span>{player.xp.toLocaleString()} XP</span>
                      <span>🔥{player.streak_count}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(player.last_active)}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full ml-auto mb-1" style={{ background: color }} title={`Last active ${formatTimeAgo(player.last_active)}`} />
                    <p className="text-[10px] opacity-50 max-w-[80px] text-right leading-tight">{player.active_plan ?? '—'}</p>
                  </div>
                </div>

                {/* XP mini bar */}
                <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div className="h-full rounded-full xp-bar-fill" style={{ width: `${Math.min(100, (player.xp % 1000) / 10)}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Assign plan */}
      <div className="rounded-xl p-4" style={{ background: 'var(--surface)' }}>
        <h2 className="font-black mb-3">Assign a Plan</h2>
        <p className="text-sm opacity-60 mb-4">Push a training plan to one or all players. Full assignment in Phase 2.</p>
        <div className="space-y-2">
          {PLANS.map(plan => (
            <div key={plan.id} className="flex items-center justify-between rounded-lg px-3 py-2.5" style={{ background: 'var(--surface2)' }}>
              <div>
                <p className="text-sm font-bold">{plan.title}</p>
                <p className="text-xs opacity-50">{plan.duration_weeks}wk · {plan.days_per_week}x/wk · {plan.tier}</p>
              </div>
              <button
                className="text-xs font-bold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                style={{ background: 'var(--gold)', color: '#000' }}
              >
                Assign
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
