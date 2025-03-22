"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define supported currencies with their symbols and exchange rates (relative to USD)
export const currencies = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.79 },
  EGP: { symbol: "E£", rate: 30.9 }, // Egyptian Pound
  AED: { symbol: "د.إ", rate: 3.67 }, // UAE Dirham
}

export type CurrencyCode = keyof typeof currencies

type CurrencyContextType = {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
  formatPrice: (amount: number) => string
  convertPrice: (amount: number) => number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD")

  // Load currency preference from localStorage on initial render
  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") as CurrencyCode
    if (savedCurrency && currencies[savedCurrency]) {
      setCurrency(savedCurrency)
    }
  }, [])

  // Save currency preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currency", currency)
  }, [currency])

  // Convert price from USD to selected currency
  const convertPrice = (amount: number): number => {
    const rate = currencies[currency].rate
    return Number.parseFloat((amount * rate).toFixed(2))
  }

  // Format price with currency symbol
  const formatPrice = (amount: number): string => {
    const convertedAmount = convertPrice(amount)
    return `${currencies[currency].symbol}${convertedAmount.toFixed(2)}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}

