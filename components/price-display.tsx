"use client"

import { useCurrency } from "@/contexts/currency-context"

interface PriceDisplayProps {
  amount: number
  className?: string
  size?: "sm" | "md" | "lg"
  showCurrency?: boolean
}

export function PriceDisplay({ amount, className = "", size = "md", showCurrency = false }: PriceDisplayProps) {
  const { formatPrice, currency } = useCurrency()

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl font-bold",
  }

  return (
    <span className={`${sizeClasses[size]} ${className}`}>
      {formatPrice(amount)}
      {showCurrency && ` ${currency}`}
    </span>
  )
}

