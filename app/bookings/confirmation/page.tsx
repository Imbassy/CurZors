import { notFound } from "next/navigation"
import { getBookingById } from "@/lib/airtable"
import { BookingConfirmation } from "@/components/booking-confirmation"
import { logError } from "@/lib/error-handler"

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: { bookingId?: string }
}) {
  const bookingId = searchParams.bookingId

  if (!bookingId) {
    notFound()
  }

  try {
    const booking = await getBookingById(bookingId)

    if (!booking) {
      notFound()
    }

    return <BookingConfirmation booking={booking} />
  } catch (error) {
    logError({
      message: "Error fetching booking for confirmation",
      source: "booking",
      context: { bookingId },
      originalError: error,
    })

    // Redirect to error page
    notFound()
  }
}

