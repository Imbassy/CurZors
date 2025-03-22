"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { useFilters } from "@/contexts/filter-context"

interface SortOption {
  label: string
  value: string
}

interface SortDropdownProps {
  options: SortOption[]
}

export function SortDropdown({ options }: SortDropdownProps) {
  const { filters, setFilter } = useFilters()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[180px]">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort: {options.find((option) => option.value === filters.sortBy)?.label || "Recommended"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuRadioGroup value={filters.sortBy} onValueChange={(value) => setFilter("sortBy", value)}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

