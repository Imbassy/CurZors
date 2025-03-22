"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Booking {
  id: string
  fields: {
    "Booking ID": string
    User: string[]
    Listing: string[]
    "Booking Date": string
    "Check-in Date": string
    "Check-out Date": string
    "Number of Guests": number
    "Total Price": number
    "Payment Status": string
    "Start Time"?: string
    "Contact Name"?: string
    "Contact Email"?: string
    "Contact Phone"?: string
    "Special Requests"?: string
    "Needs Pickup"?: boolean
    "Pickup Location"?: string
    Reviews?: string[]
    Messages?: string[]
    Payments?: string[]
    "Promotion Applied"?: string[]
    "Duration of Stay"?: number
    "Booking Summary"?: string
    "Review Sentiment"?: string
    "User Email"?: string
    "Listing Title"?: string
  }
}

interface BookingConfirmationProps {
  booking: Booking
}

export function BookingConfirmation({ booking }: BookingConfirmationProps) {
  return (
    <div className="container max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Booking Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Your booking with ID <strong>{booking.fields["Booking ID"]}</strong> has been confirmed.
          </p>
          <p>
            Thank you for choosing Red Sea Quest! We've sent a confirmation email to {booking.fields["Contact Email"]}.
          </p>
          <p>Here are your booking details:</p>
          <ul>
            <li>Listing: {booking.fields["Listing Title"]}</li>
            <li>Check-in Date: {booking.fields["Check-in Date"]}</li>
            <li>Number of Guests: {booking.fields["Number of Guests"]}</li>
            <li>Total Price: ${booking.fields["Total Price"]}</li>
            <li>Payment Status: {booking.fields["Payment Status"]}</li>
          </ul>
          <Button asChild>
            <Link href="/bookings">View My Bookings</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

