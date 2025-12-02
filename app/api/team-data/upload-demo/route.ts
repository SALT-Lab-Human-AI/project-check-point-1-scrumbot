import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { parseCSV, csvRowToObject } from "@/lib/csv-parser"
import { getDemoDataForType } from "@/lib/demo-data"

export async function POST(request: NextRequest) {
  try {
    const { type } = await request.json()

    if (!type) {
      return NextResponse.json({ error: "Missing type parameter" }, { status: 400 })
    }

    const content = getDemoDataForType(type)
    if (!content) {
      return NextResponse.json({ error: `Invalid type: ${type}` }, { status: 400 })
    }

    const { headers, rows } = parseCSV(content)

    const supabase = createAdminClient()

    const tableMap: Record<string, string> = {
      team_members: "team_members",
      skills: "member_skills",
      capacity: "member_capacity",
      preferences: "member_preferences",
      history: "story_history",
    }

    const mainTable = tableMap[type] || type

    let rowCount = 0

    try {
      switch (type) {
        case "team_members": {
          // Delete existing data first
          const { error: deleteError } = await supabase.from("team_members").delete().neq("member_id", "")
          if (deleteError) {
            console.log("[v0] Delete error (may be empty table):", deleteError.message)
          }

          const members = rows.map((values) => {
            const obj = csvRowToObject(headers, values)
            return {
              member_id: obj.member_id,
              name: obj.name,
              role: obj.role || null,
              time_zone: obj.time_zone || null,
              seniority: obj.seniority || null,
            }
          })

          const { error } = await supabase.from("team_members").insert(members)
          if (error) throw new Error(`team_members insert: ${error.message}`)
          rowCount = members.length
          break
        }

        case "skills": {
          const skillsSet = new Set<string>()
          const memberSkillsData: Array<{
            member_id: string
            skill: string
            level: number
            last_used: string | null
            evidence_links: string | null
          }> = []

          rows.forEach((values) => {
            const obj = csvRowToObject(headers, values)
            const skill = obj.skill?.trim().toLowerCase()
            if (skill) {
              skillsSet.add(skill)
              memberSkillsData.push({
                member_id: obj.member_id,
                skill: skill,
                level: coerceToInt(obj.level, 5, 0, 10),
                last_used: coerceToDate(obj.last_used),
                evidence_links: obj.evidence_links || null,
              })
            }
          })

          const skillsArray = Array.from(skillsSet).map((skill) => ({ skill }))
          await supabase.from("skills").upsert(skillsArray, { onConflict: "skill" })
          await supabase.from("member_skills").delete().neq("member_id", "")

          const { error } = await supabase.from("member_skills").insert(memberSkillsData)
          if (error) throw new Error(`member_skills insert: ${error.message}`)
          rowCount = memberSkillsData.length
          break
        }

        case "capacity": {
          const sprintsSet = new Set<string>()
          const capacityData: Array<{
            member_id: string
            sprint_id: string
            hours_available: number
          }> = []

          rows.forEach((values) => {
            const obj = csvRowToObject(headers, values)
            const sprintId = obj.sprint_id?.trim()
            if (sprintId) {
              sprintsSet.add(sprintId)
              capacityData.push({
                member_id: obj.member_id,
                sprint_id: sprintId,
                hours_available: coerceToInt(obj.hours_available, 0, 0),
              })
            }
          })

          const sprintsArray = Array.from(sprintsSet).map((sprint_id) => ({ sprint_id }))
          await supabase.from("sprints").upsert(sprintsArray, { onConflict: "sprint_id" })
          await supabase.from("member_capacity").delete().neq("member_id", "")

          const { error } = await supabase.from("member_capacity").insert(capacityData)
          if (error) throw new Error(`member_capacity insert: ${error.message}`)
          rowCount = capacityData.length
          break
        }

        case "preferences": {
          await supabase.from("member_preferences").delete().neq("member_id", "")

          const preferences: Array<{ member_id: string; wants_to_learn: string }> = []

          rows.forEach((values) => {
            const obj = csvRowToObject(headers, values)
            const wantsToLearn = obj.wants_to_learn?.trim()
            if (wantsToLearn) {
              const items = wantsToLearn
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
              items.forEach((item) => {
                preferences.push({
                  member_id: obj.member_id,
                  wants_to_learn: item,
                })
              })
            }
          })

          const { error } = await supabase.from("member_preferences").insert(preferences)
          if (error) throw new Error(`member_preferences insert: ${error.message}`)
          rowCount = preferences.length
          break
        }

        case "history": {
          const storiesSet = new Set<string>()
          const historyData: Array<{
            story_id: string
            member_id: string
            tags: string[]
            outcome: string
            cycle_time_days: number
            quality_notes: string | null
          }> = []

          rows.forEach((values) => {
            const obj = csvRowToObject(headers, values)
            const storyId = obj.story_id?.trim()
            if (storyId) {
              storiesSet.add(storyId)

              const tagsRaw = obj.tags || ""
              const tags = Array.from(
                new Set(
                  tagsRaw
                    .split(",")
                    .map((t) => t.trim().toLowerCase())
                    .filter(Boolean),
                ),
              )

              const outcomeRaw = obj.outcome?.toLowerCase() || "unknown"
              const outcome = ["success", "fail", "partial"].includes(outcomeRaw) ? outcomeRaw : "unknown"

              historyData.push({
                story_id: storyId,
                member_id: obj.member_id,
                tags,
                outcome,
                cycle_time_days: coerceToInt(obj.cycle_time_days, 0, 0),
                quality_notes: obj.quality_notes || null,
              })
            }
          })

          const storiesArray = Array.from(storiesSet).map((story_id) => ({ story_id }))
          await supabase.from("stories").upsert(storiesArray, { onConflict: "story_id" })
          await supabase.from("story_history").delete().neq("story_id", "")

          const { error } = await supabase.from("story_history").insert(historyData)
          if (error) throw new Error(`story_history insert: ${error.message}`)
          rowCount = historyData.length
          break
        }

        default:
          return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 })
      }
    } catch (insertError) {
      const msg = insertError instanceof Error ? insertError.message : String(insertError)
      console.error("[v0] Insert error:", msg)
      return NextResponse.json({ error: msg }, { status: 500 })
    }

    // Log the upload (optional)
    try {
      await supabase.from("csv_upload_metadata").insert({
        file_type: type,
        filename: `demo_${type}.csv`,
        rows_imported: rowCount,
      })
    } catch {
      // Ignore metadata logging errors
    }

    return NextResponse.json({ success: true, rowCount, isDemo: true })
  } catch (error) {
    console.error("[v0] Error uploading demo data:", error)
    const errorMessage = error instanceof Error ? error.message : "Upload failed"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

function coerceToInt(value: string | undefined, defaultValue: number, min?: number, max?: number): number {
  if (!value || value.trim() === "") return defaultValue
  const num = Number.parseInt(value, 10)
  if (Number.isNaN(num)) return defaultValue
  if (min !== undefined && num < min) return min
  if (max !== undefined && num > max) return max
  return num
}

function coerceToDate(value: string | undefined): string | null {
  if (!value || value.trim() === "") return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date.toISOString().split("T")[0]
}
