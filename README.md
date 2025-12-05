# ScrumBot - AI-Powered Sprint Planning Assistant

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-orange)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **A production-grade, mixed-initiative AI system that automates sprint planning by extracting user stories from meeting transcripts and recommending optimal task assignments using Retrieval-Augmented Generation (RAG).**

📊 **User Study Results**: SUS Score 83.5/100 (Excellent) | 92% Task Success | 40% Time Savings | 92% Adoption Intent

---

## 🎯 Overview

ScrumBot transforms sprint planning from a manual, time-consuming process into an efficient, AI-assisted workflow. It combines the power of large language models with a transparent, human-centered design that keeps teams in control.

### The Problem

Sprint planning is cognitively demanding and time-intensive:
- ❌ Interpreting ambiguous meeting notes
- ❌ Manually extracting and formatting user stories
- ❌ Subjective task assignment decisions
- ❌ Difficulty communicating assignment rationale
- ❌ Managing dependencies across complex sprints
- ❌ Time pressure during planning sessions

### The Solution

ScrumBot automates the mechanical parts while preserving human judgment:
- ✅ **AI Story Extraction**: Converts meeting transcripts → structured user stories (4.67/5 satisfaction)
- ✅ **Smart Recommendations**: Multi-factor owner ranking with transparent justifications (4.75/5 helpfulness)
- ✅ **Interactive Tuning**: Adjust AI weights (Competence, Availability, Growth, Continuity)
- ✅ **Full Control**: Edit, override, and approve every decision
- ✅ **Dependency Visualization**: See task relationships and critical paths (100% found useful)
- ✅ **Jira Integration**: Export sprint plans directly to CSV

