# ScrumBot - AI-Powered Sprint Planning Assistant

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ScrumBot converts meeting transcripts into structured Scrum artifacts and uses AI to recommend optimal story owners based on team skills, capacity, and preferences.

## Features

- **Transcript Parsing**: Upload `.srt`, `.vtt`, or `.txt` meeting transcripts
- **AI Story Extraction**: Automatically extracts user stories in "As a / I want / So that" format with evidence
- **RAG-Based Owner Assignment**: Uses retrieval-augmented generation to recommend owners based on:
  - Competence (skills & experience match)
  - Availability (current capacity)
  - Growth Potential (learning opportunities)
  - Continuity (previous similar work)
- **Interactive Review**: Edit stories, adjust weights, and override assignments
- **CSV Export**: Export to Jira-compatible CSV format

## Quick Start

See **[INSTALL.md](./INSTALL.md)** for detailed installation instructions.

### TL;DR

```bash
# 1. Clone and install
git clone https://github.com/YOUR_USERNAME/scrumbot.git
cd scrumbot
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local and add your Groq API key from https://console.groq.com/keys

# 3. Run
npm run dev

# 4. Open http://localhost:3000
```

**New to the project?** Check out [INSTALL.md](./INSTALL.md) for:
- Prerequisites and system requirements
- Detailed setup instructions
- Groq API key setup guide
- Troubleshooting common issues
- Supabase configuration (optional)

## Usage

1. **Upload Transcript**: Drag and drop or paste your meeting transcript
2. **Load Team Data**: Click "Load Demo Data" or configure your team
3. **Adjust Weights**: Tune the importance of competence, availability, growth, and continuity
4. **Process**: Click "Process Transcript" to extract stories and generate recommendations
5. **Review**: Edit stories, view suggestions, and assign owners
6. **Export**: Lock the sprint and export to CSV for Jira import

## Technology Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **AI**: Groq (Llama 3.3 70B), Vercel AI SDK
- **State Management**: Zustand
- **UI Components**: shadcn/ui

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Landing page (upload & configure)
│   ├── loading/page.tsx      # Processing page
│   ├── review/page.tsx       # Story review & assignment
│   ├── lock/page.tsx         # Final review & export
│   └── api/
│       ├── extract-stories/  # AI story extraction endpoint
│       └── rank-owners/      # RAG-based ranking endpoint
├── lib/
│   ├── aiRank.ts            # AI-powered ranking logic
│   ├── mockRank.ts          # Fallback ranking algorithm
│   ├── parseTranscript.ts   # Transcript parsing
│   ├── csv.ts               # CSV export
│   └── store.ts             # Zustand state management
├── components/
│   ├── story-card.tsx       # Story editing component
│   ├── weight-tuner.tsx     # Weight adjustment UI
│   └── workload-summary.tsx # Team capacity visualization
└── types.ts                 # TypeScript type definitions
\`\`\`

## Contributors

- Om Vyas (omvyas2@illinois.edu)
- Nakul Vasani (nvasani2@illinois.edu)

## License

MIT
