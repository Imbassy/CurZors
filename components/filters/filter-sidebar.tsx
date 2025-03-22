"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FilterX, ChevronDown, ChevronUp } from "lucide-react"
import { useFilters } from "@/contexts/filter-context"
import { CheckboxFilter } from "./checkbox-filter"
import { RangeFilter } from "./range-filter"
import { DateFilter } from "./date-filter"
import { SearchFilter } from "./search-filter"
import { ActiveFilters } from "./active-filters"

interface FilterSidebarProps {
  categories: any[]
  destinations: any[]
  attractionTypes?: any[]
  amenities?: any[]
  languages?: string[]
  accessibilityOptions?: string[]
  timeOfDayOptions?: string[]
}

export function FilterSidebar({
  categories,
  destinations,
  attractionTypes = [],
  amenities = [],
  languages = [],
  accessibilityOptions = [],
  timeOfDayOptions = [],
}: FilterSidebarProps) {
  const { filters, resetFilters } = useFilters()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    destinations: true,
    price: true,
    rating: false,
    date: false,
    attractionTypes: false,
    amenities: false,
    duration: false,
    languages: false,
    accessibility: false,
    timeOfDay: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Count active filters
  const activeFilterCount =
    (filters.search ? 1 : 0) +
    filters.categories.length +
    filters.destinations.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0) +
    (filters.rating !== null ? 1 : 0) +
    (filters.dateRange[0] !== null || filters.dateRange[1] !== null ? 1 : 0) +
    filters.attractionTypes.length +
    filters.amenities.length +
    (filters.duration[0] > 0 || filters.duration[1] < 24 ? 1 : 0) +
    filters.languages.length +
    filters.accessibility.length +
    filters.timeOfDay.length

  return (
    <div className="w-full md:w-64 bg-white rounded-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
            <FilterX className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <>
          <ActiveFilters />
          <Separator />
        </>
      )}

      <div className="space-y-4">
        {/* Search Filter */}
        <SearchFilter />

        {/* Categories Filter */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer py-1"
            onClick={() => toggleSection("categories")}
          >
            <h4 className="font-medium">Categories</h4>
            {expandedSections.categories ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          {expandedSections.categories && (
            <div className="mt-2">
              <CheckboxFilter
                options={categories.map((cat) => ({
                  id: cat.id,
                  label: cat.fields["Category Name"],
                  value: cat.fields["Category Name"],
                }))}
                selectedValues={filters.categories}
                filterKey="categories"
              />
            </div>
          )}
        </div>

        {/* Destinations Filter */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer py-1"
            onClick={() => toggleSection("destinations")}
          >
            <h4 className="font-medium">Destinations</h4>
            {expandedSections.destinations ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          {expandedSections.destinations && (
            <div className="mt-2">
              <CheckboxFilter
                options={destinations.map((dest) => ({
                  id: dest.id,
                  label: dest.fields["Destination Name"],
                  value: dest.fields["Destination Name"],
                }))}
                selectedValues={filters.destinations}
                filterKey="destinations"
              />
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div>
          <div className="flex items-center justify-between cursor-pointer py-1" onClick={() => toggleSection("price")}>
            <h4 className="font-medium">Price Range</h4>
            {expandedSections.price ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          {expandedSections.price && (
            <div className="mt-2">
              <RangeFilter min={0} max={1000} step={10} value={filters.priceRange} filterKey="priceRange" prefix="$" />
            </div>
          )}
        </div>

        {/* Attraction Types Filter */}
        {attractionTypes.length > 0 && (
          <div>
            <div
              className="flex items-center justify-between cursor-pointer py-1"
              onClick={() => toggleSection("attractionTypes")}
            >
              <h4 className="font-medium">Attraction Types</h4>
              {expandedSections.attractionTypes ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {expandedSections.attractionTypes && (
              <div className="mt-2">
                <CheckboxFilter
                  options={attractionTypes.map((type) => ({
                    id: type.id,
                    label: type,
                    value: type,
                  }))}
                  selectedValues={filters.attractionTypes}
                  filterKey="attractionTypes"
                />
              </div>
            )}
          </div>
        )}

        {/* Amenities Filter */}
        {amenities.length > 0 && (
          <div>
            <div
              className="flex items-center justify-between cursor-pointer py-1"
              onClick={() => toggleSection("amenities")}
            >
              <h4 className="font-medium">Amenities</h4>
              {expandedSections.amenities ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {expandedSections.amenities && (
              <div className="mt-2">
                <CheckboxFilter
                  options={amenities.map((amenity) => ({
                    id: amenity.id,
                    label: amenity.fields["Amenity Name"],
                    value: amenity.fields["Amenity Name"],
                  }))}
                  selectedValues={filters.amenities}
                  filterKey="amenities"
                />
              </div>
            )}
          </div>
        )}

        {/* Duration Filter */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer py-1"
            onClick={() => toggleSection("duration")}
          >
            <h4 className="font-medium">Duration</h4>
            {expandedSections.duration ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          {expandedSections.duration && (
            <div className="mt-2">
              <RangeFilter min={0} max={24} step={0.5} value={filters.duration} filterKey="duration" suffix=" hours" />
            </div>
          )}
        </div>

        {/* Languages Filter */}
        {languages.length > 0 && (
          <div>
            <div
              className="flex items-center justify-between cursor-pointer py-1"
              onClick={() => toggleSection("languages")}
            >
              <h4 className="font-medium">Languages</h4>
              {expandedSections.languages ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {expandedSections.languages && (
              <div className="mt-2">
                <CheckboxFilter
                  options={languages.map((lang) => ({
                    id: lang,
                    label: lang,
                    value: lang,
                  }))}
                  selectedValues={filters.languages}
                  filterKey="languages"
                />
              </div>
            )}
          </div>
        )}

        {/* Accessibility Filter */}
        {accessibilityOptions.length > 0 && (
          <div>
            <div
              className="flex items-center justify-between cursor-pointer py-1"
              onClick={() => toggleSection("accessibility")}
            >
              <h4 className="font-medium">Accessibility</h4>
              {expandedSections.accessibility ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {expandedSections.accessibility && (
              <div className="mt-2">
                <CheckboxFilter
                  options={accessibilityOptions.map((option) => ({
                    id: option,
                    label: option,
                    value: option,
                  }))}
                  selectedValues={filters.accessibility}
                  filterKey="accessibility"
                />
              </div>
            )}
          </div>
        )}

        {/* Time of Day Filter */}
        {timeOfDayOptions.length > 0 && (
          <div>
            <div
              className="flex items-center justify-between cursor-pointer py-1"
              onClick={() => toggleSection("timeOfDay")}
            >
              <h4 className="font-medium">Time of Day</h4>
              {expandedSections.timeOfDay ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {expandedSections.timeOfDay && (
              <div className="mt-2">
                <CheckboxFilter
                  options={timeOfDayOptions.map((option) => ({
                    id: option,
                    label: option,
                    value: option,
                  }))}
                  selectedValues={filters.timeOfDay}
                  filterKey="timeOfDay"
                />
              </div>
            )}
          </div>
        )}

        {/* Date Filter */}
        <div>
          <div className="flex items-center justify-between cursor-pointer py-1" onClick={() => toggleSection("date")}>
            <h4 className="font-medium">Date</h4>
            {expandedSections.date ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          {expandedSections.date && (
            <div className="mt-2">
              <DateFilter />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

