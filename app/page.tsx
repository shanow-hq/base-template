import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { CheckoutButton } from "@/components/CheckoutButton"

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/dashboard")

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">%%SERVICE_TITLE%%</span>
          <Link href="/login" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            로그인 →
          </Link>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-32 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.25),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-4">
          <h1 className="text-6xl font-extrabold text-white tracking-tight leading-tight">
            %%SERVICE_TITLE%%
          </h1>
          <p className="mt-6 text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            %%SERVICE_DESCRIPTION%%
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <CheckoutButton label="무료로 시작하기" />
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              로그인
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">주요 기능</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            %%FEATURES_LIST%%
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">요금제</h2>
          <div className="max-w-sm mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-blue-500/30">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-10 text-white text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-100">Pro 플랜</p>
                <p className="mt-4 text-6xl font-extrabold">
                  $%%PRICE%%<span className="text-2xl font-normal text-blue-200">/월</span>
                </p>
                <p className="mt-2 text-sm text-blue-200">언제든 취소 가능</p>
              </div>
              <div className="bg-white px-8 py-8">
                <CheckoutButton label="지금 시작하기" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
