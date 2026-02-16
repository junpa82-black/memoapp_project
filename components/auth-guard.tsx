"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

const publicPaths = ["/login", "/register"]

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "loading") return

    if (session && publicPaths.includes(pathname)) {
      router.replace("/")
      return
    }

    if (!session && !publicPaths.includes(pathname)) {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [session, status, pathname, router])

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">로딩 중...</div>
      </div>
    )
  }

  if (publicPaths.includes(pathname)) {
    return <>{children}</>
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}
