"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthDebugPage() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam) {
      setError(decodeURIComponent(errorParam))
    }
  }, [searchParams])

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>认证调试</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <h3 className="font-bold">错误信息:</h3>
              <p>{error}</p>
            </div>
          ) : (
            <p>没有检测到错误。</p>
          )}

          <div className="mt-4">
            <h3 className="font-bold">常见解决方案:</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>确保 Twitter 开发者门户中的回调 URL 设置正确</li>
              <li>检查 TWITTER_CLIENT_ID 和 TWITTER_CLIENT_SECRET 是否正确</li>
              <li>确保 Twitter 应用已启用 OAuth 2.0</li>
              <li>如果应用处于开发模式，确保你的 Twitter 账号已被添加为测试用户</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

