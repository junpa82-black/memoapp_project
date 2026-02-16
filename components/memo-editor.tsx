"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  Star,
  MoreHorizontal,
  Clock,
  Tag,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Memo } from "@/lib/memo-data"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MemoEditorProps {
  memo: Memo | null
  onToggleFavorite: (id: string) => void
  onSave: (id: string, data: { title?: string; fullContent?: string }) => void
  onDelete: (id: string, permanent?: boolean) => void
  onRestore?: (id: string) => void
}

const toolbarButtons = [
  { icon: Bold, label: "굵게" },
  { icon: Italic, label: "기울임" },
  { icon: Underline, label: "밑줄" },
  { separator: true },
  { icon: List, label: "목록" },
  { icon: ListOrdered, label: "번호 목록" },
  { separator: true },
  { icon: Link, label: "링크" },
  { icon: Image, label: "이미지" },
] as const

const SAVE_DEBOUNCE_MS = 500

export function MemoEditor({
  memo,
  onToggleFavorite,
  onSave,
  onDelete,
  onRestore,
}: MemoEditorProps) {
  const [title, setTitle] = useState("")
  const [fullContent, setFullContent] = useState("")
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (memo) {
      setTitle(memo.title)
      setFullContent(memo.fullContent)
      setSavedAt(null)
    }
  }, [memo?.id])

  const scheduleSave = useCallback(() => {
    if (!memo) return
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => {
      onSave(memo.id, { title, fullContent })
      setSavedAt(new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }))
      saveTimeoutRef.current = null
    }, SAVE_DEBOUNCE_MS)
  }, [memo, title, fullContent, onSave])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    scheduleSave()
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFullContent(e.target.value)
    scheduleSave()
  }

  if (!memo) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
          <svg
            className="h-8 w-8 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-base font-medium text-card-foreground">
            메모를 선택하세요
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            왼쪽 목록에서 메모를 선택하거나 새 메모를 작성하세요
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{memo.date}{savedAt ? ` · ${savedAt} 저장` : ""}</span>
          </div>
          {memo.tag && (
            <div className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-medium",
                  memo.tagColor
                )}
              >
                {memo.tag}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleFavorite(memo.id)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              memo.favorite
                ? "text-accent"
                : "text-muted-foreground hover:bg-secondary hover:text-card-foreground"
            )}
            aria-label={memo.favorite ? "즐겨찾기 해제" : "즐겨찾기"}
          >
            <Star
              className="h-4 w-4"
              fill={memo.favorite ? "currentColor" : "none"}
            />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-card-foreground"
                aria-label="더보기"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {memo.trashed ? (
                <>
                  <DropdownMenuItem onClick={() => onRestore?.(memo.id)}>
                    휴지통에서 복원
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(memo.id, true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    영구 삭제
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem
                  onClick={() => onDelete(memo.id, false)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  휴지통으로 이동
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-border px-6 py-2">
        {toolbarButtons.map((item, i) => {
          if ("separator" in item) {
            return (
              <div
                key={`sep-${i}`}
                className="mx-1 h-5 w-px bg-border"
              />
            )
          }
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-card-foreground"
              aria-label={item.label}
            >
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      {/* Editor Content */}
      <div className="flex flex-1 flex-col overflow-y-auto px-8 py-6">
        <Input
          value={title}
          onChange={handleTitleChange}
          placeholder="제목"
          className="mb-4 h-auto border-0 p-0 text-2xl font-bold shadow-none focus-visible:ring-0"
        />
        <Textarea
          value={fullContent}
          onChange={handleContentChange}
          placeholder="여기에 내용을 입력하세요..."
          className="min-h-[200px] flex-1 resize-none border-0 p-0 text-sm shadow-none focus-visible:ring-0"
        />
      </div>

      {/* Word Count */}
      <footer className="flex items-center justify-between border-t border-border px-6 py-2.5">
        <span className="text-xs text-muted-foreground">
          {fullContent.length}자
        </span>
        <span className="text-xs text-muted-foreground">
          자동 저장됨
        </span>
      </footer>
    </div>
  )
}
