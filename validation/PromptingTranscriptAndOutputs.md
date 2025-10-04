# ScrumBot – Checkpoint 2 Artifacts

Contributors: **Om Vyas** (omvyas2@illinois.edu), **Nakul Vasani** (nvasani2@illinois.edu)

---

## Prompt 1 in ChatGPT
**Instruction:** Generate a transcript for a sprint planning ceremony in Agile Software Development. Make sure it is long and has enough discussion.

### Result

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

### 3. Capacity Planning
**Priya:**  
“Thanks, Alex. Now let’s check team capacity.  
Mei, you’re out two days next week.  
Sam, you’re supporting the checkout team for one day.  
Riya, any planned time off?”

**Riya (QA):**  
“No, I’m available all sprint.”

**Priya:**  
“Great. So net, we’re down about 3 developer-days. Our velocity last sprint was 32, but with reduced capacity, I suggest we plan for around **28 story points** this sprint. Everyone agree?”

**Jordan (Tech Lead):**  
“Yes, better to be conservative. Unexpected infra or testing issues always pop up.”

### 4. Estimating Stories
**Priya:**  
“Alright, let’s dive into the backlog. Starting with Story #142.”

#### Story #142 – Editable Profile Info
**Alex:**  
“This is the ability for users to edit their name, bio, and contact info from the profile page. Right now, they can only view it.”

**Sam (Frontend):**  
“Alex, do we want inline editing or a dedicated edit screen?”

**Alex:**  
“Good question. Inline editing inside the profile page would be more modern, but if it’s too heavy, I’m okay with a separate edit screen.”

**Jordan (Tech Lead):**  
“Inline is doable but requires conditional rendering logic, validation, and autosave handling. Might add 2–3 points compared to a dedicated page.”

**Alex:**  
“Inline editing aligns with the design mocks. Let’s stick with it.”

**Mei (Backend):**  
“Backend changes: we’ll expose a PATCH endpoint, add schema validation, and handle concurrency. If two devices update at once, we’ll need last-modified timestamps.”

**Riya (QA):**  
“From QA side, we need to test field validation thoroughly — phone numbers, special characters, long bios, etc.”

**Jordan:**  
“Sounds like a medium-sized story. I propose **8 points**.”

**Team:** 👍 (consensus: 8 points)

#### Story #145 – Profile Picture Upload
**Alex:**  
“This allows users to upload or change their profile picture. We’ll support JPEG, PNG, and HEIC. Max 5MB.”

**Sam:**  
“Frontend: image picker, crop & preview, error messages for invalid formats. Around 5 points.”

**Carlos (DevOps):**  
“We’ll need to configure an S3 bucket, add pre-signed URL logic, and tweak caching. That’s 3 points.”

**Mei:**  
“Backend will validate mime types and file size.”

**Riya:**  
“We’ll also need cross-device testing. Safari’s HEIC handling might be tricky.”

**Jordan:**  
“Given the multiple moving parts, I’d call this **8 points**.”

**Team:** 👍 (consensus: 8 points)

#### Story #150 – Performance Optimization
**Alex:**  
“Our analytics show the profile page takes ~3.2 seconds to load. Target is under 2 seconds.”

**Mei:**  
“DB side: some queries aren’t indexed. Adding composite indexes should cut load time by 40%. 3 points.”

**Sam:**  
“Frontend: implement lazy loading for profile tabs and defer non-critical API calls. 2 points.”

**Jordan:**  
“Total **5 points**.”

**Team:** 👍

#### Bug #89 – Login Timeout Issue
**Mei:**  
“This is caused by a misconfigured refresh token TTL. Fixing it means updating auth config. Pretty small.”

**Carlos:**  
“I can handle redeployment and verification.”

**Team:** Estimates **2 points**.

#### Bug #91 – Safari Rendering Issue
**Sam:**  
“This is CSS grid not aligning properly in Safari 15. Needs prefixing and fallback.”

**Riya:**  
“Regression testing on iOS devices required.”

**Team:** Estimates **3 points**.

