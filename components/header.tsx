"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Menu, X, User, LogOut, LogIn, UserPlus } from "lucide-react"
import { MegaMenu } from "@/components/mega-menu/mega-menu"
import { MobileMegaMenu } from "@/components/mega-menu/mobile-mega-menu"

// Define menu data here since we're not using the separate file
const menuData = [
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

export function Header() {
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const handleLogout = useCallback(async () => {
    await logout()
    closeMobileMenu()
  }, [logout, closeMobileMenu])

  // Check if we're on a page where we want to show the mega menu
  // You might want to hide it on certain pages like checkout, login, etc.
  const shouldShowMegaMenu =
    !pathname.includes("/checkout") &&
    !pathname.includes("/auth") &&
    !pathname.includes("/profile") &&
    pathname !== "/cart"

  return (
    <>
      {shouldShowMegaMenu ? (
        // Show the mega menu on most pages
        <>
          <div className="hidden md:block">
            <MegaMenu />
          </div>

          {/* Mobile header with hamburger menu */}
          <header className="md:hidden sticky top-0 z-50 w-full border-b bg-background">
            <div className="container flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-bold">Red Sea Quest</span>
                </Link>
              </div>

              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </header>

          {/* Mobile mega menu */}
          <MobileMegaMenu
            isOpen={isMobileMenuOpen}
            onClose={closeMobileMenu}
            menuData={menuData}
            filterCategories={filterCategories}
          />
        </>
      ) : (
        // Show a simplified header on checkout, auth pages, etc.
        <header className="sticky top-0 z-50 w-full border-b bg-background">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold">Red Sea Quest</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/bookings">My Bookings</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/login">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/auth/register">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t">
              <div className="container px-4 py-4 flex flex-col gap-4">
                <div className="border-t pt-4 flex flex-col gap-2">
                  {user ? (
                    <>
                      <Button variant="ghost" size="sm" asChild className="justify-start">
                        <Link href="/bookings" onClick={closeMobileMenu}>
                          My Bookings
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="justify-start">
                        <Link href="/profile" onClick={closeMobileMenu}>
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" asChild className="justify-start">
                        <Link href="/auth/login" onClick={closeMobileMenu}>
                          <LogIn className="h-4 w-4 mr-2" />
                          Login
                        </Link>
                      </Button>
                      <Button size="sm" asChild className="justify-start">
                        <Link href="/auth/register" onClick={closeMobileMenu}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Register
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </header>
      )}
    </>
  )
}

