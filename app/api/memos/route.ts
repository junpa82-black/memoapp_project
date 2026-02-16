import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

function getContentPreview(fullContent: string, maxLength = 120) {
  const cleaned = fullContent.trim()
  if (cleaned.length <= maxLength) return cleaned
  return cleaned.slice(0, maxLength) + "..."
}

function toMemoResponse(m: { id: string; title: string; content: string; fullContent: string; date: string; favorite: boolean; archived: boolean; trashed: boolean; tag: string | null; tagColor: string | null; tagId: string | null }) {
  return {
    id: m.id,
    title: m.title,
    content: getContentPreview(m.fullContent),
    fullContent: m.fullContent,
    date: m.date,
    favorite: m.favorite,
    archived: m.archived,
    trashed: m.trashed,
    tag: m.tag ?? undefined,
    tagColor: m.tagColor ?? undefined,
    tagId: m.tagId ?? undefined,
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")?.trim() ?? ""
    const trashed = searchParams.get("trashed") === "true"

    const memos = await prisma.memo.findMany({
      where: {
        userId: session.user.id,
        ...(trashed ? { trashed: true } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search } },
                { fullContent: { contains: search } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(
      memos.map(toMemoResponse)
    )
  } catch (error) {
    console.error("Memos GET error:", error)
    return NextResponse.json(
      { error: "메모 목록을 불러오는데 실패했습니다." },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 })
    }

    const body = await request.json()
    const title = (body.title ?? "새 메모").toString().trim() || "새 메모"
    const fullContent = (body.fullContent ?? "여기에 내용을 입력하세요...").toString()
    const date = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const memo = await prisma.memo.create({
      data: {
        userId: session.user.id,
        title,
        content: getContentPreview(fullContent),
        fullContent,
        date,
      },
    })

    return NextResponse.json(toMemoResponse(memo))
  } catch (error) {
    console.error("Memos POST error:", error)
    return NextResponse.json(
      { error: "메모 저장에 실패했습니다." },
      { status: 500 }
    )
  }
}
