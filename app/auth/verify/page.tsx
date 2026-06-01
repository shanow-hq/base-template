"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function VerifyContent() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const token = params.get("token")
    if (!token) {
      router.push("/login")
      return
    }
    fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((data: { success: boolean }) => {
        if (data.success) router.push("/dashboard")
        else router.push("/login")
      })
      .catch(() => router.push("/login"))
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">로그인 처리 중...</p>
    </main>
  )
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  )
}
