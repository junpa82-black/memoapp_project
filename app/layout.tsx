import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

import './globals.css'
import { AuthSessionProvider } from '@/components/providers/session-provider'
import { AuthGuard } from '@/components/auth-guard'

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})
const _jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Memo - 나만의 메모 앱',
  description: '간편하고 깔끔한 메모 앱으로 생각을 정리하세요.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${_inter.variable} ${_jetbrains.variable} font-sans antialiased`}>
        <AuthSessionProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
