"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { logError } from "@/lib/error-handler"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error
    logError({
      message: error.message || "Unknown error in app",
      source: "general",
      originalError: error,
    })
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        We apologize for the inconvenience. Our team has been notified of this issue.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}

