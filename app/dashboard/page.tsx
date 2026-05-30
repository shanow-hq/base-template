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
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">%%SERVICE_TITLE%%</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{session.user.email}</span>
            <Link
              href="/api/auth/signout"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              로그아웃
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
          <p className="mt-2 text-gray-500">%%SERVICE_DESCRIPTION%%</p>
        </div>

        {!isPro && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚡ Pro 플랜으로 업그레이드하면 모든 기능을 사용할 수 있어요.{" "}
              <Link href="/" className="font-semibold underline">
                업그레이드하기
              </Link>
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          %%DASHBOARD_CONTENT%%
        </div>
      </div>
    </main>
  )
}