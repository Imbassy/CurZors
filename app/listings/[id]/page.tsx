import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Users, Star, ShieldCheck, CheckCircle2, X } from "lucide-react"
import { getListingById, getListings } from "@/lib/airtable"
import { AvailabilityWidget } from "@/components/availability-widget"
import { SimilarExperiences } from "@/components/similar-experiences"
import { TourReviews } from "@/components/tour-reviews"
import { TourGallery } from "@/components/tour-gallery"
import { TourHighlights } from "@/components/tour-highlights"
import { TourItinerary } from "@/components/tour-itinerary"

// Update the ListingPage component to handle the new schema
export default async function ListingPage({ params }: { params: { id: string } }) {
  // Use a friendly ID format instead of exposing Airtable record IDs
  const friendlyId = params.id

  const listing = await getListingById(friendlyId).catch(() => null)

  if (!listing) {
    notFound()
  }

  // Get similar experiences based on category or destination
  const similarListings = await getListings({
    filterByField: "category",
    filterValue: listing.fields.category || "",
    limit: 4,
  }).catch(() => [])

  // Filter out the current listing
  const filteredSimilarListings = similarListings.filter((item) => item.fields.code !== friendlyId)

  // Get price from new schema or fall back to old schema
  const price = listing.fields["price/retailPrice/amount"] || listing.fields.Price || 0
  const currencySymbol = listing.fields["price/retailPrice/currencySymbol"] || "$"

  // Get rating from new schema or fall back to old schema
  const rating = listing.fields["rating/score"] || listing.fields["Average Rating"] || 0
  const reviewCount = listing.fields["rating/reviewCount"] || listing.fields["Total Reviews"] || 0

  // Get duration information
  const durationDays = listing.fields["displayDuration/duration/days"] || 0
  const durationHours = listing.fields["displayDuration/duration/hours"] || 0
  const durationMinutes = listing.fields["displayDuration/duration/minutes"] || 0

  // Format duration for display
  let durationText = ""
  if (durationDays > 0) durationText += `${durationDays} day${durationDays > 1 ? "s" : ""} `
  if (durationHours > 0) durationText += `${durationHours} hour${durationHours > 1 ? "s" : ""} `
  if (durationMinutes > 0) durationText += `${durationMinutes} minute${durationMinutes > 1 ? "s" : ""}`
  durationText = durationText.trim() || "3 hours" // Default if no duration specified

  // Get itinerary data from the listing if available
  const itineraryData = listing.fields.itinerary || []
  const hasItinerary = Array.isArray(itineraryData) && itineraryData.length > 0

  // Get highlights data from the listing if available
  const highlightsData = listing.fields.highlights || []
  const hasHighlights = Array.isArray(highlightsData) && highlightsData.length > 0

  // Get meeting point data
  const meetingPoint = listing.fields.meetingPoint || "Marina Yacht Club, Pier 7"
  const hasHotelPickup = listing.fields.hasHotelPickup !== false

  // Add structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.fields.title,
    description: listing.fields.description,
    image: listing.fields["image/src"] || listing.fields.Photos?.[0]?.url || "",
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: listing.fields["price/retailPrice/currencyCode"] || "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount: reviewCount,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/listings">Tours</Link>
          <span>/</span>
          <span className="text-foreground">{listing.fields.title}</span>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Tour details */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-6">
              {/* Title section */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{listing.fields.title}</h1>
                <div className="flex items-center flex-wrap gap-2 text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{rating}</span>
                    <span className="text-muted-foreground ml-1">({reviewCount} reviews)</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{listing.fields.location || listing.fields.Destination?.[0] || "Red Sea"}</span>
                  </div>
                </div>
              </div>

              {/* Image gallery */}
              <TourGallery
                photos={
                  listing.fields["image/src"]
                    ? [
                        {
                          url: listing.fields["image/src"],
                          filename: listing.fields["image/alt"] || "Tour Image",
                          id: "main",
                        },
                      ]
                    : listing.fields.Photos || []
                }
                title={listing.fields.title}
              />

              {/* Quick info badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  {listing.fields.category || listing.fields.Category?.[0] || "Experience"}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  {listing.fields.isPrivateTour ? "Private tour" : "Small group"}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Duration: {durationText}
                </Badge>
                {listing.fields["behaviours/hasFreeCancellation"] && (
                  <Badge variant="outline" className="px-3 py-1">
                    Free cancellation
                  </Badge>
                )}
              </div>

              <Separator />

              {/* Overview section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <div className="text-muted-foreground space-y-4">
                  <p className="whitespace-pre-line">{listing.fields.description}</p>
                  {!listing.fields.description && (
                    <p>
                      Experience the vibrant underwater world of the Red Sea with our expert guides. This tour is
                      suitable for all skill levels, from beginners to experienced divers.
                    </p>
                  )}
                </div>
              </div>

              {/* What's included section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Included</h3>
                    <ul className="space-y-2">
                      {listing.fields.included ? (
                        Array.isArray(listing.fields.included) ? (
                          listing.fields.included.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))
                        ) : (
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{listing.fields.included}</span>
                          </li>
                        )
                      ) : (
                        <>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Professional guide</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>All necessary equipment</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Snacks and refreshments</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Hotel pickup and drop-off</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Photos of your experience</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Not Included</h3>
                    <ul className="space-y-2">
                      {listing.fields.notIncluded ? (
                        Array.isArray(listing.fields.notIncluded) ? (
                          listing.fields.notIncluded.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))
                        ) : (
                          <li className="flex items-start">
                            <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{listing.fields.notIncluded}</span>
                          </li>
                        )
                      ) : (
                        <>
                          <li className="flex items-start">
                            <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Gratuities (optional)</span>
                          </li>
                          <li className="flex items-start">
                            <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Personal expenses</span>
                          </li>
                          <li className="flex items-start">
                            <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Travel insurance</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Itinerary section - Only show if there's itinerary data */}
              {hasItinerary ? (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
                  <div className="space-y-6">
                    {itineraryData.map((item: any, index: number) => (
                      <div key={index} className="border-l-2 border-primary pl-4 pb-2">
                        <h3 className="font-medium text-lg">{item.title || `Stop ${index + 1}`}</h3>
                        <p className="text-muted-foreground mt-1">{item.description}</p>
                        {item.duration && (
                          <p className="text-sm text-muted-foreground mt-2">Duration: {item.duration}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <TourItinerary />
              )}

              {/* Meeting and Pickup section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Meeting and Pickup</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Meeting point</h3>
                      <p className="text-muted-foreground">{meetingPoint}</p>
                    </div>
                  </div>
                  {hasHotelPickup && (
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">Hotel pickup</h3>
                        <p className="text-muted-foreground">
                          {listing.fields.pickupDetails ||
                            "We offer complimentary pickup from all hotels in the main tourist areas. Your confirmation email will include exact pickup times based on your hotel location."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* What to Expect section - Only show component if no highlights data */}
              {hasHighlights ? (
                <div>
                  <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
                  <div className="space-y-4">
                    {highlightsData.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <p>{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
                  <TourHighlights />
                </div>
              )}

              {/* Additional Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                <div className="space-y-2 text-muted-foreground">
                  {listing.fields.additionalInfo ? (
                    Array.isArray(listing.fields.additionalInfo) ? (
                      listing.fields.additionalInfo.map((info: string, index: number) => <p key={index}>• {info}</p>)
                    ) : (
                      <p>• {listing.fields.additionalInfo}</p>
                    )
                  ) : (
                    <>
                      <p>• Please arrive 15 minutes before the scheduled departure time.</p>
                      <p>• Bring comfortable clothing, sunscreen, and a hat.</p>
                      <p>• This experience is suitable for all skill levels.</p>
                      <p>• Not recommended for pregnant travelers or those with back problems.</p>
                      <p>• Children must be accompanied by an adult.</p>
                    </>
                  )}
                  {listing.fields.maxTravelersAllowed && (
                    <p>• Maximum travelers allowed: {listing.fields.maxTravelersAllowed}</p>
                  )}
                  {listing.fields["languages/0"] && <p>• Tour language: {listing.fields["languages/0"]}</p>}
                </div>
              </div>

              {/* Cancellation Policy */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Cancellation Policy</h2>
                <div className="p-4 border rounded-lg">
                  {listing.fields["behaviours/hasFreeCancellation"] ? (
                    <>
                      <p className="font-medium mb-2">Free cancellation up to 24 hours before the experience starts</p>
                      <p className="text-muted-foreground">
                        No refunds for cancellations made less than 24 hours before the start time.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium mb-2">Standard cancellation policy</p>
                      <p className="text-muted-foreground">
                        Cancellations made 48 hours before the experience starts receive a 50% refund. No refunds for
                        cancellations made less than 48 hours before the start time.
                      </p>
                    </>
                  )}
                  {listing.fields["behaviours/hasUnlimitedReschedule"] && (
                    <p className="text-muted-foreground mt-2">This tour offers unlimited rescheduling options.</p>
                  )}
                </div>
              </div>

              {/* Questions section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Questions?</h2>
                <Button variant="outline" className="w-full">
                  Contact the tour provider
                </Button>
              </div>

              {/* Reviews section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <TourReviews rating={rating} reviewCount={reviewCount} />
              </div>
            </div>
          </div>

          {/* Right column - Booking widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="border rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 bg-background">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">
                          {currencySymbol}
                          {price}
                        </span>
                        <span className="text-muted-foreground">per person</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Lowest price guarantee • No booking fees</p>
                  </div>

                  <AvailabilityWidget listingId={friendlyId} price={price} title={listing.fields.title} />

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      <span>Reserve now, pay later</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      <span>Free cancellation up to 24 hours before the experience</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      <span>Secure booking - we use 256-bit SSL encryption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Experiences Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Experiences</h2>
          <SimilarExperiences listings={filteredSimilarListings} />
        </div>
      </div>
    </>
  )
}

