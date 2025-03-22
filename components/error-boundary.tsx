"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Error caught by error boundary:", error)
      setError(error.error)
      setHasError(true)
    }

    window.addEventListener("error", errorHandler)
    return () => window.removeEventListener("error", errorHandler)
  }, [])

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <div className="rounded-full bg-red-100 p-3 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          We're sorry, but there was an error loading this page. Our team has been notified.
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
        {process.env.NODE_ENV === "development" && error && (
          <div className="mt-6 p-4 bg-red-50 rounded-md text-left overflow-auto max-w-full">
            <p className="font-mono text-sm text-red-600">{error.toString()}</p>
          </div>
        )}
      </div>
    )
  }

  return <>{children}</>
}

