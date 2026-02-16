"use client"

import { useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"

const navLinks = [
  { label: "브랜드 소개", href: "#brand" },
  { label: "컬렉션", href: "#collection" },
  { label: "가치", href: "#values" },
  { label: "팀", href: "#team" },
  { label: "연락처", href: "#contact" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="font-serif text-2xl tracking-[0.2em] text-foreground">
          MAISON
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="주요 네비게이션">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="p-2 text-foreground hover:text-accent transition-colors"
            aria-label="장바구니"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-6 py-4 gap-4" aria-label="모바일 네비게이션">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
