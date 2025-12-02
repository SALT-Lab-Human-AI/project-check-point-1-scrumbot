import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"
import { z } from "zod"
import type { Member, Suggestion } from "@/types"
import { createClient } from "@/lib/supabase/server"

const groq = createGroq({
  apiKey: process.env.API_KEY_GROQ_API_KEY || process.env.GROQ_API_KEY,
})

const RankingSchema = z.object({
  requiredSkills: z.array(z.string()).describe("Skills identified from the story that are needed"),
  rankings: z.array(
    z.object({
      memberId: z.string(),
      competence: z.number().min(0).max(100),
      availability: z.number().min(0).max(100),
      growthPotential: z.number().min(0).max(100),
      continuity: z.number().min(0).max(100),
      justification: z.array(z.string()).max(5),
    }),
  ),
})

interface EnrichedMemberData {
  skills: Array<{ skill: string; level: number; lastUsed: string; evidence: string }>
  capacity: { available: number; total: number; utilizationRate: number }
  learningGoals: string[]
  history: {
    totalStories: number
    successCount: number
    relevantStories: Array<{ tags: string; outcome: string; cycleTime: number }>
  }
  preferences: {
    wantsToLearn: string[]
    prefersNot: string[]
  }
}

async function enrichMemberData(members: Member[], supabase: any): Promise<Map<string, EnrichedMemberData>> {
  const enrichedData = new Map<string, EnrichedMemberData>()

  try {
    console.log("[v0] Starting comprehensive team data enrichment...")

    const { data: allMembers, error: membersError } = await supabase
      .from("team_members")
      .select("member_id, name, role, seniority")

    if (membersError) {
      console.error("[v0] Error fetching team members:", membersError)
      return enrichedData
    }

    const nameToIdMap = new Map<string, string>()
    members.forEach((m: Member) => {
      const dbMember = allMembers?.find((dbm) => dbm.name.toLowerCase() === m.name.toLowerCase())
      if (dbMember) {
        nameToIdMap.set(m.id, dbMember.member_id)
      }
    })

    if (nameToIdMap.size === 0) {
      console.log("[v0] No matching members found in database")
      return enrichedData
    }

    const dbMemberIds = Array.from(nameToIdMap.values())

    const [skillsResult, capacityResult, preferencesResult, historyResult] = await Promise.all([
      supabase.from("member_skills").select("*").in("member_id", dbMemberIds),
      supabase.from("member_capacity").select("*").in("member_id", dbMemberIds),
      supabase.from("member_preferences").select("*").in("member_id", dbMemberIds),
      supabase.from("story_history").select("*").in("member_id", dbMemberIds),
    ])

    console.log("[v0] Raw data fetched:", {
      skills: skillsResult.data?.length || 0,
      capacity: capacityResult.data?.length || 0,
      preferences: preferencesResult.data?.length || 0,
      history: historyResult.data?.length || 0,
    })

    members.forEach((m: Member) => {
      const dbMemberId = nameToIdMap.get(m.id)
      if (!dbMemberId) return

      const memberSkills =
        skillsResult.data
          ?.filter((s) => s.member_id === dbMemberId)
          .map((s) => ({
            skill: s.skill,
            level: s.level,
            lastUsed: s.last_used || "unknown",
            evidence: s.evidence_links || "",
          }))
          .sort((a, b) => b.level - a.level) || []

      const memberCapacity = capacityResult.data?.find((c) => c.member_id === dbMemberId)
      const totalHours = memberCapacity?.hours_available || m.capacity.hoursPerSprint
      const currentLoad = m.capacity.currentLoad || 0
      const available = totalHours - currentLoad
      const utilizationRate = totalHours > 0 ? (currentLoad / totalHours) * 100 : 0

      const memberPrefs = preferencesResult.data?.filter((p) => p.member_id === dbMemberId) || []
      const learningGoals = memberPrefs.map((p) => p.wants_to_learn).filter(Boolean)

      const memberHistory = historyResult.data?.filter((h) => h.member_id === dbMemberId) || []
      const successCount = memberHistory.filter((h) => h.outcome === "success").length
      const relevantStories = memberHistory
        .map((h) => ({
          tags: h.tags || "",
          outcome: h.outcome || "unknown",
          cycleTime: h.cycle_time_days || 0,
        }))
        .filter((s) => s.tags)

      enrichedData.set(m.id, {
        skills: memberSkills,
        capacity: {
          available,
          total: totalHours,
          utilizationRate: Math.round(utilizationRate),
        },
        learningGoals,
        history: {
          totalStories: memberHistory.length,
          successCount,
          relevantStories,
        },
        preferences: {
          wantsToLearn: learningGoals,
          prefersNot: m.preferences?.prefers_not || [],
        },
      })
    })

    console.log(`[v0] ✅ Enriched data for ${enrichedData.size} members`)
  } catch (error) {
    console.error("[v0] Error enriching member data:", error)
  }

  return enrichedData
}

