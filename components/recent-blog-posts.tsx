import Link from "next/link"
import Image from "next/image"
import { getBlogPosts } from "@/lib/airtable"

export default async function RecentBlogPosts() {
  const posts = await getBlogPosts({ limit: 3, sortField: "Publication Date", sortDirection: "desc" })

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No blog posts found. Check back soon for travel insights!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <Link href={`/blog/${post.fields.Slug}`}>
            <div className="relative h-48 w-full">
              {post.fields["Featured Image"] && post.fields["Featured Image"].length > 0 ? (
                <Image
                  src={post.fields["Featured Image"][0].url || "/placeholder.svg?height=300&width=400"}
                  alt={post.fields.Title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="text-sm text-gray-500">
                  {new Date(post.fields["Publication Date"]).toLocaleDateString()}
                </span>
                <span className="mx-2">•</span>
                <span className="text-sm text-gray-500">{post.fields["Read Time"] || "5"} min read</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{post.fields.Title}</h3>
              <p className="text-gray-600 line-clamp-3">{post.fields.Excerpt}</p>
              <div className="mt-4 flex items-center">
                <span className="text-primary-600 font-medium">Read more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

