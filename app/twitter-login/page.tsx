import TwitterLoginButton from "@/components/twitter-login-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function TwitterLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Twitter 登录测试</h1>
          <p className="mt-2 text-sm text-gray-600">这是一个简化的页面，专门用于测试 Twitter 登录功能</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Twitter 登录</CardTitle>
            <CardDescription>点击下方按钮使用 Twitter 账号登录</CardDescription>
          </CardHeader>
          <CardContent>
            <TwitterLoginButton />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/login" className="text-sm text-primary hover:underline">
              返回主登录页面
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

