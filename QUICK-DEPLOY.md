# ⚡ Quick Deploy to GitHub & Vercel

## What You Need
- GitHub account: https://github.com/Gunjanmehta001
- Vercel account (free): https://vercel.com

---

## Step 1: Create GitHub Personal Access Token (5 min)

1. Go to: https://github.com/settings/tokens/new
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: `portfolio-deploy`
4. Expiration: 90 days (or custom)
5. Scopes: Check `repo` (full control)
6. Click "Generate token"
7. **Copy the token** (you won't see it again)

---

## Step 2: Push to GitHub

Open PowerShell in your Portfolio folder and run:

```powershell
# Set your GitHub token (paste your token where it says YOUR_TOKEN_HERE)
$token = "YOUR_TOKEN_HERE"
$url = "https://$token@github.com/Gunjanmehta001/Potfolio.git"

# Configure git to use the token
git remote set-url origin $url

# Push the code
git push -u origin main

# Remove the token from git config for safety
git remote set-url origin https://github.com/Gunjanmehta001/Potfolio.git
```

Expected output:
```
Enumerating objects: 36, done.
...
✅ Successfully pushed to GitHub!
```

---

## Step 3: Deploy to Vercel (3 min)

### Option A: Automatic (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Paste: `https://github.com/Gunjanmehta001/Potfolio`
4. Click "Continue"
5. Click "Import"
6. Vercel auto-detects Next.js → Click "Deploy"
7. **Wait 60 seconds** → Your portfolio is live! 🎉

Vercel will give you a URL like: `https://potfolio-xxxxx.vercel.app`

### Option B: Via Vercel CLI

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Follow prompts and your site goes live
```

---

## Step 4: Set Custom Domain (Optional)

In Vercel Dashboard → Settings → Domains:
- Add your custom domain (if you have one)
- Update DNS records
- Vercel handles SSL automatically

---

## ✅ You're Done!

Your portfolio is now:
- 📱 Live on the internet
- 🚀 Auto-deploying on every GitHub push
- ⚡ Served by Vercel's global CDN
- 🔒 HTTPS by default

Share the URL with recruiters!

**Portfolio Features:**
- Press `7` → Toggle day/night
- Press `1-6` → Fast travel
- Shake mouse → Grow cursor
- Click → Swing sword/torch

---

## Troubleshooting

**"Permission denied"**
- Double-check your token is correct
- Make sure Potfolio repo exists at github.com/Gunjanmehta001/Potfolio

**"Repository not found"**
- Verify you're pushing to the right URL
- Check the spelling: `Gunjanmehta001/Potfolio` (capital P)

**Vercel deployment stuck**
- Refresh the page
- Check Vercel > Deployments tab
- Default Next.js config builds in ~2 minutes

---

**Questions?** See DEPLOY.md for full instructions.
