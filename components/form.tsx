import type React from "react"
import { displayValue } from "@/utils/display-utils"

interface FormProps {
  formState: {
    message?: string
    success?: boolean
  } | null
}

const Form: React.FC<FormProps> = ({ formState }) => {
  return (
    <form>
      {/* Your form controls go here */}

      {formState && typeof formState === "object" && "message" in formState && (
        <div className="mt-4 text-center">{displayValue(formState.message)}</div>
      )}
    </form>
  )
}

export default Form

