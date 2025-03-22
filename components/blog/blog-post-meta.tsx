import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface BlogPostMetaProps {
  date: string
  readTime: number
  categories?: string[]
}

export function BlogPostMeta({ date, readTime, categories }: BlogPostMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-1" />
        <span>{formatDate(date)}</span>
      </div>

      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-1" />
        <span>{readTime} min read</span>
      </div>

      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link key={category} href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
              <Badge variant="outline" className="hover:bg-muted">
                {category}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

