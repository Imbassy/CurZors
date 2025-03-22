"use client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FilterIcon } from "lucide-react"
import { FilterSidebar } from "./filter-sidebar"

interface MobileFilterDrawerProps {
  categories: any[]
  destinations: any[]
  attractionTypes?: any[]
  amenities?: any[]
  languages?: string[]
  accessibilityOptions?: string[]
  timeOfDayOptions?: string[]
}

export function MobileFilterDrawer({
  categories,
  destinations,
  attractionTypes = [],
  amenities = [],
  languages = [],
  accessibilityOptions = [],
  timeOfDayOptions = [],
}: MobileFilterDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">
          <FilterIcon className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <FilterSidebar
            categories={categories}
            destinations={destinations}
            attractionTypes={attractionTypes}
            amenities={amenities}
            languages={languages}
            accessibilityOptions={accessibilityOptions}
            timeOfDayOptions={timeOfDayOptions}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

