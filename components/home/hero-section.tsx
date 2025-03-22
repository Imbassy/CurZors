"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar } from "lucide-react"

export function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState("")
  const [travelers, setTravelers] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (searchQuery) params.append("search", searchQuery)
    if (date) params.append("date", date)
    if (travelers) params.append("travelers", travelers)

    router.push(`/listings?${params.toString()}`)
  }

  return (
    <section className="relative w-full h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/placeholder.svg?height=600&width=1920"
            alt="Red Sea coral reef with colorful fish"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md">
          Do more with Red Sea Quest
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
          Discover with 300+ marine experiences
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-lg p-2 flex flex-col md:flex-row max-w-4xl mx-auto shadow-lg"
        >
          <div className="flex-1 flex items-center px-3 py-2 md:border-r">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <Input
              type="text"
              placeholder="Where to? (city or activity)"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="px-3 py-2 md:w-[180px] border-t md:border-t-0 md:border-r">
            <Select value={date} onValueChange={setDate}>
              <SelectTrigger className="border-0 p-0 h-auto focus:ring-0">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                  <SelectValue placeholder="When?" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="custom">Custom Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="mt-2 md:mt-0 md:ml-2">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>

        {/* Popular searches */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="text-white/80 text-sm">Popular:</span>
          <Button
            variant="link"
            className="text-white text-sm p-0 h-auto"
            onClick={() => router.push("/listings?category=Diving")}
          >
            Diving
          </Button>
          <Button
            variant="link"
            className="text-white text-sm p-0 h-auto"
            onClick={() => router.push("/listings?category=Snorkeling")}
          >
            Snorkeling
          </Button>
          <Button
            variant="link"
            className="text-white text-sm p-0 h-auto"
            onClick={() => router.push("/listings?category=Boat+Tours")}
          >
            Boat Tours
          </Button>
          <Button
            variant="link"
            className="text-white text-sm p-0 h-auto"
            onClick={() => router.push("/destinations/hurghada")}
          >
            Hurghada
          </Button>
        </div>
      </div>
    </section>
  )
}

