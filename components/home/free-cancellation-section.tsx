import { CalendarX } from "lucide-react"

export function FreeCancellationSection() {
  return (
    <section className="py-12 bg-teal-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Free cancellation</h2>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-teal-100 p-3">
              <CalendarX className="h-8 w-8 text-teal-600" />
            </div>
          </div>
          <p className="text-muted-foreground">
            You'll receive a full refund if you cancel at least 24 hours in advance of most experiences.
          </p>
        </div>
      </div>
    </section>
  )
}

