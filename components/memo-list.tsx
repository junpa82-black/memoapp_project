"use client"

import { Star, MoreHorizontal, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Memo } from "@/lib/memo-data"

interface MemoListProps {
  memos: Memo[]
  selectedId: string | null
  onSelect: (id: string) => void
  onToggleFavorite: (id: string) => void
  onDelete?: (id: string, permanent?: boolean) => void
  categoryLabel: string
}

export function MemoList({
  memos,
  selectedId,
  onSelect,
  onToggleFavorite,
  onDelete,
  categoryLabel,
}: MemoListProps) {
  return (
    <section className="flex h-full w-80 flex-col border-r border-border bg-card">
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-card-foreground">
            {categoryLabel}
          </h2>
          <p className="text-xs text-muted-foreground">
            {memos.length}개의 메모
          </p>
        </div>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-card-foreground"
          aria-label="더보기"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {memos.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
            <p className="text-sm text-muted-foreground">메모가 없습니다</p>
          </div>
        ) : (
          <ul className="flex flex-col p-2">
            {memos.map((memo) => (
              <li key={memo.id}>
                <button
                  onClick={() => onSelect(memo.id)}
                  className={cn(
                    "group flex w-full flex-col gap-1.5 rounded-xl px-4 py-3.5 text-left transition-all",
                    selectedId === memo.id
                      ? "bg-primary/8 ring-1 ring-primary/20"
                      : "hover:bg-secondary/80"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={cn(
                        "min-w-0 flex-1 truncate text-sm font-medium",
                        selectedId === memo.id
                          ? "text-primary"
                          : "text-card-foreground"
                      )}
                    >
                      {memo.title}
                    </h3>
                    <div className="flex shrink-0 items-center gap-0.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleFavorite(memo.id)
                        }}
                        className={cn(
                          "rounded p-1 transition-colors",
                          memo.favorite
                            ? "text-accent"
                            : "text-transparent group-hover:text-muted-foreground"
                        )}
                        aria-label={memo.favorite ? "즐겨찾기 해제" : "즐겨찾기"}
                      >
                        <Star
                          className="h-3.5 w-3.5"
                          fill={memo.favorite ? "currentColor" : "none"}
                        />
                      </button>
                      {onDelete && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(memo.id, memo.trashed)
                          }}
                          className="rounded p-1 text-transparent transition-colors group-hover:text-destructive hover:text-destructive"
                          aria-label={memo.trashed ? "영구 삭제" : "휴지통으로 이동"}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {memo.content}
                  </p>
                  <div className="flex items-center gap-2">
                    <time className="text-[11px] text-muted-foreground/70">
                      {memo.date}
                    </time>
                    {memo.tag && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          memo.tagColor
                        )}
                      >
                        {memo.tag}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
