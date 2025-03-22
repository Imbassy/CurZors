"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-python"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-json"

interface BlogContentProps {
  content: string
  className?: string
}

export function BlogContent({ content, className }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Process code blocks for syntax highlighting
    if (contentRef.current) {
      Prism.highlightAllUnder(contentRef.current)
    }
  }, [content])

  return (
    <div
      ref={contentRef}
      className={cn(
        "prose prose-gray dark:prose-invert max-w-none",
        "prose-headings:font-bold prose-headings:tracking-tight",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-img:rounded-lg",
        "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

