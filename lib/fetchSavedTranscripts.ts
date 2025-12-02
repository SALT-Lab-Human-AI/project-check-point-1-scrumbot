type SavedTranscript = {
  id: string
  filename: string
  segment_count: number
  created_at: string
}

export async function fetchSavedTranscripts(
  setSavedTranscripts: (transcripts: SavedTranscript[]) => void,
  setIsLoadingTranscripts: (loading: boolean) => void,
) {
  try {
    const response = await fetch("/api/transcripts")
    const text = await response.text()

    let data
    try {
      data = JSON.parse(text)
    } catch {
      // Not valid JSON - table likely doesn't exist, just use empty array
      setSavedTranscripts([])
      return
    }

    if (data.transcripts) {
      setSavedTranscripts(data.transcripts)
    } else {
      setSavedTranscripts([])
    }
  } catch {
    setSavedTranscripts([])
  } finally {
    setIsLoadingTranscripts(false)
  }
}
