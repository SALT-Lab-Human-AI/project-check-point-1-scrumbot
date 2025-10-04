# ScrumBot – Checkpoint 2 Validation

## Prompt 1 in ChatGPT
**Instruction:** Generate a transcript for a sprint planning ceremony in Agile Software Development.  
**Result:**

---

## Transcript: Sprint Planning Ceremony

**Date:** Monday, October 7, 2025  
**Sprint Length:** 2 weeks (10 working days)  
**Attendees:**  
- Priya (Scrum Master)  
- Alex (Product Owner)  
- Jordan (Tech Lead)  
- Mei (Backend Developer)  
- Sam (Frontend Developer)  
- Riya (QA Engineer)  
- Carlos (DevOps Engineer)  

### 1. Kickoff  
**Priya (Scrum Master):**  
“Good morning, everyone. Let’s kick off Sprint Planning. As usual, our goal is to decide what we can commit to delivering in this sprint and align on the sprint goal. We'll also break down stories into tasks so we don’t leave ambiguities for mid-sprint.  
Before we begin — a reminder: last sprint we committed to 32 points and delivered 29, mainly because the image optimization story slipped. Let's keep that in mind when we negotiate scope today.  
Alex, could you share the product priorities for this sprint?”

### 2. Product Priorities  
**Alex (Product Owner):**  
“Sure. The overarching theme for this sprint is the **User Profile Revamp Epic**. We’ve had multiple customer requests and complaints around profile editing, and it’s one of our Q4 OKRs to improve profile engagement by 15%.  

The must-haves are:  
- Story #142 – Editable Profile Info.  
- Story #145 – Profile Picture Upload.  
- Story #150 – Performance Optimization for the ‘My Account’ page.  

Additionally, we’ve got two urgent bugs from last sprint’s release:  
- Bug #89 – Login Timeout Issue.  
- Bug #91 – Mobile Safari Rendering Issue.  

If we have capacity, I’d love us to consider **Story #153 – Profile Deactivation**, which has been pending for a while. Not a blocker but adds value.”  

*(Transcript continues through Estimation, Scope Negotiation, Task Breakdown, Risks, Sprint Goal Agreement, and Closing – see full detail in original transcript section above)*  

---

## Prompt 2 in ChatGPT
**Instruction:** Extract structured items: user stories, acceptance criteria, risks, action items (each with quotes + timestamps) for the transcript that you generated right now.  

**Result:**

### 📝 User Stories
- **[10:08 AM] Story #142 – Editable Profile Info**  
  *“This is the ability for users to edit their name, bio, and contact info from the profile page.” – Alex*  
  Estimation: 8 points  
  Tasks: PATCH endpoint, inline editing UI, validation, regression suite  

- **[10:15 AM] Story #145 – Profile Picture Upload**  
  *“This allows users to upload or change their profile picture. We’ll support JPEG, PNG, and HEIC. Max 5MB.” – Alex*  
  Estimation: 8 points  
  Tasks: S3 bucket config, validation, cropping UI, device testing  

- **[10:24 AM] Story #150 – Performance Optimization (‘My Account’ Page)**  
  *“Our analytics show the profile page takes ~3.2 seconds to load. Target is under 2 seconds.” – Alex*  
  Estimation: 5 points  
  Tasks: DB indexes, lazy loading, integration review  

- **[10:32 AM] Bug #89 – Login Timeout**  
  *“This is caused by a misconfigured refresh token TTL. Fixing it means updating auth config.” – Mei*  
  Estimation: 2 points  

- **[10:36 AM] Bug #91 – Safari Rendering Issue**  
  *“This is CSS grid not aligning properly in Safari 15. Needs prefixing and fallback.” – Sam*  
  Estimation: 3 points  

- **[10:40 AM] Story #153 – Profile Deactivation (Stretch Goal)**  
  *“Just a toggle in settings to deactivate account, and on backend, flag status as inactive.” – Alex*  
  Estimation: 5 points  

---

### ✅ Acceptance Criteria
- **Story #142 – Editable Profile Info**  
  *“Inline editing inside the profile page would be more modern, but if it’s too heavy, I’m okay with a separate edit screen.” – Alex*  
  - Must support inline editing with validation  
  - Concurrency handling with last-modified timestamps  
  *“We need to test field validation thoroughly — phone numbers, special characters, long bios.” – Riya*  

