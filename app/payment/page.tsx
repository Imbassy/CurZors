"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PayPalPayment } from "@/components/paypal-payment"
import { Separator } from "@/components/ui/separator"
import { Lock } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId") || ""
  const amount = Number.parseFloat(searchParams.get("amount") || "0")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const handlePaymentSuccess = (paymentId: string) => {
    setIsProcessing(true)

    // In a real app, you would update the booking status in your database
    console.log(`Payment successful for booking ${bookingId}. Payment ID: ${paymentId}`)

    // Redirect to confirmation page
    setTimeout(() => {
      router.push(`/bookings/confirmation?bookingId=${bookingId}`)
    }, 1500)
  }

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage)
    setIsProcessing(false)
  }

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle>Complete your payment</CardTitle>
          <CardDescription>Secure payment for booking #{bookingId}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isProcessing && (
            <Alert className="mb-6 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
              <AlertDescription>Processing your payment. Please wait...</AlertDescription>
            </Alert>
          )}

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Total amount:</span>
              <span className="font-bold">${amount.toFixed(2)}</span>
            </div>
            <Separator />
          </div>

          <PayPalPayment amount={amount} currency="USD" onSuccess={handlePaymentSuccess} onError={handlePaymentError} />

          <div className="mt-6 flex items-center">
            <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Your payment information is secure with 256-bit SSL encryption
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

