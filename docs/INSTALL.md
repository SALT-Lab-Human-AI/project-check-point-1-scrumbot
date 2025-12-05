# Installation Guide - ScrumBot

Complete setup instructions for running ScrumBot locally on your machine.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Using Demo Data](#using-demo-data)
- [Troubleshooting](#troubleshooting)
- [Optional: Supabase Setup](#optional-supabase-setup)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required
- **Node.js** (v18.17 or higher recommended)
  - Check version: `node --version`
  - Download from: [nodejs.org](https://nodejs.org/)
  
- **npm** or **pnpm** (package manager)
  - npm comes with Node.js
  - For pnpm: `npm install -g pnpm`

### Recommended
- **Git** (for cloning the repository)
  - Check version: `git --version`
  - Download from: [git-scm.com](https://git-scm.com/)

- **VS Code** or any code editor

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/scrumbot.git
cd scrumbot
```

Or download the ZIP from GitHub and extract it.

---

### 2. Install Dependencies

Using **npm**:
```bash
npm install
```

Using **pnpm** (faster):
```bash
pnpm install
```

This will install all required packages including:
- Next.js 15
- React 19
- Tailwind CSS
- Groq AI SDK
- Zustand (state management)
- shadcn/ui components
- And more...

**Note**: Installation may take 2-5 minutes depending on your internet speed.

---

### 3. Set Up Environment Variables

#### Option A: Using Demo Mode (No API Key Needed)

If you just want to test the UI without AI features:

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. The app will work with demo data, but AI features (story extraction, owner recommendations) will be disabled.

#### Option B: Full Setup with AI Features (Recommended)

To enable AI-powered story extraction and recommendations:

1. **Get a Groq API Key** (Free):
   - Visit: [https://console.groq.com/keys](https://console.groq.com/keys)
   - Sign up for a free account
   - Create a new API key
   - Copy the key (starts with `gsk_...`)

2. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

3. Open `.env.local` in your editor and add your API key:
   ```bash
   # Required: Groq API Key for AI features
   GROQ_API_KEY=gsk_your_actual_api_key_here
   
   # Alternative key name (both work)
   API_KEY_GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

**Important**: 
- Never commit `.env.local` to Git (it's already in `.gitignore`)
- Keep your API key secret
- Don't share your `.env.local` file

---

## Environment Configuration

Your `.env.local` file should look like this:

```bash
# ============================================
# GROQ API CONFIGURATION (Required for AI)
# ============================================
# Get your free API key from: https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key_here
API_KEY_GROQ_API_KEY=your_groq_api_key_here

# ============================================
# SUPABASE CONFIGURATION (Optional)
# ============================================
# Only needed if you want to use persistent team data storage
# Get credentials from: https://supabase.com/dashboard
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# ============================================
# NEXT.JS CONFIGURATION (Optional)
# ============================================
# Uncomment if you want to change the default port (default: 3000)
# PORT=3000

# Uncomment for production deployments
# NODE_ENV=production
```

---

## Verify Your Installation

Before running the app, you can verify everything is set up correctly:

```bash
node verify-setup.js
```

This script checks:
- ✅ Node.js version (v18+)
- ✅ Dependencies installed
- ✅ Environment variables configured
- ✅ Required files present
- ✅ Port 3000 availability

If all checks pass, you're ready to run the app!

---

## Running the Application

### Development Mode (Recommended for Local Testing)

Start the development server with hot-reload:

```bash
npm run dev
```

Or with pnpm:
```bash
pnpm dev
```

You should see:
```
  ▲ Next.js 15.5.4
  - Local:        http://localhost:3000
  - Ready in X.Xs
```

**Open your browser** and navigate to:
```
http://localhost:3000
```

### Production Mode

To run a production build locally:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

---

## Using Demo Data

ScrumBot includes built-in demo data so you can test the app immediately:

### 1. Load Demo Transcript
- On the landing page, click **"Load Demo Transcript"**
- This loads a sample sprint planning meeting transcript
- No file upload needed!

### 2. Load Demo Team Data
- Click **"Load Demo Data"** to populate team information
- Includes 6 demo team members with skills, capacity, and work history
- Data persists in browser storage

### 3. Process & Review
- Click **"Process Transcript"** to extract user stories with AI
- Review AI recommendations for story assignments
- Adjust weight sliders (α, β, γ, δ) to customize recommendations
- Assign stories to team members
- Export to CSV for Jira import

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Option A: Kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option B: Use a different port
PORT=3001 npm run dev
```

---

#### 2. Module Not Found Errors

**Error**: `Cannot find module 'X'`

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
rm -rf .next
npm install

# Or with pnpm
pnpm install
```

---

#### 3. Groq API Errors

**Error**: `Failed to extract stories` or `AI_APICallError`

**Possible Causes**:
- Invalid API key
- Missing API key in `.env.local`
- Rate limit exceeded (free tier: 30 requests/min)
- Network connectivity issues

**Solution**:
```bash
# 1. Verify your .env.local file exists
ls -la .env.local

# 2. Check that your API key is valid
cat .env.local | grep GROQ

# 3. Restart the dev server after changing .env.local
# Press Ctrl+C to stop, then:
npm run dev

# 4. Test your API key with curl:
curl https://api.groq.com/openai/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

#### 4. TypeScript Errors

**Error**: `Type 'X' is not assignable to type 'Y'`

**Solution**:
```bash
# TypeScript errors are ignored in build (see next.config.mjs)
# But if you want to fix them:
npm run build

# Or check types manually:
npx tsc --noEmit
```

---

#### 5. Styling Issues / Tailwind Not Working

**Error**: Styles not applying correctly

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

---

#### 6. "Cannot read properties of undefined"

**Error**: Runtime error about undefined properties

**Solution**:
- Clear browser localStorage: Open DevTools → Application → Local Storage → Delete all
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Restart dev server

---

### Getting Help

If you encounter issues not covered here:

1. **Check the Console**: 
   - Browser DevTools → Console tab (F12)
   - Terminal where `npm run dev` is running

2. **Check GitHub Issues**: 
   - [github.com/YOUR_USERNAME/scrumbot/issues](https://github.com/YOUR_USERNAME/scrumbot/issues)

3. **Contact Us**:
   - Om Vyas: omvyas2@illinois.edu
   - Nakul Vasani: nvasani2@illinois.edu

---

## Optional: Supabase Setup

Supabase is used for persistent team data storage (CSV uploads). **This is optional** - the app works fine with demo data only.

### Why Use Supabase?
- Store team member data persistently
- Upload your own CSV files with team skills/capacity
- Share team data across devices
- Query team history for better recommendations

### Setup Steps

1. **Create a Supabase Account**:
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up for free
   - Create a new project

2. **Get Your Credentials**:
   - Navigate to: Project Settings → API
   - Copy the **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - Copy the **anon public** key (starts with `eyJ...`)

3. **Add to .env.local**:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
   ```

4. **Set Up Database Tables**:
   - In Supabase Dashboard, go to SQL Editor
   - Run the schema creation scripts from `/scripts/supabase-schema.sql` (if available)
   - Or the app will create tables automatically on first CSV upload

5. **Restart Your App**:
   ```bash
   npm run dev
   ```

Now you can upload custom CSV files with your team data!

---

## Project Structure Overview

Understanding the codebase:

```
scrumbot/
├── app/                        # Next.js 15 App Router
│   ├── page.tsx               # Landing page (upload & configure)
│   ├── loading/page.tsx       # AI processing page
│   ├── review/page.tsx        # Story review & assignment
│   ├── lock/page.tsx          # Final review & CSV export
│   └── api/                   # API routes
│       ├── extract-stories/   # AI story extraction endpoint
│       ├── rank-owners/       # RAG-based ranking endpoint
│       └── team-data/         # Supabase integration endpoints
│
├── components/                # React components
│   ├── story-card.tsx        # Story editing UI
│   ├── weight-tuner.tsx      # Weight adjustment sliders
│   ├── workload-summary.tsx  # Team capacity visualization
│   ├── onboarding-tutorial.tsx
│   ├── agile-explainer.tsx
│   ├── story-dependencies.tsx
│   └── ui/                   # shadcn/ui components
│
├── lib/                       # Core logic
│   ├── aiRank.ts             # AI-powered ranking with RAG
│   ├── mockRank.ts           # Fallback ranking algorithm
│   ├── parseTranscript.ts    # Transcript parsing (.vtt, .srt, .txt)
│   ├── csv.ts                # CSV export for Jira
│   └── store.ts              # Zustand state management
│
├── sample-transcripts/        # Demo data
├── public/                    # Static assets
├── styles/                    # Global CSS
├── types.ts                   # TypeScript definitions
├── .env.local                 # Your environment variables (DO NOT COMMIT)
├── .env.example              # Example environment variables
├── package.json              # Dependencies
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

---

## Next Steps

After successful installation:

1. ✅ **Explore the UI**: Load demo data and familiarize yourself with the interface
2. ✅ **Test AI Features**: Process the demo transcript and see AI recommendations
3. ✅ **Adjust Weights**: Experiment with the α, β, γ, δ sliders to see how recommendations change
4. ✅ **Try Your Own Data**: Upload your own meeting transcript (.vtt, .srt, or .txt)
5. ✅ **Read the Docs**: Check out the main [README.md](./README.md) for feature details
6. ✅ **Check Out**: [RAG_IMPROVEMENTS.md](./RAG_IMPROVEMENTS.md) and [UX_IMPROVEMENTS_SUMMARY.md](./UX_IMPROVEMENTS_SUMMARY.md) for technical deep-dives

---

## Development Tips

### Hot Reload
- The dev server automatically reloads when you change files
- Changes to `.env.local` require a server restart

### Debugging
- Use `console.log()` in your code
- Check browser DevTools → Console
- Check terminal output where `npm run dev` is running
- Use React DevTools browser extension for component inspection

### Code Formatting
```bash
# Run linter
npm run lint

# Format code (if configured)
npm run format
```

---

## Building for Production

When you're ready to deploy:

```bash
# Build optimized production bundle
npm run build

# Test production build locally
npm start

# Check build output
ls -lh .next/
```

For deployment guides, see:
- [Vercel Deployment](./DEPLOYMENT.md)
- [Docker Deployment](./DEPLOYMENT.md#docker)

---

## System Requirements

**Minimum**:
- 2 GB RAM
- 500 MB disk space
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)

**Recommended**:
- 4 GB RAM
- 1 GB disk space
- Fast internet connection (for Groq API calls)

---

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

## Support

**Documentation**:
- [README.md](./README.md) - Feature overview
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [RAG_IMPROVEMENTS.md](./RAG_IMPROVEMENTS.md) - AI implementation details
- [UX_IMPROVEMENTS_SUMMARY.md](./UX_IMPROVEMENTS_SUMMARY.md) - UI/UX features

**Contact**:
- Om Vyas: omvyas2@illinois.edu
- Nakul Vasani: nvasani2@illinois.edu

**GitHub**: [github.com/YOUR_USERNAME/scrumbot](https://github.com/YOUR_USERNAME/scrumbot)

---

**Happy Sprint Planning! 🚀**
