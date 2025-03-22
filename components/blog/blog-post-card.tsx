import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from "lucide-react"
import type { BlogPost } from "@/lib/airtable"
import { formatDate } from "@/lib/utils"

interface BlogPostCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.fields.Slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-[16/9] relative overflow-hidden">
          {post.fields["Featured Image"] && post.fields["Featured Image"].length > 0 ? (
            <Image
              src={post.fields["Featured Image"][0].url || "/placeholder.svg?height=300&width=500"}
              alt={post.fields.Title || "Blog post"}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}

          {post.fields.Categories && post.fields.Categories.length > 0 && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-primary text-primary-foreground">{post.fields.Categories[0]}</Badge>
            </div>
          )}

          {post.fields["Featured Post"] && (
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-background">
                Featured
              </Badge>
            </div>
          )}
        </div>

        <CardContent className={`p-4 ${featured ? "md:p-6" : ""}`}>
          <h3 className={`font-semibold ${featured ? "text-xl md:text-2xl" : "text-lg"} line-clamp-2 mb-2`}>
            {post.fields.Title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.fields.Excerpt}</p>

          <div className="flex items-center text-xs text-muted-foreground gap-4">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{post.fields["Publication Date"] ? formatDate(post.fields["Publication Date"]) : "No date"}</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{post.fields["Read Time"] || 5} min read</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

