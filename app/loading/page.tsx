"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { generateStoriesWithSuggestions } from "@/lib/mockRank"
import { ProcessingProgress } from "@/components/processing-progress"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function LoadingPage() {
  const router = useRouter()
  const { transcript, teamKB, weights, setStories, setCurrentStep } = useStore()
  const [progress, setProgress] = useState({ current: 0, total: 0, currentStory: "", startTime: 0 })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!transcript.length || !teamKB) {
      router.push("/")
      return
    }

    const processStories = async () => {
      try {
        const startTime = Date.now()

        // Override the generateStoriesWithSuggestions to report progress
        const originalConsoleLog = console.log
        console.log = (...args: any[]) => {
          const message = args.join(" ")

          // Extract progress from console logs
          if (message.includes("Processing story")) {
            const match = message.match(/(\d+)\/(\d+)/)
            if (match) {
              const current = Number.parseInt(match[1])
              const total = Number.parseInt(match[2])
              setProgress({ current, total, currentStory: "", startTime })
            }
          }

          if (message.includes("Ranking members for story:")) {
            const storyName = message.split("story:")[1]?.trim() || ""
            setProgress((prev) => ({ ...prev, currentStory: storyName }))
          }

          originalConsoleLog(...args)
        }

        const stories = await generateStoriesWithSuggestions(transcript, teamKB, weights)
        console.log = originalConsoleLog

        setStories(stories)
        setCurrentStep("review")
        router.push("/review")
      } catch (err) {
        console.error("[v0] Error generating stories:", err)
        setError(err instanceof Error ? err.message : "Failed to generate stories")
      }
    }

    processStories()
  }, [transcript, teamKB, weights, router, setStories, setCurrentStep])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Card className="p-12 rounded-2xl text-center">
          <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Processing Failed</h2>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button onClick={() => router.push("/")} variant="default">
            Go Back
          </Button>
        </Card>
      </div>
    )
  }

  const estimatedTimeRemaining =
    progress.total > 0 && progress.current > 0
      ? ((Date.now() - progress.startTime) / progress.current) * (progress.total - progress.current)
      : 0

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <ProcessingProgress
        current={progress.current}
        total={progress.total}
        currentStory={progress.currentStory}
        estimatedTimeRemaining={estimatedTimeRemaining}
      />
    </div>
  )
}
