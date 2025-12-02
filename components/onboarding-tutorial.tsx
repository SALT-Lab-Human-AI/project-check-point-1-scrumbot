"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Check, BookOpen, Users, Target, TrendingUp } from "lucide-react"

interface TutorialStep {
  title: string
  description: string
  icon: React.ReactNode
  image?: string
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to ScrumBot! 🎉",
    description: "Your AI-powered sprint planning assistant that converts meeting transcripts into structured user stories and intelligently assigns them to team members.",
    icon: <BookOpen className="h-12 w-12 text-primary" />,
  },
  {
    title: "Upload Your Transcript",
    description: "Drag and drop your meeting transcript (.srt, .vtt, or .txt format) or paste it directly. Our AI will extract user stories in Agile format automatically.",
    icon: <Target className="h-12 w-12 text-primary" />,
  },
  {
    title: "Load Team Data",
    description: "Import your team's skills, capacity, preferences, and history via CSV files. Or use our demo data to see how it works!",
    icon: <Users className="h-12 w-12 text-primary" />,
  },
  {
    title: "AI-Powered Recommendations",
    description: "Our RAG-based AI analyzes each story and recommends the best team member based on their competence, availability, growth potential, and continuity.",
    icon: <TrendingUp className="h-12 w-12 text-primary" />,
  },
]

export function OnboardingTutorial() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Check if user has seen the tutorial
    const hasSeenTutorial = localStorage.getItem("scrumbot_tutorial_completed")
    if (!hasSeenTutorial) {
      setIsOpen(true)
    }
  }, [])

  const handleComplete = () => {
    localStorage.setItem("scrumbot_tutorial_completed", "true")
    setIsOpen(false)
  }

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const step = tutorialSteps[currentStep]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            {step.icon}
            {step.title}
          </DialogTitle>
          <DialogDescription className="text-base pt-4">{step.description}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between pt-6">
          <div className="flex gap-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <Button onClick={handleNext} size="sm">
              {currentStep === tutorialSteps.length - 1 ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="absolute top-4 right-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip tutorial
        </button>
      </DialogContent>
    </Dialog>
  )
}
