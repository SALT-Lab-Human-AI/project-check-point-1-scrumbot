"use client"

import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface ProcessingProgressProps {
  current: number
  total: number
  currentStory?: string
  estimatedTimeRemaining?: number
}

export function ProcessingProgress({ current, total, currentStory, estimatedTimeRemaining }: ProcessingProgressProps) {
  const percentage = (current / total) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto space-y-4 p-6 bg-card rounded-lg border"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Processing Stories</span>
        <span className="text-muted-foreground">
          {current} / {total}
        </span>
      </div>

      <Progress value={percentage} className="h-2" />

      {currentStory && (
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Current:</p>
          <p className="text-sm font-medium truncate">{currentStory}</p>
        </div>
      )}

      {estimatedTimeRemaining && estimatedTimeRemaining > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          Estimated time remaining: {Math.ceil(estimatedTimeRemaining / 1000)}s
        </p>
      )}

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <div className="flex gap-1">
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <span>AI is analyzing...</span>
      </div>
    </motion.div>
  )
}
