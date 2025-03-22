import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User } from "lucide-react"

export function LoginCta() {
  return (
    <section className="py-8 bg-gray-100 border-t">
      <div className="container px-4 md:px-6">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">Log in to manage bookings & Red Sea Rewards</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
          <Button size="lg" className="w-full" asChild>
            <Link href="/auth/login">
              <User className="h-4 w-4 mr-2" />
              Log In
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

