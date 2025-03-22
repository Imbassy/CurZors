"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

interface PayPalPaymentProps {
  amount: number
  currency: string
  bookingId: string
  updateBookingPaymentStatus: (bookingId: string, status: string, transactionId: string) => Promise<void>
}

export function PayPalPayment({ amount, currency, bookingId, updateBookingPaymentStatus }: PayPalPaymentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadPayPalSDK = async () => {
      try {
        const script = document.createElement("script")
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`
        script.async = true
        script.onload = () => {
          // @ts-ignore
          if (!window.paypal) {
            setError("PayPal SDK failed to load. Please try again later.")
            setIsLoading(false)
            return
          }

          // @ts-ignore
          window.paypal
            .Buttons({
              // PayPal button configuration
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amount.toString(),
                        currency_code: "USD",
                      },
                      description: `Booking ID: ${bookingId}`,
                    },
                  ],
                })
              },
              onApprove: async (data, actions) => {
                try {
                  setIsLoading(true)
                  // Process the payment
                  const details = await actions.order.capture()

                  // Update booking status in your database
                  await updateBookingPaymentStatus(bookingId, "Completed", details.id)

                  // Redirect to confirmation page
                  router.push(`/bookings/confirmation?bookingId=${bookingId}`)
                } catch (error) {
                  console.error("Payment processing error:", error)
                  setError("There was an error processing your payment. Please try again.")
                  setIsLoading(false)
                }
              },
              onError: (err) => {
                console.error("PayPal error:", err)
                setError("There was an error with PayPal. Please try a different payment method.")
                setIsLoading(false)
              },
            })
            .render("#paypal-button-container")
            .catch((err) => {
              console.error("PayPal render error:", err)
              setError("Failed to load PayPal checkout. Please try again later.")
              setIsLoading(false)
            })
        }
        script.onerror = () => {
          setError("Failed to load PayPal SDK. Please try again later.")
          setIsLoading(false)
        }
        document.body.appendChild(script)
      } catch (error) {
        console.error("Error loading PayPal SDK:", error)
        setError("Failed to load PayPal SDK. Please try again later.")
        setIsLoading(false)
      }
    }

    loadPayPalSDK()

    return () => {
      const script = document.querySelector(
        `script[src*="paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}"]`,
      )
      if (script) {
        script.remove()
      }
    }
  }, [amount, bookingId, router, updateBookingPaymentStatus])

  return (
    <div className="w-full max-w-md mx-auto">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div id="paypal-button-container" className="min-h-[150px]"></div>

      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
          <span>Loading payment options...</span>
        </div>
      )}

      <div className="mt-4 text-center">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel and go back
        </Button>
      </div>
    </div>
  )
}