### 5. Tally & Scope Negotiation
**Priya:**  
“So far we’ve committed:  
- #142 Editable Profile (8)  
- #145 Profile Picture Upload (8)  
- #150 Performance Optimization (5)  
- Bug #89 Login Timeout (2)  
- Bug #91 Safari Rendering (3)

That totals **26 points**. We have space for ~2–3 more.”

**Alex:**  
“Can we squeeze in #153 Profile Deactivation?”

**Jordan:**  
“What’s the exact scope?”

**Alex:**  
“Just a toggle in settings to deactivate account, and on backend, flag status as inactive.”

**Mei:**  
“Backend: 2 points. Just a DB flag.”

**Sam:**  
“Frontend toggle: 2 points.”

**Riya:**  
“Testing: 1 point, but need to confirm downstream effects.”

**Jordan:**  
“That’s 5 points. If we commit, we risk spilling over. Suggest we mark it as a stretch goal.”

**Priya:**  
“Agreed. Let’s commit to 26, and keep #153 as stretch.”

### 6. Task Breakdown
**Priya:**  
“Let’s split stories into tasks so no one is blocked later.”

**Story #142 (Editable Profile Info):**  
- Backend: Create PATCH endpoint, schema migration, concurrency checks (Mei).  
- Frontend: Inline editing UI, validation logic, API integration (Sam).  
- QA: Regression suite, edge case testing (Riya).

**Story #145 (Profile Picture Upload):**  
- DevOps: S3 bucket config, presigned URLs (Carlos).  
- Backend: File validation, size limits (Mei).  
- Frontend: Image picker, cropping UI (Sam).  
- QA: Device compatibility testing (Riya).

**Story #150 (Performance Optimization):**  
- Backend: Add indexes, query optimization (Mei).  
- Frontend: Lazy loading adjustments (Sam).  
- Tech oversight: Integration review (Jordan).

**Bug #89 (Login Timeout):**  
- Backend: Token TTL config fix (Mei).  
- DevOps: Deploy & monitor sessions (Carlos).  
- QA: Session duration test (Riya).

**Bug #91 (Safari Rendering):**  
- Frontend: CSS fix (Sam).  
- QA: Cross-browser regression (Riya).

### 7. Risks & Dependencies
**Carlos:**  
“For Story #145, DevOps work must be done before frontend integration. I’ll handle that in first 2 days.”

**Mei:**  
“For Story #150, I’ll need infra access to run DB logs. Priya, can you check with Infra team?”

**Priya:**  
“Noted. I’ll escalate that today.”

