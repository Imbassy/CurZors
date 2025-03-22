"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Users, Plus, Minus, Clock } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { Separator } from "@/components/ui/separator"

interface AvailabilityWidgetProps {
  listingId: string
  price: number
  title: string
}

export function AvailabilityWidget({ listingId, price, title }: AvailabilityWidgetProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [travelers, setTravelers] = useState({
    adults: 2,
    children: 0,
    infants: 0,
  })

  const handleIncrement = (type: "adults" | "children" | "infants") => {
    setTravelers((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }))
  }

  const handleDecrement = (type: "adults" | "children" | "infants") => {
    if (travelers[type] > 0) {
      setTravelers((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }))
    }

    // Ensure at least 1 adult
    if (type === "adults" && travelers.adults <= 1) {
      return
    }
  }

  const totalTravelers = travelers.adults + travelers.children + travelers.infants
  const totalPrice = price * (travelers.adults + travelers.children * 0.7)

  const handleCheckAvailability = () => {
    if (!date) return

    // Generate a unique booking ID
    const bookingId = `book_${uuidv4().substring(0, 8)}`

    // Navigate to checkout page with booking details
    router.push(
      `/checkout?listingId=${listingId}&date=${format(date, "yyyy-MM-dd")}&adults=${travelers.adults}&children=${travelers.children}&infants=${travelers.infants}&price=${totalPrice}&bookingId=${bookingId}&title=${encodeURIComponent(title)}`,
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-medium mb-1">Date</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "EEEE, MMMM d, yyyy") : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
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
        <div className="text-sm font-medium mb-1">Time</div>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          <Clock className="mr-2 h-4 w-4" />
          <span>9:00 AM</span>
        </Button>
      </div>

      <div>
        <div className="text-sm font-medium mb-1">Travelers</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <Users className="mr-2 h-4 w-4" />
              <span>
                {totalTravelers} {totalTravelers === 1 ? "traveler" : "travelers"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4 p-2">
              <h4 className="font-medium">Select Travelers</h4>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Adults</div>
                  <div className="text-sm text-muted-foreground">Ages 11+</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDecrement("adults")}
                    disabled={travelers.adults <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{travelers.adults}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleIncrement("adults")}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Children</div>
                  <div className="text-sm text-muted-foreground">Ages 6-10</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDecrement("children")}
                    disabled={travelers.children <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{travelers.children}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleIncrement("children")}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Infants</div>
                  <div className="text-sm text-muted-foreground">Ages 0-5</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDecrement("infants")}
                    disabled={travelers.infants <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{travelers.infants}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleIncrement("infants")}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {travelers.children > 0 && (
                <div className="text-xs text-muted-foreground">
                  Children ages 6-10 are charged at 70% of the adult rate.
                </div>
              )}

              {travelers.infants > 0 && (
                <div className="text-xs text-muted-foreground">Infants ages 0-5 are free of charge.</div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Adult price</span>
          <span>
            ${price.toFixed(2)} × {travelers.adults}
          </span>
        </div>

        {travelers.children > 0 && (
          <div className="flex justify-between text-sm">
            <span>Children price (70%)</span>
            <span>
              ${(price * 0.7).toFixed(2)} × {travelers.children}
            </span>
          </div>
        )}

        {travelers.infants > 0 && (
          <div className="flex justify-between text-sm">
            <span>Infants</span>
            <span>Free × {travelers.infants}</span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <Button className="w-full" onClick={handleCheckAvailability} disabled={!date}>
        Reserve Now
      </Button>
    </div>
  )
}

