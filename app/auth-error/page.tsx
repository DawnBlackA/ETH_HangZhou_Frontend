"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [errorType, setErrorType] = useState<string | null>(null)

  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam) {
      setErrorType(errorParam)

      // 解析不同类型的错误
      switch (errorParam) {
        case "OAuthCallbackError":
          setError("Twitter 认证请求超时。这可能是由于网络问题或 Twitter API 暂时不可用。")
          break
        case "AccessDenied":
          setError("您拒绝了授权请求。")
          break
        case "Configuration":
          setError("认证配置错误。请联系网站管理员。")
          break
        default:
          setError("登录过程中发生错误。请稍后再试。")
      }
    }
  }, [searchParams])

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>认证错误</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>错误类型: {errorType}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h3 className="font-medium">可能的解决方案:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>检查您的网络连接是否稳定</li>
              <li>确认 Twitter 服务是否正常运行</li>
              <li>尝试使用电子邮件登录方式</li>
              <li>清除浏览器缓存和 Cookie 后重试</li>
              <li>如果问题持续存在，请联系网站管理员</li>
            </ul>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" asChild>
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回登录页面
              </Link>
            </Button>

            <Button onClick={() => window.location.reload()}>重试</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

