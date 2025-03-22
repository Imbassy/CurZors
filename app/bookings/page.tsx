"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { getUserBookings } from "@/lib/airtable"
import { useAuth } from "@/contexts/auth-context"

export default function BookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchBookings() {
      if (!user) return

      try {
        const userBookings = await getUserBookings(user.id)
        setBookings(userBookings)
      } catch (error) {
        console.error("Error fetching bookings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [user])

  if (!user) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Please log in to view your bookings</h3>
          <p className="text-muted-foreground mb-6">You need to be logged in to access this page</p>
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage your upcoming and past experiences</p>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-[3/2] w-full" />
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : bookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="aspect-[3/2] relative">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Experience"
                        width={300}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-primary-foreground">{booking.fields["Payment Status"]}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {booking.fields.Listing?.[0] || "Marine Experience"}
                      </h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Date: {booking.fields["Check-in Date"]}</span>
                        </div>
                        {booking.fields["Start Time"] && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Time: {booking.fields["Start Time"]}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Guests: {booking.fields["Number of Guests"]}</span>
                        </div>
                        {booking.fields["Needs Pickup"] && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>Pickup: {booking.fields["Pickup Location"] || "Arranged"}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <span className="font-medium">${booking.fields["Total Price"]}</span>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No upcoming bookings</h3>
                <p className="text-muted-foreground mb-6">You don't have any upcoming bookings yet</p>
                <Button asChild>
                  <Link href="/listings">Browse Experiences</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No past bookings</h3>
              <p className="text-muted-foreground mb-6">You don't have any past bookings yet</p>
              <Button asChild>
                <Link href="/listings">Browse Experiences</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="cancelled">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No cancelled bookings</h3>
              <p className="text-muted-foreground mb-6">You don't have any cancelled bookings</p>
              <Button asChild>
                <Link href="/listings">Browse Experiences</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

