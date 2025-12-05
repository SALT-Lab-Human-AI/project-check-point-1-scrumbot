# ScrumBot - Quick Reference

One-page reference for common commands and operations.

---

## 🚀 Quick Start

```bash
git clone <repo-url> && cd scrumbot
npm install
cp .env.example .env.local
# Add Groq API key to .env.local
npm run dev
```

Open: http://localhost:3000

---

## 📦 Installation Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `pnpm install` | Install with pnpm (faster) |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Check code quality |
| `node verify-setup.js` | Verify installation |

---

## 🔧 Development

### Start Dev Server
```bash
npm run dev
```
Access: http://localhost:3000

### Use Different Port
```bash
PORT=3001 npm run dev
```

### Clear Cache
```bash
rm -rf .next node_modules
npm install
```

### Restart After .env Changes
```bash
# Press Ctrl+C, then:
npm run dev
```

---

## 🔑 Environment Setup

### Required Variable
```bash
GROQ_API_KEY=gsk_your_key_here
```
Get key: https://console.groq.com/keys

### Optional Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
PORT=3000
```

### Check Environment
```bash
cat .env.local
node verify-setup.js
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `PORT=3001 npm run dev` |
| Module not found | `rm -rf node_modules && npm install` |
| AI not working | Check `GROQ_API_KEY` in `.env.local` |
| Styles broken | `rm -rf .next && npm run dev` |
| Changes not showing | Hard refresh: `Cmd+Shift+R` or `Ctrl+Shift+R` |
| TypeScript errors | Already ignored in build |

---

## 📂 Project Structure

```
scrumbot/
├── app/                    # Next.js pages & API routes
│   ├── page.tsx           # Landing page
│   ├── loading/           # Processing page
│   ├── review/            # Story review
│   ├── lock/              # Export page
│   └── api/               # Backend endpoints
├── components/            # React components
├── lib/                   # Core logic (AI, parsing, store)
├── sample-transcripts/    # Demo data
├── .env.local            # Your secrets (DO NOT COMMIT)
├── .env.example          # Template
└── verify-setup.js       # Setup checker
```

---

## 💡 Common Tasks

### Load Demo Data
1. Open app
2. Click "Load Demo Transcript"
3. Click "Load Demo Data"
4. Click "Process Transcript"

### Upload Custom Transcript
1. Prepare `.vtt`, `.srt`, or `.txt` file
2. Drag & drop on landing page
3. Load team data
4. Process transcript

### Adjust AI Weights
1. Go to review page
2. Adjust sliders: α (Competence), β (Availability), γ (Growth), δ (Continuity)
3. Re-process to see updated recommendations

### Export Sprint Plan
1. Complete story assignments
2. Click "Lock Sprint"
3. Click "Export CSV"
4. Import to Jira/Linear

---

## 🧪 Testing

### Manual Testing
```bash
npm run dev
# Open http://localhost:3000
# Test with demo data
```

### Verify Setup
```bash
node verify-setup.js
```

### Test API Key
```bash
curl https://api.groq.com/openai/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## 📊 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/extract-stories` | POST | Extract stories from transcript |
| `/api/rank-owners` | POST | Get AI owner recommendations |
| `/api/team-data/upload` | POST | Upload team CSV |
| `/api/team-data/query` | GET | Query team data |
| `/api/transcripts` | GET/POST | Manage transcripts |

---

## 🎨 UI Components

### Key Components
- `story-card.tsx` - Story editing
- `weight-tuner.tsx` - Weight sliders
- `workload-summary.tsx` - Team capacity
- `story-dependencies.tsx` - Dependency graph
- `onboarding-tutorial.tsx` - First-time help
- `agile-explainer.tsx` - Agile/Scrum guide

### State Management
```typescript
import { useStore } from '@/lib/store'

const { stories, setStories } = useStore()
```

---

## 🔒 Security Checklist

- [ ] `.env.local` in `.gitignore`
- [ ] No API keys in code
- [ ] No sensitive data in commits
- [ ] HTTPS in production
- [ ] Rotate keys if exposed
- [ ] Use `NEXT_PUBLIC_` only for client-side vars

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `README.md` | Project overview & quick start |
| `INSTALL.md` | Detailed setup guide |
| `RAG_IMPROVEMENTS.md` | AI implementation details |
| `UX_IMPROVEMENTS_SUMMARY.md` | UI/UX features |
| `DEPLOYMENT.md` | Production deployment |
| `.env.example` | Environment template |

---

## 🆘 Get Help

### Check First
1. Read error message carefully
2. Check browser console (F12)
3. Check terminal output
4. Try `node verify-setup.js`
5. Search GitHub Issues

### Contact
- Om Vyas: omvyas2@illinois.edu
- Nakul Vasani: nvasani2@illinois.edu
- GitHub: [Repository Issues](https://github.com/YOUR_USERNAME/scrumbot/issues)

---

## 🎯 Tips & Tricks

### Speed Up Development
- Use `pnpm` instead of `npm` (faster)
- Keep dev server running
- Use browser extensions: React DevTools, Redux DevTools

### Debugging
- Add `console.log()` statements
- Use browser DevTools (F12)
- Check Network tab for API calls
- Inspect Zustand store state

### Best Practices
- Test with demo data first
- Commit often
- Keep `.env.local` secret
- Use meaningful commit messages
- Document your changes

---

## 🚢 Deployment Quick Reference

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Manual Build
```bash
npm run build
npm start
```

---

## 📦 Package Management

### Update Dependencies
```bash
npm update
```

### Check for Vulnerabilities
```bash
npm audit
npm audit fix
```

### Add New Package
```bash
npm install package-name
```

---

## ⚡ Performance Tips

- Clear `.next` folder if build is slow
- Use `pnpm` for faster installs
- Reduce bundle size: check `npm run build` output
- Optimize images in `/public`
- Use React DevTools Profiler

---

## 🎓 Learning Resources

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev/
- **Tailwind**: https://tailwindcss.com/docs
- **Groq API**: https://console.groq.com/docs
- **Zustand**: https://zustand-demo.pmnd.rs/

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**License**: MIT
