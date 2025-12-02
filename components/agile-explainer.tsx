"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, Users, FileText, Target, Calendar, TrendingUp } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AgileExplainer() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          What is Agile?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Agile & Scrum Concepts</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="agile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="agile">Agile</TabsTrigger>
            <TabsTrigger value="scrum">Scrum</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="sprints">Sprints</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] mt-4">
            <TabsContent value="agile" className="space-y-4">
              <div className="flex items-start gap-3">
                <Target className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">What is Agile?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Agile is a project management methodology focused on delivering work in small, iterative cycles
                    rather than all at once. It emphasizes flexibility, collaboration, and customer feedback.
                  </p>
                  <div className="bg-muted p-3 rounded-lg text-sm">
                    <strong>Key Principles:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                      <li>Deliver working software frequently</li>
                      <li>Welcome changing requirements</li>
                      <li>Collaborate with customers daily</li>
                      <li>Build projects around motivated individuals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="scrum" className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">What is Scrum?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Scrum is a framework within Agile that structures work into fixed-length iterations called Sprints.
                    Teams work together to deliver potentially shippable increments of work.
                  </p>
                  <div className="bg-muted p-3 rounded-lg text-sm space-y-3">
                    <div>
                      <strong>Sprint Planning:</strong>
                      <p className="text-muted-foreground mt-1">
                        Team meets to decide what work will be done in the upcoming sprint
                      </p>
                    </div>
                    <div>
                      <strong>Daily Standup:</strong>
                      <p className="text-muted-foreground mt-1">
                        Quick 15-minute sync where team shares progress and blockers
                      </p>
                    </div>
                    <div>
                      <strong>Sprint Review:</strong>
                      <p className="text-muted-foreground mt-1">Team demonstrates completed work to stakeholders</p>
                    </div>
                    <div>
                      <strong>Retrospective:</strong>
                      <p className="text-muted-foreground mt-1">Team reflects on what went well and what to improve</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stories" className="space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">What are User Stories?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    User stories are short, simple descriptions of a feature told from the perspective of the person who
                    desires the capability.
                  </p>
                  <div className="bg-muted p-3 rounded-lg text-sm space-y-3">
                    <div>
                      <strong className="text-primary">Format:</strong>
                      <p className="mt-2 font-mono text-xs bg-background p-2 rounded">
                        As a [type of user],
                        <br />I want [an action],
                        <br />
                        So that [a benefit/value]
                      </p>
                    </div>
                    <div>
                      <strong className="text-primary">Example:</strong>
                      <div className="mt-2 bg-background p-3 rounded space-y-1">
                        <p className="text-xs">
                          <strong>As a</strong> customer
                        </p>
                        <p className="text-xs">
                          <strong>I want</strong> to view my order history
                        </p>
                        <p className="text-xs">
                          <strong>So that</strong> I can track my past purchases
                        </p>
                      </div>
                    </div>
                    <div>
                      <strong>Story Points:</strong>
                      <p className="text-muted-foreground mt-1">
                        Fibonacci numbers (1, 2, 3, 5, 8, 13, 21) representing complexity and effort, not time
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sprints" className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">What are Sprints?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    A Sprint is a fixed time period (usually 1-4 weeks) during which a team completes a set amount of
                    work. At the end, the team should have working, potentially shippable software.
                  </p>
                  <div className="bg-muted p-3 rounded-lg text-sm space-y-3">
                    <div>
                      <strong>Sprint Duration:</strong>
                      <p className="text-muted-foreground mt-1">Typically 2 weeks, but can be 1-4 weeks</p>
                    </div>
                    <div>
                      <strong>Sprint Goal:</strong>
                      <p className="text-muted-foreground mt-1">
                        A clear objective that guides what the team builds during the sprint
                      </p>
                    </div>
                    <div>
                      <strong>Velocity:</strong>
                      <p className="text-muted-foreground mt-1">
                        The average amount of work a team completes in a sprint, measured in story points
                      </p>
                    </div>
                    <div>
                      <strong className="text-primary">Example:</strong>
                      <div className="mt-2 bg-background p-2 rounded text-xs space-y-1">
                        <p>Sprint 12 (Oct 1-14): Build user dashboard</p>
                        <p className="text-muted-foreground">Planned: 45 points | Completed: 42 points</p>
                        <p className="text-muted-foreground">Team Velocity: ~43 points/sprint</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Scrum Roles</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Scrum defines three key roles, each with specific responsibilities:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-muted p-3 rounded-lg text-sm">
                      <strong className="text-primary">Product Owner</strong>
                      <p className="text-muted-foreground mt-1">
                        Defines features, prioritizes work, and ensures the team builds the right thing. Represents
                        stakeholders and customers.
                      </p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg text-sm">
                      <strong className="text-primary">Scrum Master</strong>
                      <p className="text-muted-foreground mt-1">
                        Facilitates the Scrum process, removes blockers, and helps the team follow Agile principles.
                        Not a manager, but a servant-leader.
                      </p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg text-sm">
                      <strong className="text-primary">Development Team</strong>
                      <p className="text-muted-foreground mt-1">
                        Cross-functional professionals who do the actual work of building the product. Self-organizing
                        and collectively responsible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
