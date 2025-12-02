"use client"

import { useState, useEffect } from "react"
import { Upload, CheckCircle2, AlertCircle, Database, Table, Play, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { getDemoDataForType } from "@/lib/demo-data"

type CSVType = "team_members" | "skills" | "capacity" | "preferences" | "history"

interface UploadStatus {
  type: CSVType
  status: "pending" | "uploading" | "success" | "error"
  message?: string
  rowCount?: number
  schema?: { headers: string[]; sampleRows: string[][] }
  isDemo?: boolean
}

const CSV_TYPES: { type: CSVType; label: string; description: string }[] = [
  {
    type: "team_members",
    label: "Team Members",
    description: "Basic info: member_id, name, role, time_zone, seniority",
  },
  { type: "skills", label: "Skills", description: "Member skills: member_id, skill, level (1-10), last_used" },
  { type: "capacity", label: "Capacity", description: "Availability: member_id, sprint_id, hours_available" },
  {
    type: "preferences",
    label: "Preferences",
    description: "Learning goals: member_id, wants_to_learn",
  },
  {
    type: "history",
    label: "History",
    description: "Past stories: member_id, story_id, tags, outcome, cycle_time_days, quality_notes",
  },
]

export default function SetupPage() {
  const [uploadStatuses, setUploadStatuses] = useState<Record<CSVType, UploadStatus>>(
    CSV_TYPES.reduce(
      (acc, { type }) => ({
        ...acc,
        [type]: { type, status: "pending" },
      }),
      {} as Record<CSVType, UploadStatus>,
    ),
  )

  const [expandedSchemas, setExpandedSchemas] = useState<Record<CSVType, boolean>>({
    team_members: false,
    skills: false,
    capacity: false,
    preferences: false,
    history: false,
  })

  const [loadingAllDemo, setLoadingAllDemo] = useState(false)
  const [dbSetupNeeded, setDbSetupNeeded] = useState<boolean | null>(null)
  const [checkingDb, setCheckingDb] = useState(true)

  // Check existing data on mount
  useEffect(() => {
    checkDatabaseSetup()
  }, [])

  const checkDatabaseSetup = async () => {
    setCheckingDb(true)
    try {
      const response = await fetch("/api/team-data/status")

      const text = await response.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        console.error("[v0] Failed to parse status response:", text)
        setDbSetupNeeded(true)
        return
      }

      console.log("[v0] Team data status loaded:", JSON.stringify(data))

      // Check if database setup is needed
      if (data.dbSetupNeeded) {
        setDbSetupNeeded(true)
      } else {
        setDbSetupNeeded(false)
      }

      // Update statuses for any already-uploaded data
      setUploadStatuses((prev) => {
        const updated = { ...prev }
        if (data.counts?.team_members > 0) {
          updated.team_members = {
            ...updated.team_members,
            status: "success",
            rowCount: data.counts.team_members,
            message: `${data.counts.team_members} members loaded`,
          }
        }
        if (data.counts?.skills > 0) {
          updated.skills = {
            ...updated.skills,
            status: "success",
            rowCount: data.counts.skills,
            message: `${data.counts.skills} skills loaded`,
          }
        }
        if (data.counts?.capacity > 0) {
          updated.capacity = {
            ...updated.capacity,
            status: "success",
            rowCount: data.counts.capacity,
            message: `${data.counts.capacity} capacity records loaded`,
          }
        }
        if (data.counts?.preferences > 0) {
          updated.preferences = {
            ...updated.preferences,
            status: "success",
            rowCount: data.counts.preferences,
            message: `${data.counts.preferences} preferences loaded`,
          }
        }
        if (data.counts?.history > 0) {
          updated.history = {
            ...updated.history,
            status: "success",
            rowCount: data.counts.history,
            message: `${data.counts.history} history records loaded`,
          }
        }
        return updated
      })
    } catch (error) {
      console.error("[v0] Error checking database setup:", error)
      setDbSetupNeeded(true)
    } finally {
      setCheckingDb(false)
    }
  }

  const getSchemaFromDemoData = (type: CSVType) => {
    const content = getDemoDataForType(type)
    const lines = content.trim().split("\n")
    const headers = lines[0].split(",").map((h) => h.trim())
    const sampleRows = lines.slice(1, 4).map((line) => line.split(",").map((cell) => cell.trim()))
    return { headers, sampleRows }
  }

  const handleFileUpload = async (type: CSVType, file: File) => {
    setUploadStatuses((prev) => ({
      ...prev,
      [type]: { type, status: "uploading" },
    }))

    try {
      const content = await file.text()
      const lines = content.trim().split("\n")
      const headers = lines[0].split(",").map((h) => h.trim())
      const sampleRows = lines.slice(1, 4).map((line) => line.split(",").map((cell) => cell.trim()))

      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)

      const response = await fetch("/api/team-data/upload", {
        method: "POST",
        body: formData,
      })

      const text = await response.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error(text || "Upload failed with invalid response")
      }

      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }

      setUploadStatuses((prev) => ({
        ...prev,
        [type]: {
          type,
          status: "success",
          message: `Successfully imported ${data.rowCount} rows`,
          rowCount: data.rowCount,
          schema: { headers, sampleRows },
          isDemo: false,
        },
      }))

      toast.success(`${CSV_TYPES.find((t) => t.type === type)?.label} uploaded successfully`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Upload failed"
      setUploadStatuses((prev) => ({
        ...prev,
        [type]: {
          type,
          status: "error",
          message: errorMessage,
        },
      }))
      toast.error(errorMessage)
    }
  }

  const handleUseDemoData = async (type: CSVType) => {
    setUploadStatuses((prev) => ({
      ...prev,
      [type]: { type, status: "uploading" },
    }))

    try {
      const response = await fetch("/api/team-data/upload-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      })

      const text = await response.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error(text || "Failed to load demo data - invalid response")
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to load demo data")
      }

      const schema = getSchemaFromDemoData(type)

      setUploadStatuses((prev) => ({
        ...prev,
        [type]: {
          type,
          status: "success",
          message: `Demo data loaded: ${data.rowCount} rows`,
          rowCount: data.rowCount,
          schema,
          isDemo: true,
        },
      }))

      toast.success(`Demo ${CSV_TYPES.find((t) => t.type === type)?.label} loaded successfully`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load demo data"
      console.error("[v0] Error uploading demo data:", errorMessage)
      setUploadStatuses((prev) => ({
        ...prev,
        [type]: {
          type,
          status: "error",
          message: errorMessage,
        },
      }))
      toast.error(errorMessage)
    }
  }

  const handleLoadAllDemoData = async () => {
    setLoadingAllDemo(true)

    for (const { type } of CSV_TYPES) {
      await handleUseDemoData(type)
      // Small delay between uploads to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setLoadingAllDemo(false)
    toast.success("All demo data loaded successfully!")
  }

  const allUploaded = Object.values(uploadStatuses).every((status) => status.status === "success")

  if (checkingDb) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center gap-3 py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Checking database setup...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-balance">Team Data Setup</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Upload your team CSV files once. This data will be used by the AI to make intelligent story assignments.
        </p>
      </div>

      {dbSetupNeeded && (
        <Card className="p-6 rounded-2xl mb-6 border-amber-500/50 bg-amber-500/10">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-lg mb-1">Database Setup Required</p>
              <p className="text-sm text-muted-foreground mb-4">
                The database tables have not been created yet. Please run the SQL setup script first:
              </p>
              <code className="block p-3 bg-background rounded border text-sm mb-4 overflow-x-auto">
                scripts/001_create_team_data_tables.sql
              </code>
              <p className="text-sm text-muted-foreground">
                You can run this script from the Supabase SQL editor or using the v0 script runner.
              </p>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6 rounded-2xl mb-6 border-primary/20 bg-primary/5">
        <div className="flex items-start gap-4">
          <Play className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-lg mb-1">Quick Start with Demo Data</p>
            <p className="text-sm text-muted-foreground mb-4">
              Want to try the app quickly? Load sample team data that works with the demo transcript. This includes 6
              team members with skills, capacity, preferences, and history data.
            </p>
            <Button
              onClick={handleLoadAllDemoData}
              disabled={loadingAllDemo || dbSetupNeeded === true}
              className="gap-2"
            >
              {loadingAllDemo ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading Demo Data...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Load All Demo Data
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 rounded-2xl mb-6">
        <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg mb-6">
          <Database className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">One-Time Setup</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Upload your CSV files below or use demo data for each type. The data will be stored in Supabase and used
              for all future story assignments. You can re-upload files to update the data.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {CSV_TYPES.map(({ type, label, description }) => {
            const status = uploadStatuses[type]
            const isExpanded = expandedSchemas[type]
            return (
              <div key={type} className="border rounded-lg p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Label className="text-base font-semibold">{label}</Label>
                      {status.isDemo && (
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">Demo</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {status.status === "success" && (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    )}
                    {status.status === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}
                  </div>
                </div>

                {status.status === "success" && status.message && (
                  <div className="mb-3 p-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded text-sm text-green-700 dark:text-green-300">
                    {status.message}
                  </div>
                )}

                {status.status === "error" && status.message && (
                  <div className="mb-3 p-2 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
                    {status.message}
                  </div>
                )}

                {status.status === "success" && status.schema && (
                  <div className="mb-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedSchemas((prev) => ({
                          ...prev,
                          [type]: !prev[type],
                        }))
                      }
                      className="text-xs mb-2"
                    >
                      <Table className="h-3 w-3 mr-1" />
                      {isExpanded ? "Hide" : "View"} Schema Preview
                    </Button>

                    {isExpanded && (
                      <div className="border rounded-lg overflow-hidden bg-muted/30">
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="bg-muted">
                                {status.schema.headers.map((header, idx) => (
                                  <th key={idx} className="px-3 py-2 text-left font-semibold border-r last:border-r-0">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {status.schema.sampleRows.map((row, rowIdx) => (
                                <tr key={rowIdx} className="border-t">
                                  {row.map((cell, cellIdx) => (
                                    <td
                                      key={cellIdx}
                                      className="px-3 py-2 border-r last:border-r-0 text-muted-foreground"
                                    >
                                      {cell.length > 30 ? `${cell.substring(0, 30)}...` : cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="px-3 py-2 bg-muted/50 text-xs text-muted-foreground border-t">
                          Showing first 3 rows of {status.rowCount} total rows
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(type, file)
                    }}
                    className="hidden"
                    id={`file-${type}`}
                    disabled={status.status === "uploading" || dbSetupNeeded === true}
                  />
                  <Button
                    asChild
                    variant="outline"
                    disabled={status.status === "uploading" || dbSetupNeeded === true}
                    className="flex-1 bg-transparent"
                  >
                    <label htmlFor={`file-${type}`} className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      {status.status === "uploading"
                        ? "Uploading..."
                        : status.status === "success"
                          ? "Re-upload CSV"
                          : "Upload CSV"}
                    </label>
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={status.status === "uploading" || dbSetupNeeded === true}
                    onClick={() => handleUseDemoData(type)}
                    className="gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Use Demo
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {allUploaded && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 mb-4">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">All data uploaded successfully!</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Your team data is now stored in Supabase and ready to use for AI-powered story assignments.
          </p>
          <Button onClick={() => (window.location.href = "/")} size="lg">
            Go to Dashboard
          </Button>
        </div>
      )}
    </div>
  )
}
