"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { createBooking } from "@/lib/airtable"
import { useAuth } from "@/contexts/auth-context"
import { z } from "zod"

// Validation schema
const bookingSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  guests: z.string().min(1, "Please select number of guests"),
  paymentMethod: z.enum(["paypal", "cash"], {
    required_error: "Please select a payment method",
  }),
})

type BookingFormData = z.infer<typeof bookingSchema>

export function BookingForm({ listingId, price }: { listingId: string; price: number }) {
  const router = useRouter()
  const { user } = useAuth()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [guests, setGuests] = useState("1")
  const [paymentMethod, setPaymentMethod] = useState("paypal")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const totalPrice = price * Number.parseInt(guests || "1")

  const handleBooking = async () => {
    if (!date) {
      setError("Please select a date")
      return
    }

    // Validate form data
    try {
      bookingSchema.parse({
        date,
        guests,
        paymentMethod,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message)
        return
      }
    }

    setIsLoading(true)
    setError("")

    try {
      // Generate a unique booking ID
      const bookingId = `book_${Date.now()}`

      // Create the booking in Airtable
      await createBooking({
        bookingId,
        // Use the authenticated user's ID if available
        userId: user?.id,
        listingId,
        checkInDate: format(date, "yyyy-MM-dd"),
        checkOutDate: format(date, "yyyy-MM-dd"),
        numberOfGuests: Number.parseInt(guests),
        totalPrice,
        paymentStatus: paymentMethod === "cash" ? "Pending" : "Completed",
      })

      // If payment method is PayPal, redirect to a mock payment page
      if (paymentMethod === "paypal") {
        router.push(`/payment?bookingId=${bookingId}&amount=${totalPrice}`)
      } else {
        // For cash payments, redirect to confirmation page
        router.push(`/bookings/confirmation?bookingId=${bookingId}`)
      }
    } catch (error) {
      console.error("Error creating booking:", error)
      setError("There was an error creating your booking. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <label className="text-sm font-medium mb-1 block">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Number of guests</label>
        <Select value={guests} onValueChange={setGuests}>
          <SelectTrigger>
            <SelectValue placeholder="Select number of guests" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }).map((_, i) => (
              <SelectItem key={i} value={(i + 1).toString()}>
                {i + 1} {i === 0 ? "guest" : "guests"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Payment method</label>
        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paypal">PayPal (Pay now)</SelectItem>
            <SelectItem value="cash">Cash (Pay on arrival)</SelectItem>
          </SelectContent>
        </Select>
        {paymentMethod === "cash" && (
          <p className="text-xs text-amber-600 mt-1">
            Note: A 50% deposit may be required for some experiences to secure your spot.
          </p>
        )}
      </div>

      <div className="pt-4">
        <div className="flex justify-between mb-2">
          <span>Price per person</span>
          <span>${price}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Number of guests</span>
          <span>× {guests || 1}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      {!user ? (
        <div className="space-y-4">
          <Alert className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
            <AlertDescription>Please log in or create an account to book this experience.</AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      ) : (
        <Button className="w-full" size="lg" onClick={handleBooking} disabled={isLoading || !date}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {paymentMethod === "paypal" ? "Processing..." : "Reserving..."}
            </>
          ) : paymentMethod === "paypal" ? (
            "Book and Pay Now"
          ) : (
            "Reserve Now, Pay Later"
          )}
        </Button>
      )}
    </div>
  )
}

