import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🏐</div>
          <h1 className="text-3xl font-black" style={{ color: 'var(--gold)' }}>SPIKE</h1>
          <p className="text-sm opacity-60 mt-1">Volleyball Training · Leveled Up</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
