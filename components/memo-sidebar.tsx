"use client"

import { FileText, Hash, Star, Trash2, Plus, Search, Inbox, Archive, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

interface MemoSidebarProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  onNewMemo: () => void
  onSearchChange: (query: string) => void
  searchQuery: string
  noteCounts: Record<string, number>
  userName?: string | null
  userEmail?: string | null
}

const categories = [
  { id: "all", label: "모든 메모", icon: Inbox },
  { id: "favorites", label: "즐겨찾기", icon: Star },
  { id: "archive", label: "보관함", icon: Archive },
  { id: "trash", label: "휴지통", icon: Trash2 },
]

const tags = [
  { id: "work", label: "업무", color: "bg-primary" },
  { id: "personal", label: "개인", color: "bg-accent" },
  { id: "ideas", label: "아이디어", color: "bg-[hsl(160,60%,45%)]" },
  { id: "study", label: "공부", color: "bg-[hsl(280,60%,55%)]" },
]

export function MemoSidebar({
  activeCategory,
  onCategoryChange,
  onNewMemo,
  onSearchChange,
  searchQuery,
  noteCounts,
  userName,
  userEmail,
}: MemoSidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-card-foreground">Memo</h1>
        </div>
        <button
          onClick={onNewMemo}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
          aria-label="새 메모 만들기"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="메모 검색..."
            className="w-full bg-transparent text-card-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3">
        <div className="mb-6">
          <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            카테고리
          </p>
          <ul className="flex flex-col gap-1">
            {categories.map((cat) => {
              const Icon = cat.icon
              const count = noteCounts[cat.id] ?? 0
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => onCategoryChange(cat.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      activeCategory === cat.id
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-card-foreground hover:bg-secondary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{cat.label}</span>
                    {count > 0 && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs",
                          activeCategory === cat.id
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            태그
          </p>
          <ul className="flex flex-col gap-1">
            {tags.map((tag) => (
              <li key={tag.id}>
                <button
                  onClick={() => onCategoryChange(tag.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    activeCategory === tag.id
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-card-foreground hover:bg-secondary"
                  )}
                >
                  <Hash className="h-4 w-4" />
                  <span className="flex-1 text-left">{tag.label}</span>
                  <span className={cn("h-2.5 w-2.5 rounded-full", tag.color)} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
            {(userName ?? userEmail ?? "U").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-card-foreground">
              {userName ?? userEmail ?? "사용자"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {userEmail ?? "메모 앱"}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="로그아웃"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
