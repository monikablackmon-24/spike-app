'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupForm() {
  const router = useRouter()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'player' | 'coach' | 'parent'>('player')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName, role },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl p-6 text-center space-y-4" style={{ background: 'var(--surface)' }}>
        <div className="text-5xl">📬</div>
        <h2 className="font-black text-lg">Check your email!</h2>
        <p className="text-sm opacity-60">We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
        <Link href="/login" className="block text-sm font-bold" style={{ color: 'var(--gold)' }}>Back to login</Link>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--surface)' }}>
      <h2 className="text-lg font-black">Create account</h2>

      {error && (
        <div className="text-sm px-3 py-2 rounded-lg" style={{ background: '#EF444420', color: '#EF4444' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Display name"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          required
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'inherit' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'inherit' }}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'inherit' }}
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value as typeof role)}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'inherit' }}
        >
          <option value="player">I am a Player</option>
          <option value="coach">I am a Coach</option>
          <option value="parent">I am a Parent</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-black text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: 'var(--gold)', color: '#000' }}
        >
          {loading ? 'Creating account...' : 'Create Account 🚀'}
        </button>
      </form>

      <p className="text-[11px] text-center opacity-40 leading-relaxed">
        By signing up you agree to our Terms of Service. Players under 13 require parental consent.
      </p>

      <p className="text-center text-xs opacity-50">
        Already have an account?{' '}
        <Link href="/login" className="font-bold" style={{ color: 'var(--gold)' }}>Sign in</Link>
      </p>
    </div>
  )
}
