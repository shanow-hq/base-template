import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { token } = await req.json() as { token: string }

  try {
    const payload = jwt.verify(token, process.env.AUTH_SHARED_SECRET!) as {
      userId: string
      email: string
      name: string
      image: string
    }

    await prisma.user.upsert({
      where: { email: payload.email },
      update: { name: payload.name, image: payload.image },
      create: { email: payload.email, name: payload.name, image: payload.image },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}