**Riya:**  
“Potential risk: Profile Deactivation (#153) may affect analytics and reporting if we don’t exclude deactivated users. We should align with BI team if we end up implementing it.”

### 8. Sprint Goal Agreement
**Priya:**  
“To summarize, our committed sprint scope is:
- Editable Profile Info (#142, 8 pts)
- Profile Picture Upload (#145, 8 pts)
- Performance Optimization (#150, 5 pts)
- Bug #89 – Login Timeout (2 pts)
- Bug #91 – Safari Rendering (3 pts)

**Total = 26 points committed.**  
**Stretch Goal:** Profile Deactivation (#153, 5 pts).  
**Sprint Goal:** ‘Deliver an improved user profile experience with editable details, picture upload, and faster load times, while fixing critical login and rendering bugs.’  
Everyone aligned?”

**Team:** 👍 unanimous agreement.

### 9. Closing
**Priya:**  
“Perfect. We’re aligned on scope, sprint goal, and tasks. Thanks for keeping discussion detailed today — this should reduce mid-sprint blockers. Let’s execute!”

---

## Prompt 2 in ChatGPT
**Instruction:** Extract structured items: user stories, acceptance criteria, risks, action items (each with quotes + timestamps) for the transcript that you generated right now.

### Result

### 📝 User Stories
- **[10:08 AM] Story #142 – Editable Profile Info**  
  “This is the ability for users to edit their name, bio, and contact info from the profile page.” – Alex  
  **Estimation:** 8 points  
  **Tasks:** PATCH endpoint, inline editing UI, validation, regression suite

- **[10:15 AM] Story #145 – Profile Picture Upload**  
  “This allows users to upload or change their profile picture. We’ll support JPEG, PNG, and HEIC. Max 5MB.” – Alex  
  **Estimation:** 8 points  
  **Tasks:** S3 bucket config, validation, cropping UI, device testing

- **[10:24 AM] Story #150 – Performance Optimization (‘My Account’ Page)**  
  “Our analytics show the profile page takes ~3.2 seconds to load. Target is under 2 seconds.” – Alex  
  **Estimation:** 5 points  
  **Tasks:** DB indexes, lazy loading, integration review

- **[10:32 AM] Bug #89 – Login Timeout**  
  “This is caused by a misconfigured refresh token TTL. Fixing it means updating auth config.” – Mei  
  **Estimation:** 2 points

- **[10:36 AM] Bug #91 – Safari Rendering Issue**  
  “This is CSS grid not aligning properly in Safari 15. Needs prefixing and fallback.” – Sam  
  **Estimation:** 3 points

- **[10:40 AM] Story #153 – Profile Deactivation (Stretch Goal)**  
  “Just a toggle in settings to deactivate account, and on backend, flag status as inactive.” – Alex  
  **Estimation:** 5 points

---

### ✅ Acceptance Criteria
**Story #142 – Editable Profile Info**
- “Inline editing inside the profile page would be more modern, but if it’s too heavy, I’m okay with a separate edit screen.” – Alex  
- Must support inline editing with validation  
- Concurrency handling (last-modified timestamps)  
- “We need to test field validation thoroughly — phone numbers, special characters, long bios.” – Riya

**Story #145 – Profile Picture Upload**
- Supports JPEG, PNG, HEIC formats  
- “Max 5MB.” – Alex  
- Image picker + preview UI required  
- Caching & device compatibility testing

**Story #150 – Performance Optimization**
- Reduce load time from 3.2s to under 2s  
- Indexed queries and lazy loading implemented

**Bug #89 – Login Timeout**
- Session token should last expected duration (not expire after 5 minutes)

**Bug #91 – Safari Rendering Issue**
- Profile form layout must render correctly in Safari 15+

**Story #153 – Profile Deactivation (Stretch)**
- Toggle to deactivate account  
- “Need to confirm downstream effects with analytics.” – Riya

---

### ⚠️ Risks
- **[10:48 AM] Story #145 – Dependency Risk**  
  “DevOps work must be done before frontend integration. I’ll handle that in first 2 days.” – Carlos

- **[10:49 AM] Story #150 – Infra Risk**  
  “I’ll need infra access to run DB logs. Priya, can you check with Infra team?” – Mei

- **[10:50 AM] Story #153 – Analytics Risk**  
  “Potential risk: Profile Deactivation may affect analytics and reporting if we don’t exclude deactivated users.” – Riya

---

### 📌 Action Items
- **[10:12 AM] Priya** → “Noted. I’ll escalate [DB access] today.”
- **[10:30 AM] Carlos** → “I’ll handle bucket setup first two days.”
- **[10:35 AM] Mei** → “I’ll own schema migration and PATCH endpoint.”
- **[10:42 AM] Sam** → “I’ll implement inline editing UI and cropping tool.”
- **[10:51 AM] Riya** → “I’ll plan regression suite and cross-browser device testing.”
- **[10:55 AM] Priya** → “I’ll raise with BI team if we proceed with deactivation story.”

---

## Prompt 1 in Cursor (Gemini 2.5)
**Instruction:** Here is a transcript for Sprint Planning in Agile Software development. {Transcript generated by ChatGPT}. Extract structured items: user stories, acceptance criteria, risks, action items (each with quotes + timestamps) for the transcript that you generated right now.

### Output from Cursor (Gemini 2.5)
Extracting structured items from the Sprint Planning transcript and organizing them into user stories, acceptance criteria, risks, and action items with quotes and timestamps.

