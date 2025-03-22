import { CalendarClock } from "lucide-react"

export function FlexibleBookingBanner() {
  return (
    <section className="py-12 bg-teal-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Keep things flexible</h2>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-teal-100 p-3">
              <CalendarClock className="h-8 w-8 text-teal-600" />
            </div>
          </div>
          <p className="text-muted-foreground mb-2">
            Use Reserve Now & Pay Later to secure the activities you don't want to miss without being locked in.
          </p>
        </div>
      </div>
    </section>
  )
}

