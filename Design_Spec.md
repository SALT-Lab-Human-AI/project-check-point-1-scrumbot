
## 1) Product Summary
ScrumBot turns a meeting transcript (.srt/.vtt/.txt) into structured user stories and suggests owners using team knowledge (skills, capacity, history, preferences). Users review, edit, and lock the sprint; export a Jira‑compatible CSV.

**Primary users**
- **Product Owner / Scrum Master (PO/SM):** uploads transcript, tunes weights, reviews & locks sprint.
- **Tech Lead / Engineer:** validates owner suggestions, edits details, checks capacity.

**Key value**
- Faster story drafting with evidence
- Transparent, balanced assignments (competence + availability + growth + continuity)

---

## 2) Top User Journeys

### J1 — Upload → Process → Review
1. PO lands on **Landing** page.
2. Pastes or uploads transcript (.srt/.vtt/.txt). 
3. Tunes weights (α, β, γ, δ).
4. Clicks **Process** → sees **Loading** stage with 4 steps → navigates to **Review** with stories populated.

### J2 — Human‑in‑the‑Loop (HITL) Editing
1. On **Review**, each story card shows: As a / I want / So that, risks, actions, labels, evidence, estimate, due date.
2. User edits fields inline; suggestions panel shows ranked owners with score breakdown.
3. User **selects** a suggested owner or **overrides** via dropdown.

### J3 — Re‑rank & Capacity Check
1. User adjusts weights; clicks **Re‑rank**.
2. Suggestions refresh; capacity sidebar visualizes per‑member load vs sprint capacity.
3. Warnings appear for over‑allocation; user reassigns as needed.

### J4 — Lock & Export
1. User proceeds to **Sprint Lock**.
2. Reviews final assignments + capacity summary; unresolved “needs‑clarification” chips highlighted.
3. Clicks **Confirm & Export CSV** → downloads Jira‑compatible CSV and sees success toast.

---

## 3) Task Flows (Concise)

### TF‑1: Transcript Intake
- Input: .srt/.vtt with timestamps & (optional) speakers; or plain .txt.
- Validate extension → parse → count segments → enable **Process**.
- Errors: invalid format → inline error + link to sample format; allow paste fallback.

### TF‑2: Mock Processing (front‑end)
- **Loading** shows staged steps: Parsing → Extracting stories → Retrieving candidates → Scoring owners.
- After timeouts, generate demo stories + suggestions and route to **Review**.

### TF‑3: HITL Story Editing
- Edit fields inline; chips show **needs‑clarification** (owner/date/details).
- Tabs: Risks / Actions / Labels / Evidence.
- Owner panel: ranked list with **Choose** button + **Override** select.
- Global actions: **Re‑rank**, **Export CSV**, **Proceed →**.

### TF‑4: Re‑ranking
- Compute score = α·competence + β·availability + γ·growth + δ·continuity (mock front‑end).
- Update ownerAlternates + ownerSuggested; toast “Suggestions updated”.

### TF‑5: Sprint Lock & Export
- Summaries table (title, assignee, labels, estimate, due date, flags).
- Capacity card: per‑member assigned vs capacity; warnings if over.
- **Confirm & Export CSV** → download and toast.

---

## 4) Information Architecture
- **/** Landing (upload/paste transcript, weights, KB upload, demo data).
- **/loading** Processing animation (no edits).
- **/review** HITL editor + suggestions + capacity.
- **/lock** Final review + export.

Global: TopNav (brand **ScrumBot**, Sprint ID input), StepIndicator.

---

## 5) Key Screens & Interactions

### A) Landing
**Purpose:** Intake transcript; set initial weights; optional KB upload.
- Components: Transcript Textarea + File Input, Parsed count, Weight Tuner (α,β,γ,δ sliders 0..1 with sum), Demo buttons.

### B) Loading
**Purpose:** Communicate progress & avoid perceived wait.
- 4 steps with checkmarks; framer‑motion for entrance.
- Auto‑advance to **Review**.

### C) Review (HITL)
**Purpose:** Edit stories and assign owners.
- Story Card: title, As a / I want / So that; tabs (Risks, Actions, Labels, Evidence); Estimate (#), Due date.
- Evidence list: `[HH:MM:SS] Speaker: quote` (max 5 visible; scrollable).
- Suggestions panel: rows with name/role/tz, score%, breakdown (C/A/G/D), justification bullets, **Choose**.
- **Override** select to pick any member; clears “owner” clarification.
- Right rail: Weight Tuner; Workload Summary (CapacityBar per member).
- Global actions: **Re‑rank**, **Export CSV**, **Proceed → Sprint Lock**.
- States: no labels → hint to add; no capacity → amber warning; ties → show equal scores.

### D) Sprint Lock
**Purpose:** Final confirmation & export.
- Table: Title, Assignee, Labels, Estimate, Due date, flags.
- Capacity card: assigned vs capacity; warnings.
- CTAs: **Back**, **Confirm & Export CSV** (modal → download → success toast).

---

## 6) Interaction Details (micro)
- **Weights**: sliders 0..1; sum helper text (tip to keep ~2 total). Re‑rank is explicit (no auto while dragging).
- **Inline chips**: `needs‑clarification` for owner/date/details.
- **CapacityBar**: green ≤ capacity; amber > capacity.
- **Keyboard**: Cmd/Ctrl+S save; `R` = Re‑rank.
- **Toasts**: CSV exported; Suggestions updated; Sprint locked.

---


Minimal types (strict):
- `TranscriptSegment { start:number; end?:number; speaker?:string; text:string }`
- `Story { id; title; asA; iWant; soThat; risks[]; actionItems[]; labels[]; quotes[]; ownerSuggested?; ownerAlternates[]; needsClarification{}; estimate?; dueDate? }`
- `Suggestion { memberId; score; breakdown{competence,availability,growth,continuity}; justification[] }`
- `TeamKB { members[]; skills[]; history[]; capacity[]; preferences[]? }`
- `Weights { alpha; beta; gamma; delta }`

CSV columns: `Summary, Description, Assignee, Labels, Due date, Estimate`  
(Include Risks/Actions/Evidence inside Description body.)

---

## 8) Edge Cases & Guards
- Malformed SRT/VTT → skip block, show warning; allow plain‑text fallback.
- Missing capacity → degrade gracefully; show hints.
- Large transcripts → show segment count; soft limit warning.
- All stories to one owner → fairness hint in sidebar.

---

## 9) Out‑of‑Scope (v0)
- Real LLM calls, vector DB, or API push to Jira.  
- Auth, multi‑team tenancy, role‑based permissions.

---

## 10) Success Criteria (v0)
- Create/edit/assign ≥3 stories from a demo transcript in ≤3 minutes. 
- CSV imports to Jira without manual fixes. 
