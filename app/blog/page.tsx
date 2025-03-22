import Link from "next/link"
import type { Metadata } from "next"
import { getBlogPosts, getBlogCategories, getBlogTags } from "@/lib/airtable"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { Pagination } from "@/components/blog/pagination"
import { FeaturedPost } from "@/components/blog/featured-post"
import { DebugInfo } from "@/components/blog/debug-info"

export const metadata: Metadata = {
  title: "Blog | Red Sea Quest",
  description: "Explore our blog for tips, guides, and stories about marine experiences in the Red Sea region.",
  openGraph: {
    title: "Blog | Red Sea Quest",
    description: "Explore our blog for tips, guides, and stories about marine experiences in the Red Sea region.",
    type: "website",
  },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get page number from query params
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined
  const tag = typeof searchParams.tag === "string" ? searchParams.tag : undefined
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined

  // Create a params object for pagination
  const paginationParams: Record<string, string> = {}
  if (category) paginationParams.category = category
  if (tag) paginationParams.tag = tag
  if (search) paginationParams.search = search

  // Fetch blog posts with pagination
  const postsPerPage = 6
  try {
    const blogPosts = await getBlogPosts({
      limit: postsPerPage,
      page,
      category,
      tag,
      search,
      status: "Published", // Only show published posts
    })

    // Fetch featured post
    const featuredPostsResult = await getBlogPosts({
      limit: 1,
      featured: true,
      status: "Published", // Only show published posts
    })

    const featuredPost = featuredPostsResult.length > 0 ? featuredPostsResult[0] : null

    // Add debugging output
    console.log(`Retrieved ${blogPosts.length} blog posts for display`)

    // Fetch categories and tags for the sidebar
    const categories = await getBlogCategories()
    const tags = await getBlogTags(15) // Limit to top 15 tags

    // Fetch total post count for pagination
    // Since we're using a different pagination approach, we'll use a reasonable number
    // that won't cause issues if we try to paginate beyond available records
    const totalPosts = 691 // You mentioned you have 691 blog posts
    const totalPages = Math.ceil(totalPosts / postsPerPage)

    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Red Sea Quest Blog</h1>
            <p className="text-muted-foreground">
              Dive into our latest articles, guides, and stories about marine experiences in the Red Sea
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && !category && !tag && !search && page === 1 && <FeaturedPost post={featuredPost} />}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Filter indicators */}
              {(category || tag || search) && (
                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <h2 className="text-lg font-medium mb-2">
                    {category && `Posts in category: ${category}`}
                    {tag && `Posts tagged with: ${tag}`}
                    {search && `Search results for: ${search}`}
                  </h2>
                  <Link href="/blog" className="text-primary hover:underline">
                    Clear filters
                  </Link>
                </div>
              )}

              {/* Debug information - only visible in development */}
              <DebugInfo
                data={{
                  postsCount: blogPosts.length,
                  featuredPostsCount: featuredPostsResult.length,
                  pagination: { page, totalPages, postsPerPage },
                  filters: { category, tag, search },
                }}
                title="Blog Page Debug Info"
              />

              {/* Blog posts grid */}
              {blogPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No posts found</h3>
                  <p className="text-muted-foreground mb-6">
                    No blog posts match your current filters. Try adjusting your search criteria.
                  </p>
                  <Link href="/blog" className="text-primary hover:underline">
                    View all posts
                  </Link>
                </div>
              )}

              {/* Pagination */}
              <Pagination currentPage={page} totalPages={totalPages} basePath="/blog" searchParams={paginationParams} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar categories={categories} tags={tags} />
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error rendering blog page:", error)

    // Provide a user-friendly error page
    return (
      <div className="container px-4 py-16 md:px-6 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Blog Temporarily Unavailable</h1>
          <p className="text-lg mb-8">
            We're currently experiencing some technical difficulties with our blog. Our team is working to resolve this
            issue as quickly as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Return to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Contact Support
            </Link>
          </div>
          {process.env.NODE_ENV === "development" && (
            <div className="mt-12 p-6 bg-gray-100 rounded-lg text-left">
              <h3 className="text-lg font-semibold mb-2">Developer Information</h3>
              <p className="text-red-600 mb-4">Error: {String(error)}</p>
              <p className="mb-2">Possible causes:</p>
              <ul className="list-disc pl-5 mb-4">
                <li>Airtable API key doesn't have access to the blog tables</li>
                <li>Blog tables don't exist in the Airtable base</li>
                <li>Table names don't match exactly (case-sensitive)</li>
                <li>Environment variables are missing or incorrect</li>
              </ul>
              <p>
                <Link href="/api/debug/airtable-permissions" className="text-blue-600 hover:underline">
                  Run Airtable Permissions Diagnostic
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

