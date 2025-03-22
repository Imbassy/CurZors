type LogLevel = "debug" | "info" | "warn" | "error"

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, any>
}

export const logger = {
  debug: (message: string, context?: Record<string, any>) => log("debug", message, context),
  info: (message: string, context?: Record<string, any>) => log("info", message, context),
  warn: (message: string, context?: Record<string, any>) => log("warn", message, context),
  error: (message: string, context?: Record<string, any>) => log("error", message, context),
}

function log(level: LogLevel, message: string, context?: Record<string, any>) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
  }

  // In development, log to console
  if (process.env.NODE_ENV === "development") {
    const method = level === "error" ? "error" : level === "warn" ? "warn" : "log"
    console[method](`[${entry.timestamp}] [${level.toUpperCase()}] ${message}`, context || "")
    return
  }

  // In production, you would send logs to a service
  // For example, using Vercel Logs or a third-party service
  if (process.env.NODE_ENV === "production") {
    // Example: send to a logging service
    // sendToLoggingService(entry)

    // Still log errors to console in production
    if (level === "error") {
      console.error(`[${entry.timestamp}] [ERROR] ${message}`, context || "")
    }
  }
}