- **Story #145 – Profile Picture Upload**  
  - Supports JPEG, PNG, HEIC formats  
  *“Max 5MB.” – Alex*  
  - Image picker + preview UI  
  - Caching & device compatibility testing  

- **Story #150 – Performance Optimization**  
  - Load time reduced to under 2 seconds  
  - Indexed queries and lazy loading  

- **Bug #89 – Login Timeout**  
  - Session token should last expected duration (not expire after 5 minutes)  

- **Bug #91 – Safari Rendering Issue**  
  - Profile form layout renders correctly in Safari 15+  

- **Story #153 – Profile Deactivation (Stretch)**  
  - Settings toggle to deactivate account  
  *“Need to confirm downstream effects with analytics.” – Riya*  

---

### ⚠️ Risks
- **[10:48 AM] Story #145 – Dependency Risk**  
  *“DevOps work must be done before frontend integration. I’ll handle that in first 2 days.” – Carlos*  

- **[10:49 AM] Story #150 – Infra Risk**  
  *“I’ll need infra access to run DB logs. Priya, can you check with Infra team?” – Mei*  

- **[10:50 AM] Story #153 – Analytics Risk**  
  *“Potential risk: Profile Deactivation may affect analytics and reporting if we don’t exclude deactivated users.” – Riya*  

---

### 📌 Action Items
- **[10:12 AM] Priya** → *“Noted. I’ll escalate [DB access] today.”*  
- **[10:30 AM] Carlos** → *“I’ll handle bucket setup first two days.”*  
- **[10:35 AM] Mei** → *“I’ll own schema migration and PATCH endpoint.”*  
- **[10:42 AM] Sam** → *“I’ll implement inline editing UI and cropping tool.”*  
- **[10:51 AM] Riya** → *“I’ll plan regression suite and cross-browser device testing.”*  
- **[10:55 AM] Priya** → *“I’ll raise with BI team if we proceed with deactivation story.”*  

---

## Prompt 1 in Cursor (Gemini 2.5)
**Instruction:** Extract structured items for the transcript.  
**Result:** Saved file `/sprint_planning_extraction.md` with:  

- User Stories (4 total: #142, #145, #150, #153)  
- Bugs (2 total: #89, #91)  
- Acceptance Criteria (performance targets, file format support, browser compatibility)  
- Risks (capacity reduction, previous slippage, DevOps deps, infra needs, analytics impact, unexpected issues)  
- Action Items (Priya, Carlos, Riya)  
- Sprint Commitment: 26 points, sprint goal aligned  

---

## Prompt 1 in Claude Sonnet 4.5
**Instruction:** Extract structured items for the transcript.  
**Result:** Produced detailed breakdown of:  
- User Stories with descriptions, acceptance criteria, tasks  
- Bugs with tasks and owners  
- Risks with quotes, impacts, mitigations  
- Action Items with owners, due dates, priorities  
- Sprint Commitment (26 points + stretch)  
- Capacity adjustments  

---

# Gap Analysis

- **No assignment intelligence:** Existing tools extract tasks but don’t recommend owners.  
- **Rigid role mapping:** Tools can’t reason that a frontend dev with backend experience can pick backend stories.  
- **No uncertainty handling:** Current systems never admit missing info → vague stories slip into Jira.  
- **Opaque reasoning:** Outputs don’t explain *why* someone should own a story.  
- **Weak interactivity:** Exports are static; no inline editing or “needs clarification” markers.  

---

# Opportunity Framing

**ScrumBot fills these gaps by:**  
1. **RAG-powered owner assignment** – Uses team skill/history/capacity data to assign owners with transparent justifications.  
2. **Cross-domain flexibility** – Recognizes stretch experience (e.g., frontend dev with backend exposure).  
3. **Needs clarification workflow** – Flags vague stories for human review.  
4. **Evidence-grounded output** – Every story/action links back to transcript quotes + timestamps.  
5. **Seamless Jira export** – Standardized, assignee-tagged stories ready in minutes.  
