"use client"

import { useEffect } from "react"

export default function LoginPage() {
  useEffect(() => {
    const currentUrl = window.location.origin
    window.location.href = `https://auth.shanow.com/login?redirect=${encodeURIComponent(currentUrl)}`
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">로그인 페이지로 이동 중...</p>
    </main>
  )
}
