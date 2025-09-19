[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/lHqtj83j)
<p align="center">
  <img src="logo.png" alt="ScrumBot logo" width="180">
</p>

# ScrumBot

# ScrumBot

## Problem statement and why it matters
Agile teams waste hours after sprint ceremonies turning loosely phrased discussion into **concrete user stories** and then deciding **who should own each story**. Ownership is often ad-hoc (who spoke loudest, who did it last time, who seems free), creating bottlenecks, uneven workload, and missed growth opportunities.  
**ScrumBot** converts meeting transcripts into structured Scrum artifacts (As a / I want / So that + Given/When/Then) and uses **retrieval-augmented generation (RAG)** over a private **team skills/experience database** to recommend owners with transparent, evidence-backed justifications. Humans stay in the loop to confirm or override.

---

## Target users and core tasks
**Users**
- Product Owners / Scrum Masters  
- Tech Leads / Engineering Managers  
- Project Managers in Agile teams

**Core tasks**
1) **Upload** a transcript (.vtt/.srt/.txt).  
2) **Extract** structured items: user stories, acceptance criteria, risks, action items (each with quotes + timestamps).  
3) **Assign** owners via RAG over team specifications (skills, history, capacity, goals)
4) **Review & edit** fields inline; mark “needs clarification” when evidence is missing.  
5) **Export** Meeting action notes with assigned user stories.

---

## Competitive landscape: existing systems/tools and their shortcomings
- **Generic meeting AI** (Zoom/Meet companion, Otter): good summaries, but **not Scrum-aware**, no owner recommendations, and little evidence traceability.  
- **Jira/GitHub automations**: can templatize issues; **no skill/capacity reasoning**, usually manual assignee selection.  
- **Research prototypes** (meeting summarization, action-item extraction): improve salience but rarely deliver **Jira-ready artifacts** or **assignment logic** tied to team data.  
**What we add:** Scrum-specific structure, **timestamped evidence** for every field, and **owner recommendations** grounded in a **local** team knowledge base.

---

## Initial concept and value proposition
**Concept:** Local-first web app that turns transcripts into **evidence-grounded** Scrum stories and recommends owners using **RAG + multi-factor scoring** (competence, availability, fairness/growth, continuity).

**Value**
- **Time saved:** Meeting → tickets in minutes, not hours.  
- **Higher quality stories:** Enforced As a/I want/So that + GWT with citations.  
- **Transparent assignment:** Ranked owners with “why” (skills matched, similar past stories, capacity).  
- **Fairness & growth:** Balance workload and create learning opportunities by design.  
- **Privacy:** Team data and transcripts remain **local** by default.

**High-level flow**
1) Parse transcript → segments with timestamps/speakers.  
2) Extract stories/actions(quotes + timestamps).  
3) Build RAG index over **member cards** (skills, history, capacity, preferences).  
4) Score candidates per story (α competence, β availability, γ fairness/growth, δ continuity).  
5) UI for edits → **Export** Jira CSV / Markdown.

---

## Milestones & roles (who owns what)

### Checkpoint 1 — Problem framing & setup (Week 1–2)
- Deliverables: README, proposal, /literature (≥8 papers), repo scaffold, 2 sample transcripts, team KB schema.

### Checkpoint 2 — Prompt & RAG validation (Week 3–4)
- Deliverables: notebooks testing **extraction** and **assignment** (RAG over member cards); small gold set + pilot metrics.


### Checkpoint 3 — Working demo (Week 5–7)
- Deliverables: app — upload → stories with evidence → ranked owners → inline edits → Jira CSV + Markdown export.


### Checkpoint 4 — Evaluation & presentation (Week 8–10)
- Deliverables: Metrics (story extraction F1, owner suggestion acceptance rate, time saved, fairness distribution), ablations (with/without evidence), final slides + live demo, reflections.


---