function buildMemberContext(member: Member, enrichedData?: EnrichedMemberData): string {
  const parts: string[] = []

  parts.push(`${member.name} (${member.role}, ${member.timezone})`)

  if (enrichedData) {
    if (enrichedData.skills.length > 0) {
      const skillsList = enrichedData.skills
        .slice(0, 5)
        .map((s) => {
          const recency = s.lastUsed ? ` (used ${s.lastUsed})` : ""
          return `${s.skill}=${s.level}/5${recency}`
        })
        .join(", ")
      parts.push(`Skills: ${skillsList}`)
    }

    parts.push(
      `Capacity: ${enrichedData.capacity.available}h available of ${enrichedData.capacity.total}h total (${enrichedData.capacity.utilizationRate}% utilized)`,
    )

    if (enrichedData.learningGoals.length > 0) {
      parts.push(`Wants to learn: ${enrichedData.learningGoals.slice(0, 3).join(", ")}`)
    }

    if (enrichedData.history.totalStories > 0) {
      const successRate = Math.round((enrichedData.history.successCount / enrichedData.history.totalStories) * 100)
      parts.push(
        `Track record: ${enrichedData.history.successCount}/${enrichedData.history.totalStories} successful (${successRate}%)`,
      )

      if (enrichedData.history.relevantStories.length > 0) {
        const recentWork = enrichedData.history.relevantStories
          .slice(0, 3)
          .map((s) => `${s.tags}(${s.outcome})`)
          .join(", ")
        parts.push(`Recent work: ${recentWork}`)
      }
    }

    if (enrichedData.preferences.prefersNot.length > 0) {
      parts.push(`Prefers not: ${enrichedData.preferences.prefersNot.join(", ")}`)
    }
  } else {
    if (member.skills.length > 0) {
      const skillsList = member.skills
        .slice(0, 5)
        .map((s) => `${s.name}=${s.level}/5`)
        .join(", ")
      parts.push(`Skills: ${skillsList}`)
    }
    const available = member.capacity.hoursPerSprint - member.capacity.currentLoad
    parts.push(`Capacity: ${available}h available of ${member.capacity.hoursPerSprint}h total`)
  }

  return parts.join("\n")
}

