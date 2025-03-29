"use client"

import type React from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Twitter, AlertCircle, Bug } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/dashboard",
      })

      if (result?.error) {
        setError("登录失败，请检查您的凭据。")
      }
    } catch (error) {
      console.error("Login failed", error)
      setError("登录过程中发生错误。请稍后再试。")
    } finally {
      setIsLoading(false)
    }
  }

  const handleXLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await signIn("twitter", {
        redirect: true,
        callbackUrl: "/dashboard",
      })
    } catch (error) {
      console.error("X login failed", error)
      setError("X 登录失败。请稍后再试或使用其他登录方式。")
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>登录</CardTitle>
        <CardDescription>选择您喜欢的登录方式</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button variant="outline" className="w-full" onClick={handleXLogin} disabled={isLoading}>
          <Twitter className="mr-2 h-4 w-4" />
          使用 X 登录
        </Button>

        <div className="flex justify-between text-xs text-muted-foreground">
          <Link href="/twitter-login" className="hover:underline flex items-center">
            <Bug className="h-3 w-3 mr-1" />
            尝试替代 Twitter 登录
          </Link>

          <Link href="/debug-oauth" className="hover:underline flex items-center">
            <Bug className="h-3 w-3 mr-1" />
            调试 OAuth 连接
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">或使用邮箱登录</span>
          </div>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">密码</Label>
              <a href="#" className="text-xs text-primary hover:underline">
                忘记密码?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "登录中..." : "登录"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>测试账号: user@example.com / password</p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-xs text-muted-foreground">
          登录即表示您同意我们的{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            服务条款
          </a>{" "}
          和{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            隐私政策
          </a>
          。
        </p>
      </CardFooter>
    </Card>
  )
}

