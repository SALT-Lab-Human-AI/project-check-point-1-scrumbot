import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    let data = null
    let queryError = null

    try {
      const result = await supabase
        .from("transcripts")
        .select("id, filename, segment_count, created_at")
        .order("created_at", { ascending: false })
        .limit(50)

      data = result.data
      queryError = result.error
    } catch (e) {
      // Query itself threw - table likely doesn't exist
      return NextResponse.json({ transcripts: [], dbSetupNeeded: true })
    }

    if (queryError) {
      // Check if it's a "relation does not exist" error
      if (queryError.message?.includes("does not exist") || queryError.code === "42P01") {
        return NextResponse.json({ transcripts: [], dbSetupNeeded: true })
      }
      // Return empty for any other error
      return NextResponse.json({ transcripts: [], error: queryError.message })
    }

    return NextResponse.json({ transcripts: data || [] })
  } catch (error) {
    return NextResponse.json({ transcripts: [], error: "Database not available" })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { filename, content, parsedSegments } = body

    if (!filename || !content) {
      return NextResponse.json({ error: "Filename and content are required" }, { status: 400 })
    }

    const supabase = await createClient()

    let data = null
    let queryError = null

    try {
      const result = await supabase
        .from("transcripts")
        .insert({
          filename,
          content,
          parsed_segments: parsedSegments,
          segment_count: parsedSegments?.length || 0,
        })
        .select()
        .single()

      data = result.data
      queryError = result.error
    } catch (e) {
      return NextResponse.json(
        { error: "Database tables not set up. Please run the SQL script first.", dbSetupNeeded: true },
        { status: 500 },
      )
    }

    if (queryError) {
      if (queryError.message?.includes("does not exist") || queryError.code === "42P01") {
        return NextResponse.json(
          { error: "Database tables not set up. Please run the SQL script first.", dbSetupNeeded: true },
          { status: 500 },
        )
      }
      return NextResponse.json({ error: queryError.message }, { status: 500 })
    }

    return NextResponse.json({ transcript: data })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save transcript" }, { status: 500 })
  }
}
