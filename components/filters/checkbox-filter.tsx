"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useFilters } from "@/contexts/filter-context"
import type { FilterState } from "@/contexts/filter-context"

interface CheckboxOption {
  id: string
  label: string
  value: string
}

interface CheckboxFilterProps {
  options: CheckboxOption[]
  selectedValues: string[]
  filterKey: keyof FilterState
}

export function CheckboxFilter({ options, selectedValues, filterKey }: CheckboxFilterProps) {
  const { toggleFilterValue } = useFilters()

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
      {options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox
            id={`${filterKey}-${option.id}`}
            checked={selectedValues.includes(option.value)}
            onCheckedChange={() => toggleFilterValue(filterKey, option.value)}
          />
          <Label htmlFor={`${filterKey}-${option.id}`} className="text-sm font-normal cursor-pointer">
            {option.label}
          </Label>
        </div>
      ))}
      {options.length === 0 && <div className="text-sm text-muted-foreground">No options available</div>}
    </div>
  )
}

