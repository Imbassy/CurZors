import { CalendarClock } from "lucide-react"

export function FlexibleBooking() {
  return (
    <section className="bg-primary/5 py-12">
      <div className="container px-4 md:px-6 text-center">
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Keep things flexible</h2>
          <div className="flex items-center justify-center mb-4">
            <CalendarClock className="h-8 w-8 text-primary mr-2" />
          </div>
          <p className="text-muted-foreground mb-4">
            Use Reserve Now & Pay Later to secure the activities you don't want to miss without being locked in.
          </p>
        </div>
      </div>
    </section>
  )
}

