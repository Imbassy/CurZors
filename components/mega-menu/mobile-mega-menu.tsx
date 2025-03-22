"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
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

type MobileMegaMenuProps = {
  isOpen: boolean
  onClose: () => void
  menuData: MenuCategory[]
  filterCategories: { name: string; href: string }[]
}

export function MobileMegaMenu({ isOpen, onClose, menuData, filterCategories }: MobileMegaMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName)
    setExpandedSection(null)
  }

  const toggleSection = (sectionTitle: string) => {
    setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <span className="text-xl font-bold">Red Sea Quest</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="container px-4 py-6 space-y-6">
        {/* Filter categories */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Quick Links</h3>
          <ul className="space-y-3">
            {filterCategories.map((filter) => (
              <li key={filter.name}>
                <Link
                  href={filter.href}
                  className="block py-2 text-gray-600 hover:text-primary font-medium"
                  onClick={onClose}
                >
                  {filter.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Main categories */}
        <div className="space-y-4">
          {menuData.map((category) => (
            <div key={category.name} className="border-t pt-4">
              <button
                className="flex items-center justify-between w-full py-2 text-left font-medium"
                onClick={() => toggleCategory(category.name)}
              >
                {category.name}
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform",
                    expandedCategory === category.name && "transform rotate-180",
                  )}
                />
              </button>

              {expandedCategory === category.name && (
                <div className="pl-4 mt-2 space-y-4">
                  {category.sections.map((section) => (
                    <div key={section.title}>
                      <button
                        className="flex items-center justify-between w-full py-2 text-left"
                        onClick={() => toggleSection(section.title)}
                      >
                        {section.title}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedSection === section.title && "transform rotate-180",
                          )}
                        />
                      </button>

                      {expandedSection === section.title && (
                        <ul className="pl-4 mt-2 space-y-3">
                          {section.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="flex items-center gap-3 py-2 hover:text-primary"
                                onClick={onClose}
                              >
                                {item.icon && (
                                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                      src={item.icon || "/placeholder.svg"}
                                      alt={item.name}
                                      width={32}
                                      height={32}
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <span>{item.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                      {expandedSection === section.title && (
                        <Link
                          href={`/category/${section.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 pl-4"
                          onClick={onClose}
                        >
                          Explore more {section.title.toLowerCase()}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional links */}
        <div className="border-t pt-4">
          <Link href="/blog" className="block py-2 text-gray-600 hover:text-primary font-medium" onClick={onClose}>
            Blog
          </Link>
        </div>
      </div>
    </div>
  )
}

