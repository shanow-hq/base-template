import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: { subscription: true },
  })

  const isPro = user?.subscription?.status === "active"

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">%%SERVICE_TITLE%%</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{session.user.email}</span>
            <Link
              href="/api/auth/signout"
              className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              로그아웃
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">%%SERVICE_TITLE%% 대시보드</h1>
          <p className="mt-2 text-gray-500">%%SERVICE_DESCRIPTION%%</p>
        </div>

        {!isPro && (
          <div className="mb-8 flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <span className="text-amber-500 text-lg">⚡</span>
            <p className="text-sm text-amber-800 flex-1">
              Pro 플랜으로 업그레이드하면 모든 기능을 사용할 수 있어요.{" "}
              <Link href="/" className="font-semibold underline underline-offset-2">업그레이드하기</Link>
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          %%DASHBOARD_CONTENT%%
        </div>
      </div>
    </main>
  )
}
