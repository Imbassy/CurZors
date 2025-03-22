"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Destination } from "@/lib/airtable"

interface FeaturedDestinationsCarouselProps {
  destinations?: Destination[]
}

export function FeaturedDestinationsCarousel({ destinations = [] }: FeaturedDestinationsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Fallback destinations if none are provided
  const fallbackDestinations = [
    {
      id: "1",
      fields: {
        "Destination Name": "Hurghada",
        Country: "Egypt",
        City: "Hurghada",
        Description: "A beautiful beach resort town stretching 40km along Egypt's Red Sea coast.",
        "Number of Listings": 24,
        Photo: [{ url: "/placeholder.svg?height=500&width=800", filename: "hurghada", id: "1" }],
        Featured: true,
      },
    },
    {
      id: "2",
      fields: {
        "Destination Name": "Sharm El Sheikh",
        Country: "Egypt",
        City: "Sharm El Sheikh",
        Description: "A resort town between the desert of the Sinai Peninsula and the Red Sea.",
        "Number of Listings": 18,
        Photo: [{ url: "/placeholder.svg?height=500&width=800", filename: "sharm", id: "2" }],
        Featured: true,
      },
    },
    {
      id: "3",
      fields: {
        "Destination Name": "Dahab",
        Country: "Egypt",
        City: "Dahab",
        Description: "Once a Bedouin fishing village, now one of the Red Sea's most treasured diving destinations.",
        "Number of Listings": 12,
        Photo: [{ url: "/placeholder.svg?height=500&width=800", filename: "dahab", id: "3" }],
        Featured: true,
      },
    },
    {
      id: "4",
      fields: {
        "Destination Name": "Marsa Alam",
        Country: "Egypt",
        City: "Marsa Alam",
        Description: "A town on the west coast of the Red Sea, known for its pristine beaches and coral reefs.",
        "Number of Listings": 10,
        Photo: [{ url: "/placeholder.svg?height=500&width=800", filename: "marsa", id: "4" }],
        Featured: true,
      },
    },
  ]

  const displayDestinations = destinations && destinations.length > 0 ? destinations : fallbackDestinations

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayDestinations.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + displayDestinations.length) % displayDestinations.length)
  }

  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [displayDestinations.length])

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {displayDestinations.map((destination, index) => (
            <div key={destination.id} className="w-full flex-shrink-0 relative">
              {destination.fields.Photo && destination.fields.Photo.length > 0 ? (
                <Image
                  src={destination.fields.Photo[0].url || "/placeholder.svg"}
                  alt={destination.fields["Destination Name"]}
                  fill
                  className="object-cover rounded-xl"
                  priority={index === 0}
                />
              ) : (
                <Image
                  src="/placeholder.svg?height=500&width=1200"
                  alt="Placeholder"
                  fill
                  className="object-cover rounded-xl"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {destination.fields["Destination Name"]}
                </h3>
                <p className="text-white/90 mb-4 max-w-2xl line-clamp-2 md:line-clamp-3">
                  {destination.fields.Description || "Explore this amazing destination"}
                </p>
                <Link
                  href={`/destinations/${encodeURIComponent(destination.fields["Destination Name"] || "")}`}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-auto self-start"
                >
                  Explore {destination.fields["Destination Name"]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full"
        onClick={prevSlide}
        aria-label="Previous destination"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full"
        onClick={nextSlide}
        aria-label="Next destination"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {displayDestinations.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-4" : "bg-white/50"}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

