/**
 * Safely converts any value to a string for display in JSX
 * Handles objects, null, and undefined values
 */
export function displayValue(value: any): string {
  if (value === null || value === undefined) {
    return ""
  }

  if (typeof value === "object") {
    // If it's an object with state/value properties (like from useActionState)
    if (value.state && typeof value.state === "object") {
      return displayValue(value.state.message || value.state)
    }

    // For other objects, convert to JSON string
    try {
      return JSON.stringify(value)
    } catch (e) {
      return "[Object]"
    }
  }

  return String(value)
}

