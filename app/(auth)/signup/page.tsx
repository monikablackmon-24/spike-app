import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🏐</div>
          <h1 className="text-3xl font-black" style={{ color: 'var(--gold)' }}>SPIKE</h1>
          <p className="text-sm opacity-60 mt-1">Start your volleyball journey</p>
        </div>

        <div className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--surface)' }}>
          <h2 className="text-lg font-black">Create account</h2>

          <div className="space-y-3">
            <input type="text" placeholder="Display name" className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'inherit' }} />
            <input type="email" placeholder="Email" className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'inherit' }} />
            <input type="password" placeholder="Password" className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'inherit' }} />
            <select className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'inherit' }}>
              <option>I am a Player</option>
              <option>I am a Coach</option>
              <option>I am a Parent</option>
            </select>
          </div>

          <Link
            href="/dashboard"
            className="block w-full py-3 rounded-xl text-center font-black text-sm transition-opacity hover:opacity-90"
            style={{ background: 'var(--gold)', color: '#000' }}
          >
            Create Account 🚀
          </Link>

          <p className="text-[11px] text-center opacity-40 leading-relaxed">
            By signing up you agree to our Terms of Service. Players under 13 require parental consent.
          </p>

          <p className="text-center text-xs opacity-50">
            Already have an account?{' '}
            <Link href="/login" className="font-bold" style={{ color: 'var(--gold)' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
