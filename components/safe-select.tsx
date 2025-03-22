"use client"

import type React from "react"
import { Select as ShadcnSelect, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SafeSelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  children: React.ReactNode
  className?: string
}

export function SafeSelect({ value, onValueChange, placeholder, children, className }: SafeSelectProps) {
  return (
    <ShadcnSelect value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </ShadcnSelect>
  )
}

