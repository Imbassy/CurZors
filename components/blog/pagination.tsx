import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  searchParams?: Record<string, string>
}

export function Pagination({ currentPage, totalPages, basePath, searchParams = {} }: PaginationProps) {
  // Safety checks to prevent invalid pagination
  const safeCurrentPage = Math.max(1, Math.min(currentPage || 1, Math.max(1, totalPages || 1)))
  const safeTotalPages = Math.max(1, totalPages || 1)

  // Create a copy of the search params without the page parameter
  const otherParams = { ...searchParams }
  delete otherParams.page

  // Build the query string for other parameters
  const queryString =
    Object.keys(otherParams).length > 0
      ? "&" +
        Object.entries(otherParams)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join("&")
      : ""

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    // Always show first page
    pages.push(1)

    // Calculate range around current page
    let rangeStart = Math.max(2, safeCurrentPage - Math.floor(maxPagesToShow / 2))
    const rangeEnd = Math.min(safeTotalPages - 1, rangeStart + maxPagesToShow - 2)

    // Adjust range if we're near the end
    if (rangeEnd <= rangeStart) {
      rangeStart = Math.max(2, rangeEnd - maxPagesToShow + 2)
    }

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push("...")
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < safeTotalPages - 1) {
      pages.push("...")
    }

    // Always show last page if there's more than one page
    if (safeTotalPages > 1) {
      pages.push(safeTotalPages)
    }

    return pages
  }

  // Don't render pagination if there's only one page
  if (safeTotalPages <= 1) {
    return null
  }

  return (
    <nav className="flex justify-center mt-8" aria-label="Pagination">
      <ul className="flex items-center gap-1">
        {/* Previous page button */}
        <li>
          {safeCurrentPage > 1 ? (
            <Link
              href={`${basePath}?page=${safeCurrentPage - 1}${queryString}`}
              className="flex items-center px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          ) : (
            <span className="flex items-center px-2 py-2 rounded-md text-gray-300 cursor-not-allowed">
              <ChevronLeft className="h-5 w-5" />
            </span>
          )}
        </li>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <Link
                href={`${basePath}?page=${page}${queryString}`}
                className={`px-3 py-2 rounded-md ${
                  page === safeCurrentPage ? "bg-primary text-white font-medium" : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-current={page === safeCurrentPage ? "page" : undefined}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        {/* Next page button */}
        <li>
          {safeCurrentPage < safeTotalPages ? (
            <Link
              href={`${basePath}?page=${safeCurrentPage + 1}${queryString}`}
              className="flex items-center px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          ) : (
            <span className="flex items-center px-2 py-2 rounded-md text-gray-300 cursor-not-allowed">
              <ChevronRight className="h-5 w-5" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}

