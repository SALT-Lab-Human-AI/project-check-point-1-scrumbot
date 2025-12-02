import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { memberNames } = await request.json()

    if (!memberNames || !Array.isArray(memberNames)) {
      return NextResponse.json({ error: "Invalid memberNames" }, { status: 400 })
    }

    const supabase = await createClient()

    // Query all team members to find matches by name
    const membersResult = await supabase.from("team_members").select("*")

    if (membersResult.error) throw membersResult.error

    // Filter members by name (case-insensitive matching)
    const matchedMembers = membersResult.data.filter((member) =>
      memberNames.some((name) => member.name.toLowerCase() === name.toLowerCase())
    )

    if (matchedMembers.length === 0) {
      return NextResponse.json({ teamData: [] })
    }

    const memberIds = matchedMembers.map((m) => m.member_id)

    // Get additional data for matched members
    const [skillsResult, capacityResult, preferencesResult, historyResult] = await Promise.all([
      supabase.from("member_skills").select("*").in("member_id", memberIds),
      supabase.from("member_capacity").select("*").in("member_id", memberIds),
      supabase.from("member_preferences").select("*").in("member_id", memberIds),
      supabase.from("story_history").select("*").in("member_id", memberIds),
    ])

    if (skillsResult.error) throw skillsResult.error
    if (capacityResult.error) throw capacityResult.error
    if (preferencesResult.error) throw preferencesResult.error
    if (historyResult.error) throw historyResult.error

    // Combine the data into a structured format
    const teamData = matchedMembers.map((member) => ({
      ...member,
      skills: skillsResult.data.filter((s) => s.member_id === member.member_id),
      capacity: capacityResult.data.filter((c) => c.member_id === member.member_id),
      preferences: preferencesResult.data.filter((p) => p.member_id === member.member_id),
      history: historyResult.data.filter((h) => h.member_id === member.member_id),
    }))

    return NextResponse.json({ teamData })
  } catch (error) {
    console.error("[v0] Error querying team data by names:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Query failed" }, { status: 500 })
  }
}
