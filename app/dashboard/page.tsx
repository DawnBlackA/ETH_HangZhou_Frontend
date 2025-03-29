import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Dashboard() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>You're now signed in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">User Information</h3>
              <p className="text-sm text-muted-foreground">Name: {session.user?.name}</p>
              <p className="text-sm text-muted-foreground">Email: {session.user?.email}</p>
            </div>

            <div className="pt-4">
              <Button asChild variant="outline">
                <a href="/api/auth/signout">Sign out</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

