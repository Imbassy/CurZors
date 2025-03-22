type ErrorSource = "airtable" | "auth" | "payment" | "booking" | "review" | "general"

interface ErrorDetails {
  message: string
  source: ErrorSource
  context?: Record<string, any>
  originalError?: any
}

export function logError(details: ErrorDetails) {
  // In production, you would send this to a logging service
  console.error(`[${details.source.toUpperCase()}] Error: ${details.message}`, {
    context: details.context,
    originalError: details.originalError,
  })

  // For development, we'll just log to console
  if (process.env.NODE_ENV !== "production") {
    console.error("Error Details:", details)
  }
}

export function handleApiError(error: any, source: ErrorSource, context?: Record<string, any>) {
  logError({
    message: error.message || "An unknown error occurred",
    source,
    context,
    originalError: error,
  })

  // Return a standardized error response
  return {
    success: false,
    message: "An error occurred. Please try again later.",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  }
}

