import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Calendar, CreditCard, Package, Map, Settings, PlusCircle, ArrowUpRight } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-background">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Admin Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 px-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground"
          >
            <Calendar className="h-5 w-5" />
            <span>Bookings</span>
          </Link>
          <Link
            href="/admin/listings"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground"
          >
            <Package className="h-5 w-5" />
            <span>Listings</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground"
          >
            <Users className="h-5 w-5" />
            <span>Users</span>
          </Link>
          <Link
            href="/admin/payments"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground"
          >
            <CreditCard className="h-5 w-5" />
            <span>Payments</span>
          </Link>
          <Link
            href="/admin/destinations"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground"
          >
            <Map className="h-5 w-5" />
            <span>Destinations</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="md:hidden mr-4">
              <Button variant="outline" size="icon">
                <Package className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Admin</p>
            </div>

            {/* Stats overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                      <p className="text-3xl font-bold">128</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-3">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-green-500 font-medium">12%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-3xl font-bold">$12,456</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-3">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-green-500 font-medium">8%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                      <p className="text-3xl font-bold">45</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-3">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-green-500 font-medium">5%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-3xl font-bold">256</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-green-500 font-medium">15%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest booking activity across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium">JD</span>
                          </div>
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-muted-foreground">Diving Experience</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$129</p>
                          <Badge variant={i % 3 === 0 ? "outline" : "default"}>
                            {i % 3 === 0 ? "Pending" : "Completed"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular listings */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Listings</CardTitle>
                  <CardDescription>Most booked experiences this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium">{i + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">
                              {
                                [
                                  "Diving Adventure",
                                  "Snorkeling Tour",
                                  "Boat Trip",
                                  "Fishing Experience",
                                  "Sunset Cruise",
                                ][i]
                              }
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {["Hurghada", "Sharm El Sheikh", "Dahab", "Marsa Alam", "El Gouna"][i]}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{[24, 18, 15, 12, 10][i]} bookings</p>
                          <p className="text-sm text-muted-foreground">${[2450, 1890, 1500, 1200, 950][i]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

