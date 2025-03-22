import { NextResponse } from "next/server"
import { getBlogPosts } from "@/lib/airtable"

export async function GET(request: Request) {
  try {
    // Get the URL parameters
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit") as string) : 5

    // Fetch blog posts without any filters
    const posts = await getBlogPosts({ limit })

    // Return basic info about the posts to avoid large response
    const simplifiedPosts = posts.map((post) => ({
      id: post.id,
      title: post.fields.Title,
      slug: post.fields.Slug,
      publicationDate: post.fields["Publication Date"],
      hasImage: !!post.fields["Featured Image"]?.length,
      excerpt: post.fields.Excerpt?.substring(0, 100) + "...",
    }))

    return NextResponse.json({
      success: true,
      count: posts.length,
      posts: simplifiedPosts,
    })
  } catch (error) {
    console.error("Error in debug blog posts API:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

