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
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">%%SERVICE_TITLE%%</span>
          <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            로그인 →
          </Link>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          %%SERVICE_TITLE%%
        </h1>
        <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
          %%SERVICE_DESCRIPTION%%
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <CheckoutButton label="시작하기" />
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            로그인
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">주요 기능</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            %%FEATURES_LIST%%
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">요금제</h2>
          <div className="max-w-sm mx-auto bg-white rounded-2xl border border-blue-500 shadow-lg overflow-hidden">
            <div className="bg-blue-600 px-6 py-4 text-white text-center">
              <p className="text-sm font-medium uppercase tracking-wide">Pro</p>
              <p className="mt-1 text-4xl font-extrabold">
                $%%PRICE%%<span className="text-lg font-normal">/월</span>
              </p>
            </div>
            <div className="px-6 py-8">
              <CheckoutButton label="시작하기" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}