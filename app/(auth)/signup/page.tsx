import SignupForm from './SignupForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🏐</div>
          <h1 className="text-3xl font-black" style={{ color: 'var(--gold)' }}>SPIKE</h1>
          <p className="text-sm opacity-60 mt-1">Start your volleyball journey</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