export async function POST(request: NextRequest) {
  try {
    const { story, members, weights } = await request.json()

    if (!story || !members || !weights) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    if (!Array.isArray(members) || members.length === 0) {
      return NextResponse.json({ error: "Invalid or empty members array" }, { status: 400 })
    }

    console.log(`[v0] 🎯 RAG-based ranking for story: ${story.iWant.substring(0, 50)}...`)
    console.log(`[v0] Story estimate: ${story.estimate}, Labels: ${story.labels?.join(", ") || "none"}`)

    const supabase = await createClient()
    const enrichedData = await enrichMemberData(members, supabase)
    const csvDataUsed = enrichedData.size > 0

    console.log(`[v0] Using ${csvDataUsed ? "enriched CSV" : "basic"} data for ${members.length} members`)

    const memberContexts = members
      .map((m: Member) => {
        const enriched = enrichedData.get(m.id)
        return `### ${m.id}\n${buildMemberContext(m, enriched)}`
      })
      .join("\n\n")

    const storyContext = `
Story: ${story.iWant}
Expected effort: ${story.estimate} story points
Labels: ${story.labels?.join(", ") || "none"}
Action items: ${story.actionItems?.slice(0, 3).join("; ") || "none"}
Risks: ${story.risks?.slice(0, 2).join("; ") || "none"}
`.trim()

    try {
      const { text } = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        prompt: `You are an expert Scrum Master making optimal story assignments based on RAG (Retrieval-Augmented Generation) analysis.

STORY TO ASSIGN:
${storyContext}

TEAM MEMBERS (with complete context from knowledge base):
${memberContexts}

TASK:
1. First, identify the key skills and experience needed for this story
2. Rank each team member on four dimensions (0-100 scale):
   - COMPETENCE: How well their skills, experience, and past work match the story requirements
   - AVAILABILITY: How much capacity they have (higher score = more available)
   - GROWTH POTENTIAL: How well this story aligns with their learning goals
   - CONTINUITY: How similar this is to their recent successful work

3. Provide 3-5 concise justifications per member explaining your scores

SCORING GUIDELINES:
- Competence: Consider skill levels, recency of use, and relevant past work
- Availability: Higher scores for lower utilization rates and more available hours
- Growth Potential: Match story requirements with learning goals, but balance with competence
- Continuity: Reward similar recent work, especially if it was successful

${csvDataUsed ? "NOTE: You have access to comprehensive CSV data including skills, capacity, preferences, and detailed history." : "NOTE: Working with basic team data only."}

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{
  "requiredSkills": ["skill1", "skill2"],
  "rankings": [
    {
      "memberId": "member-1",
      "competence": 85,
      "availability": 90,
      "growthPotential": 70,
      "continuity": 80,
      "justification": ["reason 1", "reason 2", "reason 3"]
    }
  ]
}`,
        temperature: 0.3,
        maxTokens: 1500,
      })

      // Parse JSON response
      let parsedResponse
      try {
        const cleanedText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
        parsedResponse = JSON.parse(cleanedText)
      } catch (parseError) {
        console.error("[v0] ❌ Failed to parse AI response:", text.substring(0, 500))
        throw new Error("AI returned invalid JSON")
      }

      const { requiredSkills, rankings } = parsedResponse

      console.log(
        `[v0] ✅ AI identified ${requiredSkills?.length || 0} required skills: ${requiredSkills?.join(", ") || "none"}`,
      )
      console.log(`[v0] ✅ Generated rankings for ${rankings?.length || 0} members`)

      const suggestions: Suggestion[] = (rankings || [])
        .map((ranking: any) => {
          const member = members.find((m: Member) => m.id === ranking.memberId)
          if (!member) {
            console.warn(`[v0] ⚠️ Member ${ranking.memberId} not found`)
            return null
          }

          const score =
            weights.alpha * ranking.competence +
            weights.beta * ranking.availability +
            weights.gamma * ranking.growthPotential +
            weights.delta * ranking.continuity

          return {
            memberId: member.id,
            name: member.name,
            role: member.role,
            timezone: member.timezone,
            score: Math.round(score * 10) / 10,
            breakdown: {
              competence: Math.round(ranking.competence * 10) / 10,
              availability: Math.round(ranking.availability * 10) / 10,
              growthPotential: Math.round(ranking.growthPotential * 10) / 10,
              continuity: Math.round(ranking.continuity * 10) / 10,
            },
            justification: ranking.justification,
          }
        })
        .filter((s): s is Suggestion => s !== null)
        .sort((a, b) => b.score - a.score)

      console.log(
        `[v0] 🏆 Top recommendation: ${suggestions[0]?.name} (${suggestions[0]?.score}%) - ${suggestions[0]?.justification[0]}`,
      )

      return NextResponse.json({
        suggestions,
        metadata: {
          requiredSkills: requiredSkills || [],
          csvDataUsed,
          membersEvaluated: suggestions.length,
        },
      })
    } catch (aiError) {
      console.error("[v0] ❌ AI generation error:", aiError)

      // Fallback: Return empty suggestions with error info
      return NextResponse.json(
        {
          error: "AI ranking failed",
          details: aiError instanceof Error ? aiError.message : "Unknown AI error",
          suggestions: [],
          metadata: {
            requiredSkills: [],
            csvDataUsed,
            membersEvaluated: 0,
          },
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[v0] ❌ Error in rank-owners API:", error)
    console.error("[v0] Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })

    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const isRateLimit = errorMessage.includes("429") || errorMessage.includes("rate_limit")

    if (isRateLimit) {
      return NextResponse.json(
        {
          error: "Groq API rate limit exceeded",
          details: "Please wait 30 seconds and try again",
          isRateLimit: true,
          retryAfter: 30,
        },
        { status: 429 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to rank owners",
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}
