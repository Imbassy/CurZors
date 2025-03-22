import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getBlogAuthorBySlug, getBlogPosts } from "@/lib/airtable"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { Pagination } from "@/components/blog/pagination"
import { SocialLinks } from "@/components/blog/social-links"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const author = await getBlogAuthorBySlug(params.slug)

  if (!author) {
    return {
      title: "Author Not Found | Red Sea Quest Blog",
      description: "The blog author you're looking for could not be found.",
    }
  }

  return {
    title: author.fields["Meta Title"] || `${author.fields.Name} | Red Sea Quest Blog`,
    description: author.fields["Meta Description"] || `Read articles by ${author.fields.Name}`,
    keywords: author.fields["Meta Keywords"],
    openGraph: {
      title: author.fields["Meta Title"] || `${author.fields.Name} | Red Sea Quest Blog`,
      description: author.fields["Meta Description"] || `Read articles by ${author.fields.Name}`,
      type: "profile",
      images: author.fields["Profile Image"]?.[0]?.url ? [author.fields["Profile Image"][0].url] : [],
    },
  }
}

export default async function AuthorPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const author = await getBlogAuthorBySlug(params.slug)

  if (!author) {
    notFound()
  }

  // Get page number from query params
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1

  // Fetch blog posts by this author with pagination
  const postsPerPage = 9
  const blogPosts = await getBlogPosts({
    limit: postsPerPage,
    page,
    author: author.fields["Author ID"],
    status: "Published",
  })

  // Calculate total pages
  const totalPosts = author.fields["Post Count"] || 0
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
          <Link href="/blog/authors" className="hover:text-foreground">
            Authors
          </Link>
          <span>/</span>
          <span className="text-foreground">{author.fields.Name}</span>
        </div>

        {/* Author Profile */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 items-start">
          {author.fields["Profile Image"] && author.fields["Profile Image"].length > 0 && (
            <div className="w-32 h-32 relative rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={author.fields["Profile Image"][0].url || "/placeholder.svg"}
                alt={author.fields.Name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold mb-2">{author.fields.Name}</h1>
            <div className="text-muted-foreground mb-4 whitespace-pre-line">{author.fields.Bio}</div>

            {/* Social Links */}
            {author.fields["Social Media"] && <SocialLinks socialMedia={author.fields["Social Media"]} />}
          </div>
        </div>

        {/* Author's Posts */}
        <h2 className="text-2xl font-bold mb-6">Articles by {author.fields.Name}</h2>

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
            <p className="text-muted-foreground mb-6">This author hasn't published any posts yet.</p>
            <Link href="/blog" className="text-primary hover:underline">
              View all posts
            </Link>
          </div>
        )}

        {/* Pagination */}
        <Pagination currentPage={page} totalPages={totalPages} basePath={`/blog/author/${params.slug}`} />
      </div>
    </div>
  )
}