---

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone [https://github.com/omvyas2/scrumbot.git](https://github.com/SALT-Lab-Human-AI/project-check-point-1-scrumbot.git)
cd scrumbot
npm install

# 2. Configure environment
cp .env.example .env.local
# Add your Groq API key: https://console.groq.com/keys

# 3. Verify setup (optional but recommended)
node verify-setup.js

# 4. Run
npm run dev

# 5. Open http://localhost:3000
```

**First time?** Try the demo data:
1. Click "Load Demo Transcript" (sample sprint planning meeting)
2. Click "Load Demo Data" (6 team members with skills & capacity)
3. Click "Process Transcript" and watch the AI work!

📖 **Detailed setup**: See [INSTALL.md](./INSTALL.md) for step-by-step instructions, troubleshooting, and Supabase setup.

---

## ✨ Key Features

### 1. AI Story Extraction (Score: 4.42/5)
- Upload `.vtt`, `.srt`, or `.txt` meeting transcripts
- Extracts user stories in "As a / I want / So that" format
- Automatically generates acceptance criteria, labels, and estimates
- Provides evidence with timestamps and speaker attribution

### 2. RAG-Based Owner Recommendations (Trust: 4.67/5)
**Four-Factor Scoring Model:**
- **α (Competence)**: Skill match & experience level
- **β (Availability)**: Current capacity & workload
- **γ (Growth)**: Learning opportunities & skill development
- **δ (Continuity)**: Similar past work & success patterns

**Transparency Features:**
- Per-owner score breakdowns (4.58/5 clarity)
- 3-5 human-readable justifications per recommendation
- Evidence from team knowledge base (CSV skills/history data)
- Adjustable weights via intuitive sliders

### 3. Mixed-Initiative Design
- ✏️ **Editable Stories**: Modify text, criteria, estimates
- 🔄 **Manual Override**: Reassign any story to any team member
- ⚙️ **Weight Tuning**: Adjust α, β, γ, δ to match team priorities
- 🔍 **Full Visibility**: See exactly why AI made each suggestion

### 4. Dependency Management (100% found useful)
- Visual dependency graph using React Flow
- Critical path highlighting
- Gantt chart timeline view
- Auto-detection based on labels, risks, and requirements

### 5. Export & Integration
- CSV export for Jira, Linear, GitHub Projects
- Includes stories, owners, criteria, scores, labels
- 83% successful export rate in user testing

---

## 📊 Validated Performance

We conducted a rigorous user study with **12 participants** performing realistic sprint-planning tasks:

| Metric | Result | Benchmark |
|--------|--------|-----------|
| **SUS Score** | 83.5/100 | Excellent (>80) |
| **Task Success** | 92% | Above average |
| **Time Savings** | 40% faster | vs. expected |
| **Error Rate** | 2% | Exceptionally low |
| **Trust in AI** | 4.67/5 | High |
| **Would Use** | 92% | Strong adoption |
| **Story Quality** | 4.67/5 | Very satisfied |
| **Justification Clarity** | 4.75/5 | Highly helpful |

**Key Finding**: *Transparency drives trust.* Users who engaged with score breakdowns and justifications showed significantly higher trust (4.2/5 vs 3.4/5).

📄 **Full Study**: See [Project Report](./docs/GenAI_ProjectReport_ScrumBot.pdf) for methodology, results, and analysis.

---

## 🏗️ Architecture

### Technology Stack

**Frontend**
- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- shadcn/ui components
- Zustand (state management)
- React Flow (dependency graphs)

**AI Runtime**
- Groq API (Llama 3.3 70B)
- Structured prompting with JSON schemas
- Lightweight RAG using team knowledge base
- Temperature 0.2-0.3 for consistency

**Data & Storage**
- Supabase (optional team data persistence)
- Local storage for demo mode
- CSV parsing for team skills/capacity/history

### System Flow

```
┌─────────────────┐
│ Upload Meeting  │  (.vtt, .srt, .txt)
│   Transcript    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Parse & Clean   │  (lib/parseTranscript.ts)
│   Transcript    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI Extraction  │  (app/api/extract-stories/route.ts)
│  → User Stories │  Llama 3.3 70B via Groq
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Load Team KB   │  (CSV or demo data)
│ Skills/Capacity │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  RAG Ranking    │  (app/api/rank-owners/route.ts)
│ α·β·γ·δ Scoring │  (lib/aiRank.ts)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Interactive UI  │  (app/review/page.tsx)
│ Edit, Override  │  Adjust weights, assign
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Dependencies   │  (components/story-dependencies.tsx)
│  + CSV Export   │  (lib/csv.ts)
└─────────────────┘
```

---

## 📂 Project Structure

```
scrumbot/
├── app/                              # Next.js App Router
│   ├── page.tsx                      # Landing page (upload & configure)
│   ├── loading/page.tsx              # AI processing with progress indicators
│   ├── review/page.tsx               # Story review & assignment
│   ├── lock/page.tsx                 # Final review & CSV export
│   └── api/                          # Backend API routes
│       ├── extract-stories/          # AI story extraction (Llama 3.3)
│       ├── rank-owners/              # RAG-based owner ranking
│       ├── team-data/                # Supabase integration endpoints
│       └── transcripts/              # Transcript CRUD operations
│
├── components/                       # React components
│   ├── story-card.tsx               # Story editing UI with inline controls
│   ├── weight-tuner.tsx             # α, β, γ, δ slider controls
│   ├── workload-summary.tsx         # Team capacity visualization
│   ├── story-dependencies.tsx       # Dependency graph & Gantt chart
│   ├── onboarding-tutorial.tsx      # First-time user walkthrough
│   ├── agile-explainer.tsx          # Agile/Scrum educational popup
│   ├── processing-progress.tsx      # Real-time AI progress feedback
│   └── ui/                          # shadcn/ui primitives (50+ components)
│
├── lib/                             # Core business logic
│   ├── aiRank.ts                    # AI-powered ranking with RAG
│   ├── mockRank.ts                  # Fallback heuristic ranking
│   ├── parseTranscript.ts           # VTT/SRT/TXT parser
│   ├── csv.ts                       # Jira-compatible CSV export
│   ├── csv-parser.ts                # Team data CSV import
│   ├── store.ts                     # Zustand global state
│   ├── demo-data.ts                 # Sample team data
│   └── supabase/                    # Database clients (optional)
│
├── sample-transcripts/              # Demo meeting transcript
├── scripts/                         # Supabase SQL schema
├── user-study/                      # Study protocol & materials
├── types.ts                         # TypeScript definitions
├── .env.example                     # Environment template
├── verify-setup.js                  # Installation checker
│
├── INSTALL.md                       # 📖 Detailed setup guide
├── QUICK_REFERENCE.md               # 📋 Command cheat sheet
├── RAG_IMPROVEMENTS.md              # 🧠 Technical deep-dive
├── UX_IMPROVEMENTS_SUMMARY.md       # 🎨 UI/UX features
└── README.md                        # 👈 You are here
```

---

## 🎮 Usage Guide

### Basic Workflow

1. **Load Data**
   - Upload a meeting transcript or use demo
   - Load team data (CSV or demo)
   - Review team skills, capacity, and history

2. **Extract Stories**
   - Click "Process Transcript"
   - AI extracts user stories with evidence
   - Review stories, edit as needed
   - Average quality: 4.42/5

3. **Review Recommendations**
   - See AI-ranked owner suggestions
   - Examine score breakdowns (α, β, γ, δ)
   - Read 3-5 justifications per owner
   - Trust rating: 4.67/5

4. **Customize & Assign**
   - Adjust weight sliders to prioritize factors
   - Manually override any assignment
   - Balance workload across team
   - 75% found weight tuning easy

5. **Visualize Dependencies**
   - Open dependency graph
   - Identify critical paths
   - Review Gantt timeline
   - 100% found this useful

6. **Export Sprint Plan**
   - Click "Lock Sprint" when ready
   - Export CSV for Jira/Linear
   - 83% export success rate

### Advanced Features

**Weight Tuning Examples:**
- **Senior-heavy team**: Increase γ (Growth) to develop junior members
- **Tight deadline**: Increase β (Availability) to balance workload
- **New feature area**: Increase α (Competence) for critical expertise
- **Maintenance sprint**: Increase δ (Continuity) for consistency

**CSV Team Data Format:**
```csv
name,role,timezone,skills,capacity,learning_goals,history
Alice Chen,Senior Frontend,PST,"React:5,TypeScript:5,CSS:4",40h,Three.js;WebGL,"dashboard:success,auth:success"
```

See [README_TEAM_SETUP.md](./README_TEAM_SETUP.md) for complete CSV specifications.

---

## 🔬 Research Contributions

This project demonstrates three key contributions to AI-assisted software engineering:

### 1. Mixed-Initiative Sprint Planning
**Problem**: Existing tools are either fully manual (Jira, Linear) or fully automated (unreliable).

**Solution**: ScrumBot balances AI automation with human control:
- AI handles extraction and ranking (saves 40% time)
- Humans retain final decisions (maintains trust at 4.67/5)
- Transparent justifications enable informed overrides

**Validation**: 92% task success + 83.5 SUS score proves the approach works.

### 2. Transparent AI Recommendations
**Problem**: Black-box AI destroys trust in high-stakes decisions.

**Solution**: Four-factor scoring with evidence-backed justifications:
- Users see exactly *why* each owner was suggested
- Score breakdowns enable "what-if" exploration via weight tuning
- Provenance links to team knowledge base

**Validation**: 4.75/5 justification helpfulness + 4.67/5 trust rating.

### 3. Lightweight RAG for Task Assignment
**Problem**: Generic LLMs lack team-specific context (skills, capacity, preferences).

**Solution**: Retrieval-Augmented Generation using team knowledge base:
- Injects member profiles, history, and constraints into prompts
- No fine-tuning required (works with off-the-shelf Llama 3.3)
- Extensible to organizational policies and norms

**Validation**: 92% recommendation acceptance rate.

📄 **Academic Paper**: See [Project Report](./docs/GenAI_ProjectReport_ScrumBot.pdf) for full methodology and related work analysis.

---

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or pnpm
- Groq API key (free at [console.groq.com](https://console.groq.com))
- (Optional) Supabase account for team data persistence

### Installation

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local:
#   GROQ_API_KEY=gsk_your_key_here

# Verify setup
node verify-setup.js

# Run dev server
npm run dev

# Build for production
npm run build
npm start
```

### Environment Variables

```bash
# Required: Groq API for AI features
GROQ_API_KEY=gsk_...
API_KEY_GROQ_API_KEY=gsk_...  # Alternative key name

# Optional: Supabase for persistent storage
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Optional: Next.js config
PORT=3000
NODE_ENV=production
```

See [INSTALL.md](./INSTALL.md) for detailed setup instructions and troubleshooting.

### Testing

```bash
# Verify installation
node verify-setup.js

# Run linter
npm run lint

# Test with demo data
npm run dev
# → Open http://localhost:3000
# → Click "Load Demo Transcript" + "Load Demo Data"
```

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [INSTALL.md](./INSTALL.md) | Complete installation guide with troubleshooting |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | One-page command cheat sheet |
| [RAG_IMPROVEMENTS.md](./RAG_IMPROVEMENTS.md) | Technical deep-dive: AI ranking system |
| [UX_IMPROVEMENTS_SUMMARY.md](./UX_IMPROVEMENTS_SUMMARY.md) | UI/UX features and design decisions |
| [README_TEAM_SETUP.md](./README_TEAM_SETUP.md) | Team CSV format specifications |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deployment guide (Vercel, Docker) |
| [Project Report](./docs/GenAI_ProjectReport_ScrumBot.pdf) | Academic paper with full evaluation |
| [User Study](./user-study/) | Study protocol, materials, and consent forms |

---

## 🧪 Evaluation & Results

### Study Design

**Participants**: 12 (graduate students, early-career professionals)  
**Method**: Task-based usability study (remote, asynchronous)  
**Duration**: ~30 minutes per participant  
**Tasks**: 4 realistic sprint-planning scenarios  

**Metrics**:
- Task success, time-on-task, error rate
- SUS, UMUX-Lite
- Satisfaction, usefulness, trust
- Qualitative feedback (likes, frustrations, suggestions)

### Key Findings

✅ **Efficiency**: 40% faster task completion than expected  
✅ **Usability**: SUS 83.5 (Excellent) = top 10% of all systems  
✅ **Trust**: 4.67/5, driven by transparent justifications  
✅ **Adoption**: 92% would use if available to their team  
✅ **Quality**: 4.67/5 satisfaction with extracted stories  
✅ **Clarity**: 4.75/5 helpfulness of AI justifications  

### Limitations

- Small sample size (N=12)
- Homogeneous participants (all technical, ages 22-28)
- Artificial task context (demo data vs. real teams)
- One outlier user (SUS 47.5) struggled with extraction

### Risks & Ethics

⚠️ **AI Hallucinations**: Rare but possible incorrect story extraction  
⚠️ **Over-reliance**: High adoption rate may lead to uncritical acceptance  
⚠️ **Privacy**: Real meeting transcripts contain sensitive info  
⚠️ **Bias**: Training data may reinforce inequitable assignment patterns  

**Mitigations**:
- Human review required for all AI outputs
- Evidence citations enable verification
- Transparent score breakdowns surface bias
- Manual override always available

---

## 🚀 Future Work

### Technical Enhancements
- [ ] Real-time transcript parsing during live meetings
- [ ] Confidence scores for each story/recommendation
- [ ] Multi-sprint learning model (improve over time)
- [ ] Support for video analysis (facial expressions, engagement)

### UX Improvements
- [ ] Improve CSV export clarity (17% failure rate)
- [ ] Better onboarding for weight sliders (25% found confusing)
- [ ] Mobile-responsive design
- [ ] Dark mode support

### Deployment Features
- [ ] Direct Jira/Linear/GitHub Projects integrations
- [ ] Team analytics dashboards
- [ ] Organizational policy templates
- [ ] Multi-team management

### Research Directions
- [ ] Longitudinal study with real teams (6+ months)
- [ ] A/B test: AI-assisted vs. manual planning
- [ ] Cross-cultural study (US vs. EU vs. Asia teams)
- [ ] Fine-tuned model for domain-specific language

---

## 🤝 Contributing

We welcome contributions! This project is part of academic research, but we're open to:

- 🐛 **Bug reports**: [Open an issue](https://github.com/omvyas2/scrumbot/issues)
- ✨ **Feature requests**: [Start a discussion](https://github.com/omvyas2/scrumbot/discussions)
- 🔧 **Pull requests**: Fork, branch, and submit PRs
- 📝 **Documentation**: Improve guides, add examples

**Development Guidelines**:
- Follow existing code style (Prettier + ESLint)
- Add TypeScript types for new features
- Update documentation for user-facing changes
- Test with demo data before submitting

---

## 📜 License

MIT License - see [LICENSE](./LICENSE) for details.

**Academic Use**: If you use ScrumBot in your research, please cite:
```bibtex
@software{scrumbot2024,
  title={ScrumBot: Evaluating an AI System for Automated Sprint Planning},
  author={Vyas, Om and Vasani, Nakul},
  year={2024},
  institution={University of Illinois Urbana-Champaign},
  course={IS492 - Intro to GenAI for Human-AI Collaboration}
}
```

---

## 👥 Team

**Om Vyas** ([@omvyas2](https://github.com/omvyas2))  
*AI/RAG Implementation, Backend APIs, User Study Design*  
📧 omvyas2@illinois.edu

**Nakul Vasani** ([@nvasani2](https://github.com/nvasani2))  
*Frontend UI/UX, State Management, Visualization*  
📧 nvasani2@illinois.edu

**Course**: IS492 - Introduction to GenAI for Human-AI Collaboration  
**Institution**: University of Illinois Urbana-Champaign  
**Semester**: Fall 2024

---

## 🙏 Acknowledgments

- **Groq** for providing fast, affordable LLM inference
- **shadcn/ui** for beautiful, accessible components
- **Vercel** for Next.js and deployment platform
- **Study participants** for valuable feedback
- **Course instructors** for guidance and support

---

## 📞 Support

**Questions?** We're here to help!

- 📧 Email: omvyas2@illinois.edu, nvasani2@illinois.edu
- 🐛 Issues: [GitHub Issues](https://github.com/omvyas2/scrumbot/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/omvyas2/scrumbot/discussions)
- 📖 Docs: [INSTALL.md](./INSTALL.md), [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

**Troubleshooting**:
1. Check [INSTALL.md § Troubleshooting](./INSTALL.md#troubleshooting)
2. Run `node verify-setup.js` to diagnose issues
3. Search [existing issues](https://github.com/omvyas2/scrumbot/issues)
4. Open a new issue with error details

---

## ⭐ Star History

If you find ScrumBot useful, consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=omvyas2/scrumbot&type=Date)](https://star-history.com/#omvyas2/scrumbot&Date)

---

<div align="center">

**Built with ❤️ for Agile teams everywhere**

🚀 **[Try the Demo](http://localhost:3000)** | 📖 **[Read the Docs](./INSTALL.md)** | 🐛 **[Report a Bug](https://github.com/omvyas2/scrumbot/issues)**

</div>
