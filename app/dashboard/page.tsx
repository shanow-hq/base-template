// Server Component — no "use client"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })

  const isActive = subscription?.status === "active" || subscription?.status === "trialing"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-xl text-gray-900">SaaS Starter</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{session.user.email}</span>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {session.user.name ?? session.user.email}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Here&apos;s what&apos;s happening in your account.
          </p>
        </div>

        {/* Subscription status */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Subscription
          </h2>
          {isActive ? (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
              <span className="text-sm text-gray-600">
                Renews on{" "}
                {subscription!.currentPeriodEnd.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                No active plan
              </span>
              <a
                href="/"
                className="text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Upgrade →
              </a>
            </div>
          )}
        </section>

        {/* ── FEATURE_PLACEHOLDER ──
            Add your core product features here.
            Each card below is a placeholder for a real feature section.
            Remove or replace these as you build out your product.
        ─────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* FEATURE_PLACEHOLDER: Analytics */}
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center min-h-[160px]">
            <span className="text-3xl">📊</span>
            <p className="mt-3 font-medium text-gray-700">Analytics</p>
            <p className="mt-1 text-xs text-gray-400">Replace with your analytics UI</p>
          </div>

          {/* FEATURE_PLACEHOLDER: Settings */}
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center min-h-[160px]">
            <span className="text-3xl">⚙️</span>
            <p className="mt-3 font-medium text-gray-700">Settings</p>
            <p className="mt-1 text-xs text-gray-400">Replace with your settings UI</p>
          </div>

          {/* FEATURE_PLACEHOLDER: Team */}
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center min-h-[160px]">
            <span className="text-3xl">👥</span>
            <p className="mt-3 font-medium text-gray-700">Team</p>
            <p className="mt-1 text-xs text-gray-400">Replace with your team management UI</p>
          </div>

          {/* FEATURE_PLACEHOLDER: Integrations */}
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center min-h-[160px]">
            <span className="text-3xl">🔌</span>
            <p className="mt-3 font-medium text-gray-700">Integrations</p>
            <p className="mt-1 text-xs text-gray-400">Replace with your integrations UI</p>
          </div>
        </section>
        {/* ── END FEATURE_PLACEHOLDER ── */}
      </main>
    </div>
  )
}
