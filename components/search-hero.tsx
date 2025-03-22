"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchHero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState("")

  return (
    <section className="relative w-full h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <img
            src="/placeholder.svg?height=500&width=1920"
            alt="Red Sea landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Do more with Red Sea Quest</h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Book unforgettable marine tours and experiences in the Red Sea region
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row max-w-3xl mx-auto shadow-lg">
          <div className="flex-1 flex items-center px-3 py-2 md:border-r">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <Input
              type="text"
              placeholder="Where to?"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="px-3 py-2 md:w-[180px]">
            <Select value={date} onValueChange={setDate}>
              <SelectTrigger className="border-0 p-0 h-auto focus:ring-0">
                <SelectValue placeholder="When?" />
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
          <Button className="mt-2 md:mt-0 md:ml-2">Search</Button>
        </div>
      </div>
    </section>
  )
}

