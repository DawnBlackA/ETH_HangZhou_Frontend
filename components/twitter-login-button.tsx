"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Twitter } from "lucide-react"

export default function TwitterLoginButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)

    try {
      // 使用不同的参数尝试 Twitter 登录
      await signIn("twitter", {
        callbackUrl: "/dashboard",
        redirect: true,
      })
    } catch (error) {
      console.error("Twitter login failed:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={handleLogin}
      disabled={isLoading}
    >
      <Twitter className="h-4 w-4" />
      <span>{isLoading ? "正在连接..." : "使用 Twitter 登录"}</span>
    </Button>
  )
}

