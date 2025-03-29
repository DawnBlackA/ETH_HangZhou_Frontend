"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DebugOAuthPage() {
  const [result, setResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [url, setUrl] = useState("https://api.twitter.com/2/users/me")

  const testConnection = async () => {
    setIsLoading(true)
    setResult("测试中...")

    try {
      const response = await fetch("/api/debug-twitter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`错误: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>OAuth 连接调试工具</CardTitle>
          <CardDescription>测试与 Twitter API 的连接</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">API URL</Label>
            <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="输入要测试的 API URL" />
          </div>

          <Button onClick={testConnection} disabled={isLoading}>
            {isLoading ? "测试中..." : "测试连接"}
          </Button>

          {result && (
            <div className="mt-4">
              <Label>结果:</Label>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto mt-2 text-sm">{result}</pre>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            此工具帮助诊断 OAuth 连接问题。它会尝试直接连接到指定的 API 端点。
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

