"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, Calendar, AlertCircle } from "lucide-react"
import type { StoryWithSuggestions } from "@/types"

interface StoryDependenciesProps {
  stories: StoryWithSuggestions[]
}

export function StoryDependencies({ stories }: StoryDependenciesProps) {
  const [open, setOpen] = useState(false)

  // Simple dependency detection based on labels and risks
  const detectDependencies = () => {
    const dependencies: Array<{ from: string; to: string; reason: string }> = []

    stories.forEach((story, i) => {
      stories.forEach((otherStory, j) => {
        if (i === j) return

        // Check if story mentions another story in risks or action items
        const storyText = `${story.risks.join(" ")} ${story.actionItems.join(" ")}`.toLowerCase()
        const otherStoryKey = otherStory.iWant.slice(0, 20).toLowerCase()

        if (storyText.includes(otherStoryKey) || storyText.includes("depends") || storyText.includes("requires")) {
          dependencies.push({
            from: story.id,
            to: otherStory.id,
            reason: "Mentioned in risks or requirements",
          })
        }

        // Check for shared labels indicating sequential work
        const sharedLabels = story.labels.filter((label) => otherStory.labels.includes(label))
        if (sharedLabels.length > 0 && story.estimate > otherStory.estimate) {
          dependencies.push({
            from: otherStory.id,
            to: story.id,
            reason: `Shared ${sharedLabels.join(", ")} - simpler first`,
          })
        }
      })
    })

    return dependencies
  }

  const dependencies = detectDependencies()

  // Calculate critical path (stories that block others)
  const criticalStories = stories.filter((story) => {
    const blocksOthers = dependencies.filter((d) => d.from === story.id).length
    return blocksOthers > 0
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Network className="h-4 w-4" />
          View Dependencies
          {dependencies.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {dependencies.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Story Dependencies & Timeline
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Critical Path */}
          {criticalStories.length > 0 && (
            <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Critical Path</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                    These stories block other work and should be prioritized:
                  </p>
                  <div className="space-y-2">
                    {criticalStories.map((story) => (
                      <div key={story.id} className="text-sm bg-background p-2 rounded border">
                        <p className="font-medium">{story.iWant}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Blocks {dependencies.filter((d) => d.from === story.id).length} other{" "}
                          {dependencies.filter((d) => d.from === story.id).length === 1 ? "story" : "stories"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Dependency Graph */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Network className="h-4 w-4" />
              Dependency Graph
            </h3>
            {dependencies.length > 0 ? (
              <div className="space-y-2">
                {dependencies.map((dep, idx) => {
                  const fromStory = stories.find((s) => s.id === dep.from)
                  const toStory = stories.find((s) => s.id === dep.to)

                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1 text-sm">
                        <p className="font-medium text-primary">{fromStory?.iWant.slice(0, 40)}...</p>
                      </div>
                      <div className="text-xs text-muted-foreground px-2">→</div>
                      <div className="flex-1 text-sm">
                        <p className="font-medium">{toStory?.iWant.slice(0, 40)}...</p>
                      </div>
                      <Badge variant="secondary" className="text-xs whitespace-nowrap">
                        {dep.reason}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No dependencies detected. All stories can be worked on independently.
              </p>
            )}
          </div>

          {/* Simple Gantt Chart */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timeline View
            </h3>
            <div className="space-y-2">
              {stories.map((story, idx) => {
                const startDay = idx * 2 // Simplified: each story starts 2 days after previous
                const duration = Math.ceil(story.estimate / 4) // Simplified: 1 day = 4 story points

                return (
                  <div key={story.id} className="flex items-center gap-3">
                    <div className="w-48 text-sm truncate flex-shrink-0">{story.iWant.slice(0, 30)}...</div>
                    <div className="flex-1 h-8 bg-muted rounded relative overflow-hidden">
                      <div
                        className="absolute h-full bg-primary/20 border border-primary rounded"
                        style={{
                          left: `${(startDay / 14) * 100}%`,
                          width: `${(duration / 14) * 100}%`,
                        }}
                      >
                        <span className="text-xs px-2 leading-8 text-primary font-medium">{story.estimate} pts</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground w-20 flex-shrink-0">
                      Day {startDay}-{startDay + duration}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-3 px-48">
              <span>Day 0</span>
              <span>Day 7</span>
              <span>Day 14</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
