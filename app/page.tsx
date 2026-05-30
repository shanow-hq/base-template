// Server Component — no "use client"
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
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">SaaS Starter</span>
          <Link
            href="/login"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Sign in →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Ship your SaaS{" "}
          <span className="text-brand-600">in days, not months</span>
        </h1>
        <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
          Production-ready Next.js 14 template with auth, payments, and
          database — pre-wired and ready to customize.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <CheckoutButton label="Start Free Trial" />
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Everything you need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Simple pricing
          </h2>
          <div className="max-w-sm mx-auto bg-white rounded-2xl border border-brand-500 shadow-lg overflow-hidden">
            <div className="bg-brand-600 px-6 py-4 text-white text-center">
              <p className="text-sm font-medium uppercase tracking-wide">Pro</p>
              <p className="mt-1 text-4xl font-extrabold">
                $29
                <span className="text-lg font-normal">/mo</span>
              </p>
            </div>
            <div className="px-6 py-8 space-y-4">
              {PRICING_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="text-brand-600">✓</span>
                  {f}
                </div>
              ))}
              <div className="pt-4">
                <CheckoutButton label="Get started" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const FEATURES = [
  {
    icon: "🔐",
    title: "Auth out of the box",
    description: "Google OAuth via NextAuth v4. Session stored in PostgreSQL.",
  },
  {
    icon: "💳",
    title: "Stripe subscriptions",
    description: "Checkout, webhooks, and subscription state synced to your DB.",
  },
  {
    icon: "🗄️",
    title: "Prisma + PostgreSQL",
    description: "Type-safe ORM with migrations and a ready-made schema.",
  },
]

const PRICING_FEATURES = [
  "Unlimited projects",
  "Priority support",
  "Advanced analytics",
  "Custom integrations",
  "Team collaboration",
]
