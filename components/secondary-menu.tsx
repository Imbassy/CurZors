"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function SecondaryMenu() {
  const pathname = usePathname()
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Make the menu sticky after scrolling down 100px
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    {
      name: "Discover",
      href: "/",
    },
    {
      name: "Places to See",
      href: "/destinations",
    },
    {
      name: "Things to Do",
      href: "/listings",
    },
  ]

  if (pathname.startsWith("/auth") || pathname.startsWith("/checkout")) {
    return null
  }

  return (
    <div
      className={cn(
        "w-full bg-background border-b z-40 transition-all duration-200",
        isSticky ? "fixed top-0 shadow-sm" : "relative",
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-center md:justify-start h-12">
          <nav className="flex items-center space-x-1 md:space-x-4">
            {menuItems.map((item) => {
              const isActive =
                (item.href === "/" && pathname === "/") || (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

