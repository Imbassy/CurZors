import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/airtable"
import { formatDate } from "@/lib/utils"

interface FeaturedPostProps {
  post: BlogPost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-[4/3] md:aspect-auto">
          {post.fields["Featured Image"] && post.fields["Featured Image"].length > 0 ? (
            <Image
              src={post.fields["Featured Image"][0].url || "/placeholder.svg"}
              alt={post.fields.Title}
              fill
              className="object-cover"
              priority
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
        </div>

        <CardContent className="p-6 flex flex-col justify-center">
          <Badge variant="outline" className="w-fit mb-4">
            Featured Post
          </Badge>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">{post.fields.Title}</h2>

          <p className="text-muted-foreground mb-6">{post.fields.Excerpt}</p>

          <div className="flex items-center text-sm text-muted-foreground gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(post.fields["Publication Date"])}</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.fields["Read Time"]} min read</span>
            </div>
          </div>

          <Button asChild className="w-fit">
            <Link href={`/blog/${post.fields.Slug}`}>
              Read Article
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}

