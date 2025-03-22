import { ImageResponse } from "next/og"
import { getListingById } from "@/lib/airtable"

export const runtime = "edge"
export const alt = "Red Sea Quest - Marine Tour Details"
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image({ params }: { params: { id: string } }) {
  try {
    const listing = await getListingById(params.id)

    if (!listing) {
      return new ImageResponse(
        <div
          style={{
            display: "flex",
            fontSize: 60,
            color: "white",
            background: "linear-gradient(to bottom, #0ea5e9, #0c4a6e)",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 40,
          }}
        >
          <div style={{ fontSize: 80, fontWeight: "bold", marginBottom: 20 }}>Red Sea Quest</div>
          <div>Marine Tours & Experiences</div>
        </div>,
        { ...size },
      )
    }

    const imageUrl = listing.fields.Photos?.[0]?.url || ""

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "white",
          background: "#000",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            padding: 50,
          }}
        >
          <div style={{ fontSize: 60, fontWeight: "bold", marginBottom: 10 }}>{listing.fields.Title}</div>
          <div style={{ fontSize: 30, opacity: 0.8 }}>
            {listing.fields.Destination?.[0] || "Red Sea"} • ${listing.fields.Price} per person
          </div>
          <div style={{ fontSize: 24, marginTop: 20 }}>Red Sea Quest • Marine Tours & Experiences</div>
        </div>
      </div>,
      { ...size },
    )
  } catch (error) {
    console.error("Error generating OpenGraph image:", error)

    // Fallback image
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          fontSize: 60,
          color: "white",
          background: "linear-gradient(to bottom, #0ea5e9, #0c4a6e)",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 40,
        }}
      >
        <div style={{ fontSize: 80, fontWeight: "bold", marginBottom: 20 }}>Red Sea Quest</div>
        <div>Marine Tours & Experiences</div>
      </div>,
      { ...size },
    )
  }
}

