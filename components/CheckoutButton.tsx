"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function CheckoutButton({ label = "Get Started" }: { label?: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    if (!session) {
      router.push("/login")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/checkout", { method: "POST" })
      const data = await res.json() as { url?: string; error?: string }
      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? "Loading…" : label}
    </button>
  )
}
