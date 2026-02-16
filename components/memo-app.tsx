"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { useSession } from "next-auth/react"
import { MemoSidebar } from "@/components/memo-sidebar"
import { MemoList } from "@/components/memo-list"
import { MemoEditor } from "@/components/memo-editor"
import type { Memo } from "@/lib/memo-data"

const categoryLabels: Record<string, string> = {
  all: "모든 메모",
  favorites: "즐겨찾기",
  archive: "보관함",
  trash: "휴지통",
  work: "업무",
  personal: "개인",
  ideas: "아이디어",
  study: "공부",
}

export function MemoApp() {
  const { data: session } = useSession()
  const [memos, setMemos] = useState<Memo[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchMemos = useCallback(async () => {
    try {
      const res = await fetch("/api/memos")
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setMemos(data)
      setSelectedId((prev) => {
        if (prev && data.some((m: Memo) => m.id === prev)) return prev
        return data.length > 0 ? data[0].id : null
      })
    } catch (err) {
      console.error(err)
      setMemos([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (session?.user) {
      fetchMemos()
    } else {
      setLoading(false)
      setMemos([])
    }
  }, [session?.user, fetchMemos])

  const filteredMemos = useMemo(() => {
    let list: Memo[]
    switch (activeCategory) {
      case "all":
        list = memos.filter((m) => !m.archived && !m.trashed)
        break
      case "favorites":
        list = memos.filter((m) => m.favorite && !m.trashed)
        break
      case "archive":
        list = memos.filter((m) => m.archived)
        break
      case "trash":
        list = memos.filter((m) => m.trashed)
        break
      default:
        list = memos.filter(
          (m) => m.tagId === activeCategory && !m.trashed && !m.archived
        )
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.fullContent.toLowerCase().includes(q) ||
          (m.content && m.content.toLowerCase().includes(q))
      )
    }
    return list
  }, [memos, activeCategory, searchQuery])

  const selectedMemo = useMemo(
    () => memos.find((m) => m.id === selectedId) ?? null,
    [memos, selectedId]
  )

  const noteCounts = useMemo(() => {
    const active = memos.filter((m) => !m.archived && !m.trashed)
    return {
      all: active.length,
      favorites: memos.filter((m) => m.favorite && !m.trashed).length,
      archive: memos.filter((m) => m.archived).length,
      trash: memos.filter((m) => m.trashed).length,
    }
  }, [memos])

  const handleToggleFavorite = useCallback(async (id: string) => {
    const memo = memos.find((m) => m.id === id)
    if (!memo) return
    try {
      const res = await fetch(`/api/memos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: !memo.favorite }),
      })
      if (res.ok) {
        const updated = await res.json()
        setMemos((prev) =>
          prev.map((m) => (m.id === id ? updated : m))
        )
      }
    } catch (err) {
      console.error(err)
    }
  }, [memos])

  const handleNewMemo = useCallback(async () => {
    try {
      const res = await fetch("/api/memos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "새 메모",
          fullContent: "여기에 내용을 입력하세요...",
        }),
      })
      if (!res.ok) throw new Error("Failed to create")
      const newMemo = await res.json()
      setMemos((prev) => [newMemo, ...prev])
      setSelectedId(newMemo.id)
      setActiveCategory("all")
    } catch (err) {
      console.error(err)
    }
  }, [])

  const handleSave = useCallback(async (
    id: string,
    data: { title?: string; fullContent?: string }
  ) => {
    try {
      const res = await fetch(`/api/memos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const updated = await res.json()
        setMemos((prev) =>
          prev.map((m) => (m.id === id ? updated : m))
        )
      }
    } catch (err) {
      console.error(err)
    }
  }, [])

  const handleDelete = useCallback(async (id: string, permanent?: boolean) => {
    try {
      const res = await fetch(
        `/api/memos/${id}?permanent=${permanent ? "true" : "false"}`,
        { method: "DELETE" }
      )
      if (res.ok) {
        const data = await res.json()
        if (permanent && data.deleted) {
          setMemos((prev) => prev.filter((m) => m.id !== id))
        } else if (data.id) {
          setMemos((prev) =>
            prev.map((m) => (m.id === id ? data : m))
          )
        }
        setSelectedId((prev) => (prev === id ? null : prev))
      }
    } catch (err) {
      console.error(err)
    }
  }, [])

  const handleRestore = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/memos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trashed: false }),
      })
      if (res.ok) {
        const updated = await res.json()
        setMemos((prev) =>
          prev.map((m) => (m.id === id ? updated : m))
        )
        setSelectedId(id)
        setActiveCategory("all")
      }
    } catch (err) {
      console.error(err)
    }
  }, [])

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category)
    setSelectedId(null)
  }, [])

  useEffect(() => {
    if (selectedId === null && filteredMemos.length > 0) {
      setSelectedId(filteredMemos[0].id)
    }
  }, [activeCategory, filteredMemos, selectedId])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">메모 불러오는 중...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <MemoSidebar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onNewMemo={handleNewMemo}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        noteCounts={noteCounts}
        userName={session?.user?.name}
        userEmail={session?.user?.email}
      />
      <MemoList
        memos={filteredMemos}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onToggleFavorite={handleToggleFavorite}
        onDelete={(id, isTrashed) => handleDelete(id, isTrashed)}
        categoryLabel={categoryLabels[activeCategory] ?? "메모"}
      />
      <MemoEditor
        memo={selectedMemo}
        onToggleFavorite={handleToggleFavorite}
        onSave={handleSave}
        onDelete={handleDelete}
        onRestore={handleRestore}
      />
    </div>
  )
}
