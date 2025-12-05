# meeting_dataset_part1

This part contains 20 meeting transcripts (~5 minutes each) in `.vtt` format with gradually increasing timestamps,
featuring speakers: Avery Kim, Riley Chen, Jordan Patel, Samira López, Noah Williams, Priya Singh.

## Structure
- transcripts/meeting_001.vtt ... meeting_020.vtt
- team/: team members, skills, capacity, preferences, history, member_cards.jsonl
- stories/: candidate_stories.jsonl (20 hint records) + jira_export.csv (owners blank)

## Usage
Run your own LLM to parse `.vtt` into structured JSON (stories/actions/owners/etc.).
Use `team/` as RAG knowledge to score suggested owners.
