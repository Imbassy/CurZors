"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { useFilters } from "@/contexts/filter-context"
import type { FilterState } from "@/contexts/filter-context"

interface RangeFilterProps {
  min: number
  max: number
  step: number
  value: [number, number]
  filterKey: keyof FilterState
  prefix?: string
  suffix?: string
}

export function RangeFilter({ min, max, step, value, filterKey, prefix = "", suffix = "" }: RangeFilterProps) {
  const { setFilter } = useFilters()
  const [localValue, setLocalValue] = useState<[number, number]>(value)

  // Update local value when the filter value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Debounce the filter update to avoid too many rerenders
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue[0] !== value[0] || localValue[1] !== value[1]) {
        setFilter(filterKey, localValue as any)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [localValue, setFilter, filterKey, value])

  return (
    <div className="space-y-4">
      <Slider
        defaultValue={[min, max]}
        value={localValue}
        min={min}
        max={max}
        step={step}
        onValueChange={(newValue) => setLocalValue(newValue as [number, number])}
        className="my-6"
      />
      <div className="flex items-center justify-between text-sm">
        <span>
          {prefix}
          {localValue[0]}
          {suffix}
        </span>
        <span>
          {prefix}
          {localValue[1]}
          {suffix}
        </span>
      </div>
    </div>
  )
}

