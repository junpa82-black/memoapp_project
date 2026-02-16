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

async function getMemoAndCheckAuth(id: string, userId: string) {
  const memo = await prisma.memo.findUnique({
    where: { id },
  })
  if (!memo) return null
  if (memo.userId !== userId) return null
  return memo
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 })
    }

    const { id } = await params
    const memo = await getMemoAndCheckAuth(id, session.user.id)
    if (!memo) {
      return NextResponse.json({ error: "메모를 찾을 수 없습니다." }, { status: 404 })
    }

    return NextResponse.json(toMemoResponse(memo))
  } catch (error) {
    console.error("Memo GET error:", error)
    return NextResponse.json(
      { error: "메모를 불러오는데 실패했습니다." },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 })
    }

    const { id } = await params
    const memo = await getMemoAndCheckAuth(id, session.user.id)
    if (!memo) {
      return NextResponse.json({ error: "메모를 찾을 수 없습니다." }, { status: 404 })
    }

    const body = await request.json()
    const title = body.title !== undefined ? String(body.title).trim() || "제목 없음" : undefined
    const fullContent = body.fullContent !== undefined ? String(body.fullContent) : undefined
    const favorite = body.favorite
    const archived = body.archived
    const trashed = body.trashed
    const tag = body.tag
    const tagColor = body.tagColor
    const tagId = body.tagId

    const date = fullContent !== undefined || title !== undefined
      ? new Date().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : undefined

    const updated = await prisma.memo.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(fullContent !== undefined && {
          fullContent,
          content: getContentPreview(fullContent),
        }),
        ...(date !== undefined && { date }),
        ...(typeof favorite === "boolean" && { favorite }),
        ...(typeof archived === "boolean" && { archived }),
        ...(typeof trashed === "boolean" && { trashed }),
        ...(tag !== undefined && { tag: tag ?? null }),
        ...(tagColor !== undefined && { tagColor: tagColor ?? null }),
        ...(tagId !== undefined && { tagId: tagId ?? null }),
      },
    })

    return NextResponse.json(toMemoResponse(updated))
  } catch (error) {
    console.error("Memo PATCH error:", error)
    return NextResponse.json(
      { error: "메모 수정에 실패했습니다." },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 })
    }

    const { id } = await params
    const memo = await getMemoAndCheckAuth(id, session.user.id)
    if (!memo) {
      return NextResponse.json({ error: "메모를 찾을 수 없습니다." }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const permanent = searchParams.get("permanent") === "true"

    if (permanent) {
      await prisma.memo.delete({
        where: { id },
      })
      return NextResponse.json({ message: "메모가 영구 삭제되었습니다.", deleted: true })
    }

    const updated = await prisma.memo.update({
      where: { id },
      data: { trashed: true },
    })
    return NextResponse.json({ ...toMemoResponse(updated), message: "메모가 휴지통으로 이동되었습니다." })
  } catch (error) {
    console.error("Memo DELETE error:", error)
    return NextResponse.json(
      { error: "메모 삭제에 실패했습니다." },
      { status: 500 }
    )
  }
}
