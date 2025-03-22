import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getBlogTagBySlug, getBlogPosts } from "@/lib/airtable"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { Pagination } from "@/components/blog/pagination"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tag = await getBlogTagBySlug(params.slug)

  if (!tag) {
    return {
      title: "Tag Not Found | Red Sea Quest Blog",
      description: "The blog tag you're looking for could not be found.",
    }
  }

  return {
    title: tag.fields["Meta Title"] || `Posts tagged with ${tag.fields.Name} | Red Sea Quest Blog`,
    description: tag.fields["Meta Description"] || `Browse all blog posts tagged with ${tag.fields.Name}`,
    keywords: tag.fields["Meta Keywords"],
    openGraph: {
      title: tag.fields["Meta Title"] || `Posts tagged with ${tag.fields.Name} | Red Sea Quest Blog`,
      description: tag.fields["Meta Description"] || `Browse all blog posts tagged with ${tag.fields.Name}`,
      type: "website",
    },
  }
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const tag = await getBlogTagBySlug(params.slug)

  if (!tag) {
    notFound()
  }

  // Get page number from query params
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1

  // Fetch blog posts for this tag with pagination
  const postsPerPage = 9
  const blogPosts = await getBlogPosts({
    limit: postsPerPage,
    page,
    tag: tag.fields.Name,
    status: "Published",
  })

  // Calculate total pages
  const totalPosts = tag.fields["Post Count"] || 0
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <span>/</span>
          <Link href="/blog/tags" className="hover:text-foreground">
            Tags
          </Link>
          <span>/</span>
          <span className="text-foreground">{tag.fields.Name}</span>
        </div>

        {/* Tag Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Posts tagged with "{tag.fields.Name}"</h1>
          {tag.fields.Description && <p className="text-muted-foreground">{tag.fields.Description}</p>}
        </div>

        {/* Blog posts grid */}
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-6">There are no posts with this tag yet.</p>
            <Link href="/blog" className="text-primary hover:underline">
              View all posts
            </Link>
          </div>
        )}

        {/* Pagination */}
        <Pagination currentPage={page} totalPages={totalPages} basePath={`/blog/tag/${params.slug}`} />
      </div>
    </div>
  )
}

