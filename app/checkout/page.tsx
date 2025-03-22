"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { createBooking } from "@/lib/airtable"
import { useAuth } from "@/contexts/auth-context"
import { Calendar, Clock, Users, MapPin } from "lucide-react"

// Update the CheckoutPage component to handle the new schema
export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  // Get booking details from URL params
  const listingId = searchParams.get("listingId") || ""
  const date = searchParams.get("date") || ""
  const adults = Number.parseInt(searchParams.get("adults") || "1")
  const children = Number.parseInt(searchParams.get("children") || "0")
  const infants = Number.parseInt(searchParams.get("infants") || "0")
  const price = Number.parseFloat(searchParams.get("price") || "0")
  const bookingId = searchParams.get("bookingId") || ""
  const title = searchParams.get("title") || ""

  const totalTravelers = adults + children + infants

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
    needsPickup: false,
    pickupLocation: "",
    paymentMethod: "paypal", // Add this line for payment method
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, needsPickup: checked }))
  }

  // Add a handler for select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Update the handleSubmit function to handle different payment methods
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Create booking in Airtable
      await createBooking({
        bookingId,
        userId: user?.id,
        listingId,
        checkInDate: date,
        checkOutDate: date, // For single-day experiences
        numberOfGuests: totalTravelers,
        totalPrice: price,
        paymentStatus: formData.paymentMethod === "cash" ? "Pending" : "Completed", // Set status based on payment method
        contactName: formData.name,
        contactEmail: formData.email,
        contactPhone: formData.phone,
        specialRequests: formData.specialRequests,
        needsPickup: formData.needsPickup,
        pickupLocation: formData.needsPickup ? formData.pickupLocation : "",
      })

      // Redirect based on payment method
      if (formData.paymentMethod === "paypal") {
        router.push(`/payment?bookingId=${bookingId}&amount=${price}`)
      } else {
        // For cash payments, redirect to confirmation page
        router.push(`/bookings/confirmation?bookingId=${bookingId}`)
      }
    } catch (err) {
      console.error("Error creating booking:", err)
      setError("There was an error processing your booking. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8 md:py-12">
      <div className="mb-6">
        <Link href={`/listings/${listingId}`} className="text-sm text-primary hover:underline">
          &larr; Back to experience
        </Link>
        <h1 className="text-2xl font-bold mt-2">Complete Your Booking</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Please provide your contact details for this booking</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">{error}</div>}

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`border rounded-lg p-4 cursor-pointer ${
                        formData.paymentMethod === "paypal" ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => handleSelectChange("paymentMethod", "paypal")}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full border flex items-center justify-center">
                          {formData.paymentMethod === "paypal" && (
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <span className="font-medium">Pay with PayPal</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Pay now and secure your booking immediately.</p>
                    </div>

                    <div
                      className={`border rounded-lg p-4 cursor-pointer ${
                        formData.paymentMethod === "cash" ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => handleSelectChange("paymentMethod", "cash")}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full border flex items-center justify-center">
                          {formData.paymentMethod === "cash" && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                        </div>
                        <span className="font-medium">Pay Later</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Reserve now and pay in cash upon arrival. A 50% deposit may be required for some experiences.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="needsPickup" checked={formData.needsPickup} onCheckedChange={handleCheckboxChange} />
                    <Label htmlFor="needsPickup">I need hotel pickup</Label>
                  </div>

                  {formData.needsPickup && (
                    <div className="space-y-2 pl-6">
                      <Label htmlFor="pickupLocation">Hotel/Pickup Location</Label>
                      <Input
                        id="pickupLocation"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        required={formData.needsPickup}
                        placeholder="Hotel name and address"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Processing..."
                    : formData.paymentMethod === "paypal"
                      ? "Pay Now & Complete Booking"
                      : "Reserve Now, Pay Later"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <div className="text-sm text-muted-foreground">Booking ID: {bookingId}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{date}</span>
                </div>

                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>09:00 AM (Default time)</span>
                </div>

                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {adults} {adults === 1 ? "Adult" : "Adults"}
                    {children > 0 && `, ${children} ${children === 1 ? "Child" : "Children"}`}
                    {infants > 0 && `, ${infants} ${infants === 1 ? "Infant" : "Infants"}`}
                  </span>
                </div>

                {formData.needsPickup && formData.pickupLocation && (
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                    <span>Pickup from: {formData.pickupLocation}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span>Price per adult</span>
                  <span>${(price / (adults + children * 0.7)).toFixed(2)}</span>
                </div>

                {adults > 0 && (
                  <div className="flex justify-between mb-2">
                    <span>Adults (x{adults})</span>
                    <span>${((price / (adults + children * 0.7)) * adults).toFixed(2)}</span>
                  </div>
                )}

                {children > 0 && (
                  <div className="flex justify-between mb-2">
                    <span>Children (x{children})</span>
                    <span>${((price / (adults + children * 0.7)) * children * 0.7).toFixed(2)}</span>
                  </div>
                )}

                {infants > 0 && (
                  <div className="flex justify-between mb-2">
                    <span>Infants (x{infants})</span>
                    <span>Free</span>
                  </div>
                )}

                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>${price.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

