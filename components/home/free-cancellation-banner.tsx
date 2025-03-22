import { CalendarX, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FreeCancellationBanner() {
  return (
    <section className="py-12 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4 max-w-xl">
            <div className="rounded-full bg-primary/10 p-3 mt-1">
              <CalendarX className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Free Cancellation</h2>
              <p className="text-muted-foreground">
                Plans change, we understand. That's why we offer free cancellation on most of our experiences. Book with
                confidence knowing you can adjust your plans if needed.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Full refund up to 24 hours before most experiences</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Easy cancellation process through your account</span>
                </div>
              </div>
            </div>
          </div>
          <Button size="lg" asChild>
            <Link href="/listings?filter=free-cancellation">Find Free Cancellation Tours</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

