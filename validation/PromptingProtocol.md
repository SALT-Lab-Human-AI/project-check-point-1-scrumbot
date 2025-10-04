# PromptingProtocol.md

Validation protocol for **ScrumBot** using three tools: **ChatGPT 5**, **Claude Sonnet 4.5**, and **Cursor – Gemini 2.5**. Covers typical, edge, and failure cases.

## Tools & Inputs

* **Tools:** ChatGPT 5, Claude Sonnet 4.5, Cursor – Gemini 2.5
* **Transcript:** `sprint_planning_transcript_v1.txt`
* **Team Cards:** `team_cards.csv` (skills, past_stories, capacity, goals)

## Scenarios & Prompts

### T1 — Extract Scrum Artifacts

**Input:** `<transcript>`

**Task:**
* Extract user stories (As a/I want/So that).
* Write acceptance criteria (Given/When/Then).
* List risks & action items.
* Each with supporting quote + timestamp (or "unknown").

**Output:** JSON `{stories:[], acceptance_criteria:[], risks:[], action_items:[]}`

---

### T2 — Owner Assignment

**Inputs:** `<transcript + team_cards>`

**Task:**
* Recommend owner + alternates.
* Justify using skills, past_stories, capacity, goals from team_cards.

**Output:** JSON with `owner_recommendation` and `alternates`.

---

### E1 — Cross-Domain Assignment

**Inputs:** `<transcript + team_cards>`

If non-primary role fits (e.g. frontend with backend exp), consider them.

**Output:** `candidate | pros | cons | final_decision`

---

### E2 — Missing Timestamps

**Input:** `<transcript without timestamps>`

Repeat T1. Use `"timestamp: unknown"` if missing. Do not invent.

---

### F1 — Conflicting Requirements

**Input:** `<transcript with conflicting targets>`

**Task:**
* Mark story as "Needs Clarification"
* Show conflicting quotes + timestamps
* Suggest 2–3 clarifying questions

---

### F2 — Owner Recommendation Without Team Data

**Input:** `<transcript only>`

If insufficient evidence, refuse to guess. Request missing fields (skills, past_stories, capacity, goals).

## Evaluation Rubric

* **Evidence Grounding:** Real quote + timestamp/unknown.
* **Scrum Structure:** Stories (A/I/S), AC (G/W/T).
* **Owner Logic:** Explicit use of skills, history, capacity, goals.
* **Cross-Domain:** Considers non-primary roles with pros/cons.
* **Uncertainty Handling:** Uses "Needs Clarification" where needed.
* **JSON Validity:** Outputs valid JSON when requested.
