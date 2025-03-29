import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    // 设置较长的超时时间
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "NextAuth.js Twitter Debug Tool",
        },
      })

      clearTimeout(timeoutId)

      const data = await response.text()

      return NextResponse.json({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: data.substring(0, 1000) + (data.length > 1000 ? "..." : ""),
      })
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  } catch (error) {
    console.error("Debug Twitter API error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

