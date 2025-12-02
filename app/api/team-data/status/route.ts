import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = createAdminClient()

    const getCount = async (table: string, column: string) => {
      try {
        const { count, error } = await supabase.from(table).select(column, { count: "exact", head: true })
        if (error) {
          // Table doesn't exist or other error
          console.log(`[v0] Table ${table} query error:`, error.message)
          return { count: 0, exists: !error.message?.includes("does not exist") }
        }
        return { count: count || 0, exists: true }
      } catch {
        return { count: 0, exists: false }
      }
    }

    const [members, skills, capacity, preferences, history] = await Promise.all([
      getCount("team_members", "member_id"),
      getCount("member_skills", "member_id"),
      getCount("member_capacity", "member_id"),
      getCount("member_preferences", "member_id"),
      getCount("story_history", "story_id"),
    ])

    // Check if any table exists
    const tablesExist = members.exists || skills.exists || capacity.exists || preferences.exists || history.exists

    const status = {
      hasData: members.count > 0,
      dbSetupNeeded: !tablesExist,
      counts: {
        team_members: members.count,
        skills: skills.count,
        capacity: capacity.count,
        preferences: preferences.count,
        history: history.count,
      },
    }

    console.log("[v0] Team data status:", JSON.stringify(status))

    return NextResponse.json(status)
  } catch (error) {
    console.error("[v0] Error checking team data status:", error)
    return NextResponse.json({
      hasData: false,
      dbSetupNeeded: true,
      counts: {
        team_members: 0,
        skills: 0,
        capacity: 0,
        preferences: 0,
        history: 0,
      },
      error: error instanceof Error ? error.message : "Failed to check status",
    })
  }
}
