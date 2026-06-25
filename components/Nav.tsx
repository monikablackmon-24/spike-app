'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/dashboard', label: 'Home', icon: '🏠' },
  { href: '/videos', label: 'Videos', icon: '🎬' },
  { href: '/plans', label: 'Plans', icon: '📋' },
  { href: '/profile', label: 'Profile', icon: '👤' },
  { href: '/coach', label: 'Coach', icon: '📊' },
]

export default function Nav() {
  const path = usePathname()
  return (
    <>
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-56 min-h-screen border-r py-6 px-3 shrink-0" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 px-3 mb-8">
          <span className="text-2xl">🏐</span>
          <span className="text-xl font-black tracking-tight" style={{ color: 'var(--gold)' }}>SPIKE</span>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: path.startsWith(n.href) ? 'var(--navy)' : 'transparent',
                color: path.startsWith(n.href) ? 'var(--gold)' : 'inherit',
              }}
            >
              <span>{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Bottom nav for mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex border-t z-50" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        {NAV.map(n => (
          <Link
            key={n.href}
            href={n.href}
            className="flex-1 flex flex-col items-center py-2 text-[10px] font-medium transition-colors"
            style={{ color: path.startsWith(n.href) ? 'var(--gold)' : '#6b7a8d' }}
          >
            <span className="text-lg">{n.icon}</span>
            {n.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
