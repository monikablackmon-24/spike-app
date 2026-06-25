export default function DebugPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div style={{ padding: 32, fontFamily: 'monospace' }}>
      <h2>Env Check</h2>
      <p>SUPABASE_URL: {url ? `✅ ${url}` : '❌ NOT SET'}</p>
      <p>SUPABASE_ANON_KEY: {key ? `✅ set (${key.slice(0, 20)}...)` : '❌ NOT SET'}</p>
    </div>
  )
}
