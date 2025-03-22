"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronRight, Search, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

type MenuSection = {
  title: string
  items: {
    name: string
    href: string
    icon?: string
    description?: string
  }[]
}

type MenuCategory = {
  name: string
  sections: MenuSection[]
}

// Define the actual site structure here
const menuData: MenuCategory[] = [
  {
    name: "Places to see",
    sections: [
      {
        title: "Popular Destinations",
        items: [
          {
            name: "Hurghada",
            href: "/destinations/hurghada",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Sharm El Sheikh",
            href: "/destinations/sharm-el-sheikh",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Dahab",
            href: "/destinations/dahab",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Marsa Alam",
            href: "/destinations/marsa-alam",
            icon: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        title: "Islands & Reefs",
        items: [
          {
            name: "Giftun Islands",
            href: "/destinations/giftun-islands",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Tiran Island",
            href: "/destinations/tiran-island",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Ras Mohammed",
            href: "/destinations/ras-mohammed",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Abu Galawa",
            href: "/destinations/abu-galawa",
            icon: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
    ],
  },
  {
    name: "Things to do",
    sections: [
      {
        title: "Top experiences",
        items: [
          {
            name: "Diving",
            href: "/activities/diving",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Snorkeling",
            href: "/activities/snorkeling",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Dolphin & whale watching",
            href: "/activities/dolphin-watching",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Submarine tours",
            href: "/activities/submarine-tours",
            icon: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        title: "Water Activities",
        items: [
          {
            name: "Swim with dolphins",
            href: "/activities/swim-with-dolphins",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Glass bottom boats",
            href: "/activities/glass-bottom-boats",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Parasailing",
            href: "/activities/parasailing",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Water parks",
            href: "/activities/water-parks",
            icon: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
      {
        title: "Land Activities",
        items: [
          {
            name: "Quad & ATV tours",
            href: "/activities/quad-atv-tours",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Camel riding tours",
            href: "/activities/camel-riding",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Horse riding",
            href: "/activities/horse-riding",
            icon: "/placeholder.svg?height=40&width=40",
          },
          {
            name: "Desert safaris",
            href: "/activities/desert-safaris",
            icon: "/placeholder.svg?height=40&width=40",
          },
        ],
      },
    ],
  },
]

const filterCategories = [
  { name: "Top experiences", href: "/experiences" },
  { name: "Interests", href: "/interests" },
  { name: "Traveler type", href: "/traveler-types" },
  { name: "Outside Red Sea", href: "/outside-red-sea" },
]

export function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  // Debounce timer for smoother hover interactions
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle mouse enter on category
  const handleCategoryMouseEnter = useCallback((category: string) => {
    // Clear any existing timeout to prevent flickering
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setActiveCategory(category)
  }, [])

  // Handle mouse leave from menu
  const handleMenuMouseLeave = useCallback(() => {
    // Add a small delay before closing to prevent accidental closures
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null)
      setIsDatePickerOpen(false)
    }, 100)
  }, [])

  // Handle search submission
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Searching for:", searchQuery)
    },
    [searchQuery],
  )

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full bg-background border-b" ref={menuRef} onMouseLeave={handleMenuMouseLeave}>
      {/* Top bar with search and user actions */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl font-bold">Red Sea Quest</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-xl w-full">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Find places and things to do"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <button
                type="button"
                className="flex items-center px-4 py-2 border border-l-0 border-gray-300 bg-background hover:bg-gray-50"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              >
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span>Anytime</span>
                <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
              </button>

              {isDatePickerOpen && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white shadow-lg rounded-md z-50 p-4">
                  <div className="space-y-2">
                    <div className="font-medium">Select dates</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm text-gray-500">From</label>
                        <input type="date" className="w-full border rounded p-1" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">To</label>
                        <input type="date" className="w-full border rounded p-1" />
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-2">
                      Apply
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="rounded-l-none">
              Search
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-4">
          {/* Become a Supplier CTA */}
          <Link
            href="/become-supplier"
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Become a Supplier
          </Link>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 flex items-center">
        {menuData.map((category) => (
          <div key={category.name} className="relative" onMouseEnter={() => handleCategoryMouseEnter(category.name)}>
            <button
              className={cn(
                "flex items-center py-3 px-4 hover:text-primary transition-colors",
                activeCategory === category.name && "text-primary border-b-2 border-primary",
              )}
            >
              {category.name}
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>

            {activeCategory === category.name && (
              <div
                className="absolute left-0 right-0 top-full bg-white shadow-lg z-50 w-screen border-t"
                onMouseEnter={() => {
                  // Clear any pending close timeout when entering dropdown
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                }}
              >
                <div className="container mx-auto px-4 py-6">
                  <div className="flex">
                    {/* Left sidebar with filter categories */}
                    <div className="w-1/5 pr-6 border-r">
                      <ul className="space-y-4">
                        {filterCategories.map((filter) => (
                          <li key={filter.name}>
                            <Link href={filter.href} className="text-gray-600 hover:text-primary font-medium">
                              {filter.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Main content area */}
                    <div className="w-4/5 pl-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {category.sections.map((section) => (
                          <div key={section.title} className="space-y-4">
                            <h3 className="font-medium text-lg">{section.title}</h3>
                            <ul className="space-y-3">
                              {section.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="flex items-center gap-3 hover:text-primary transition-colors"
                                  >
                                    {item.icon && (
                                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                          src={item.icon || "/placeholder.svg"}
                                          alt={item.name}
                                          width={40}
                                          height={40}
                                          className="object-cover"
                                        />
                                      </div>
                                    )}
                                    <span>{item.name}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <Link
                              href={`/category/${section.title.toLowerCase().replace(/\s+/g, "-")}`}
                              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Explore more {section.title.toLowerCase()}
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Blog link */}
        <Link href="/blog" className="py-3 px-4 hover:text-primary transition-colors">
          Blog
        </Link>
      </nav>

      {/* Mobile search (only visible on mobile) */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Find places and things to do"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="rounded-l-none">
            Search
          </Button>
        </form>
      </div>
    </div>
  )
}

