import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SPIKE – Volleyball Training',
  description: 'Gamified volleyball training for kids and teens.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  )
}
