## Problem & Importance
Agile teams spend hours after sprint ceremonies turning loosely phrased discussions into concrete user stories and then **deciding who should own each story**. Ownership choices are often ad-hoc—whoever spoke loudest, did something similar last sprint, or seems least busy—which causes bottlenecks, uneven workload, and missed growth opportunities.  
**ScrumNotes Assign** aims to (1) parse meeting transcripts into structured Scrum artifacts and (2) use **retrieval-augmented generation (RAG)** over a **team skills/experience database** to recommend an owner for each story. Recommendations are transparent (quotes, timestamps, and skill-match evidence) and **require human approval**, accelerating planning while improving fairness and clarity.

---

## Prior Systems & Gaps
- **General meeting summarizers / note bots** (Zoom/Meet AI, Otter, generic LLM prompts) create topic bullets but **don’t enforce Scrum structure** (As a / I want / So that; Given/When/Then) and rarely preserve timestamped evidence. They also **do not suggest owners**.
- **Research on action-item extraction / meeting QA** surfaces decisions and tasks but stops short of **Jira-ready stories** and offers **no assignment logic** tied to skills, availability, or growth goals.
- **Jira/GitHub automations** can templatize issues but rely on manual assignee selection or simplistic component→owner rules, with **no justification** and limited fairness considerations.

**Gap:** A **Scrum-aware** pipeline that goes from **transcript → structured stories → evidence-backed owner suggestions**, powered by a **skills/experience RAG index**, with rationale exposed for review.

---

## Proposed Approach & Why It Improves on Prior Work

### Inputs
1) **Meeting transcript**: `.vtt/.srt/.txt` with timestamps and (if available) speaker tags.  
2) **Team knowledge base (KB)**:
   - `members`: `{id, name, role, time_zone, seniority}`
   - `skills`: `{member_id, skill, level (1–5), last_used, evidence_links}`
   - `history`: `{member_id, story_id, tags, outcome, cycle_time, quality_notes}`
   - `capacity`: `{member_id, sprint_id, hours_available}`
   - `preferences` (optional): `{member_id, wants_to_learn: ["X","Y"]}`

### Pipeline
1) **Transcript → candidate stories**  
   Light NLP + LLM structuring to extract **user stories** (As a / I want / So that), **risks**, and **action items**, each with **timestamped quotes** for evidence. If owner/date/details aren’t explicit, fields remain **blank** and are labeled **needs-clarification**.

2) **RAG over team specifications for owner suggestions**  
   Build a local vector index over member **skills/experience summaries** and **past story embeddings** (title, tags, components). For each story, retrieve top-k candidate members and compute a **score**:
   - **Competence**: skill overlap & recency (weight α)  
   - **Availability**: capacity this sprint (weight β)  
   - **Fairness/Growth**: workload balance + learning goals (weight γ)  
   - **Continuity**: prior ownership of related components (weight δ)  
   Output **N suggestions** with a **justification** citing matched skills, similar past stories, and capacity.

3) **Human-in-the-loop review**  
   Streamlit UI shows each story with: structured fields, quotes/timestamps, and a ranked list of suggested owners. PO/Scrum Master can **edit** any field, override the owner, add labels, or defer. One click to **export** Jira-compatible CSV (API push optional post-MVP).

4) **Learning loop**  
   After export, capture final decisions + outcomes (e.g., cycle time, reassignments) into `history`. Over time, tune weights (α, β, γ, δ) via a simple supervised model using observed outcomes.

### Why this helps
- **End-to-end path to action:** Not just summaries—**Scrum-structured artifacts + owner recommendations** backed by evidence and capacity.  
- **Transparent rationale:** Every recommendation shows **why** (skills matched, similar stories, hours left) → trust & auditability.  
- **Fairness & growth:** Scoring balances **load** and allocates weight for **learning goals**, not just “who did it before.”  

---

## Plan for Checkpoint 2 (Validation via Prompting)
We will validate two model steps in notebooks (no full app yet):

1) **Story extraction prompts**  
   Metrics on 4–6 short transcripts with a small gold set: precision/recall for stories, acceptance-criteria completeness, and “evidence present?” rate.

2) **Assignment reasoning (RAG + scoring)**  
   For each story, show the model the **top-k member cards** (skill snippets + history) and request a **ranked recommendation**.
   Human raters judge **plausibility** and **justification quality**.  
   Sanity checks: set a candidate’s capacity to zero → model should drop/penalize; remove a key skill → model should explain mismatch.


---

## Initial Risks & Mitigation

### Privacy
- **Risk:** Transcripts/personnel data are sensitive.  
- **Mitigation:** Local-first execution; explicit storage locations; data-retention toggles; optional redaction (emails/IDs) before indexing.

### Bias & Fairness
- **Risk:** Recommender over-assigns to “top performers” or reflects historical siloing.  
- **Mitigation:** Scoring includes **workload balance** and **learning goals**; show **assignment distribution** diagnostics; allow overrides; expose the **evidence** for each suggestion.

### Safety (organizational)
- **Risk:** Teams might treat suggestions as mandates.  
- **Mitigation:** UI labels outputs as **drafts**; export requires human confirmation; show **next-best candidates** to support discussion.

### Reliability (hallucination / incorrect facts)
- **Risk:** Model invents owners/skills.  
- **Mitigation:** **Evidence-required fields** for transcript facts; assignment LLM sees **only** retrieved member cards; validators reject outputs without evidence; dates/capacity computed with code, not LLM.

### Drift & Staleness
- **Risk:** Skills/capacity stale.  
- **Mitigation:** Lightweight profile editor; optional weekly sync; **data freshness badges** per member.

---
