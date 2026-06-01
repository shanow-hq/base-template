import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { encode } from "next-auth/jwt"

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { token } = await req.json() as { token: string }

  try {
    const payload = jwt.verify(token, process.env.AUTH_SHARED_SECRET!) as {
      userId: string
      email: string
      name: string
      image: string
    }

    const user = await prisma.user.upsert({
      where: { email: payload.email },
      update: { name: payload.name, image: payload.image },
      create: { email: payload.email, name: payload.name, image: payload.image },
    })

    const sessionToken = await encode({
      token: {
        sub: user.id,
        email: user.email,
        name: user.name,
        picture: user.image,
      },
      secret: process.env.NEXTAUTH_SECRET!,
    })

    const cookieStore = cookies()
    cookieStore.set("next-auth.session-token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ success: false }, { status: 401 })
  }
}
