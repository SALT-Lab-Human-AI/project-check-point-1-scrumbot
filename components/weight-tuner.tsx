"use client"

import { useStore } from "@/lib/store"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, Brain, Clock, TrendingUp, Repeat } from "lucide-react"

export function WeightTuner() {
  const { weights, setWeights } = useStore()

  const total = weights.alpha + weights.beta + weights.gamma + weights.delta

  const updateWeight = (key: keyof typeof weights, value: number) => {
    setWeights({ ...weights, [key]: value })
  }

  const weightInfo = [
    {
      key: "alpha" as const,
      label: "α Competence",
      icon: <Brain className="h-4 w-4" />,
      description: "How well the team member's skills and experience match the story requirements",
      example: "Higher = Prefer team members with exact skill matches and relevant experience",
    },
    {
      key: "beta" as const,
      label: "β Availability",
      icon: <Clock className="h-4 w-4" />,
      description: "How much capacity the team member has available in their schedule",
      example: "Higher = Prefer team members with more free time and lower workload",
    },
    {
      key: "gamma" as const,
      label: "γ Growth Potential",
      icon: <TrendingUp className="h-4 w-4" />,
      description: "How well the story aligns with what the team member wants to learn",
      example: "Higher = Prefer assignments that match learning goals and development opportunities",
    },
    {
      key: "delta" as const,
      label: "δ Continuity",
      icon: <Repeat className="h-4 w-4" />,
      description: "How similar this story is to work the team member recently completed successfully",
      example: "Higher = Prefer team members who've done similar work recently",
    },
  ]

  return (
    <Card className="p-6 rounded-2xl">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Ranking Weights</h3>
          <p className="text-sm text-muted-foreground">Adjust how much each factor influences owner suggestions</p>
        </div>

        <TooltipProvider>
          <div className="space-y-4">
            {weightInfo.map(({ key, label, icon, description, example }) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={key} className="text-sm font-medium flex items-center gap-2">
                      {icon}
                      {label}
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <HelpCircle className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <div className="space-y-2">
                          <p className="font-semibold text-sm">{description}</p>
                          <p className="text-xs text-muted-foreground">{example}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">{weights[key].toFixed(2)}</span>
                </div>
                <Slider
                  id={key}
                  min={0}
                  max={1}
                  step={0.05}
                  value={[weights[key]]}
                  onValueChange={([value]) => updateWeight(key, value)}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </TooltipProvider>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Total Weight</span>
            <span className={total > 1.1 || total < 0.9 ? "text-destructive font-semibold" : "text-foreground"}>
              {total.toFixed(2)}
            </span>
          </div>
          {(total > 1.1 || total < 0.9) && (
            <p className="text-xs text-destructive mt-1">⚠️ Weights should sum to approximately 1.0</p>
          )}
        </div>
      </div>
    </Card>
  )
}
