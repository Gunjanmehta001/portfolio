# 🚀 Deployment Guide

## Push to GitHub

```bash
# Navigate to the portfolio folder
cd "c:\Users\GunjanMehta\OneDrive - Hapticware\Desktop\Me\Portfolio"

# Authenticate with GitHub (if not already set up)
# Option 1: Use GitHub CLI
gh auth login

# Option 2: Use personal access token (PAT)
# 1. Create a PAT at https://github.com/settings/tokens (scope: repo)
# 2. Use it as password when git asks, or:
git config --global credential.helper store
# Then enter your PAT when prompted

# Push the code
git push -u origin main
```

## Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (from the portfolio directory)
vercel

# Follow the prompts:
# - Link to Gunjanmehta001/Potfolio repository
# - Set project name to "portfolio"
# - Framework preset: Next.js
# - Output directory: .next
```

### Option 2: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository: `Gunjanmehta001/Potfolio`
3. Vercel will auto-detect Next.js
4. Click "Deploy"
5. Your site will be live at `https://portfolio-<random>.vercel.app`

### Option 3: Automatic Deployment (Recommended)

After pushing to GitHub once, connect your repo to Vercel:

1. Visit https://vercel.com/new
2. Import `Gunjanmehta001/Potfolio`
3. Vercel will auto-deploy on every push to `main`
4. Custom domain setup in Vercel dashboard

## Environment Variables

Add to Vercel (if needed for future email service):

```
NEXT_PUBLIC_EMAIL_SERVICE_KEY=<your_key>
NEXT_PUBLIC_EMAIL_SERVICE_ID=<your_id>
```

## Post-Deployment

- Your site is live and will auto-update on every GitHub push
- Share the Vercel URL with recruiters
- Portfolio features:
  - **Day/Night cycle**: Press `7` or click hotbar slot 7
  - **Fast travel**: Press `1-6` to jump to sections
  - **Shake to grow**: Wiggle mouse left-right rapidly
  - **Click to swing**: Sword slashes with particles
  - **Walking cursor**: Custom pixel explorer with natural stride

---

**Status**: Ready to push & deploy ✨
