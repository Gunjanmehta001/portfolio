# 🔗 Connect GitHub to Vercel (Auto-Deploy Setup)

You're at the Vercel login page. Follow these steps to enable auto-deployment:

---

## Step 1: Choose GitHub

On the Vercel page showing "Git Providers":
1. Click **"GitHub"** button
2. You'll be redirected to GitHub login

---

## Step 2: Authorize Vercel on GitHub

1. Log in with your GitHub credentials:
   - Email: `gunjanmehta.contact@gmail.com` (or your GitHub account)
   - Password: Your GitHub password

2. GitHub will ask to authorize Vercel:
   - Click **"Authorize vercel"**
   - Vercel gets permission to:
     - Read your repositories
     - Deploy on push
     - Manage webhooks

3. You'll be redirected back to Vercel

---

## Step 3: Import Your Repository

Back on Vercel:
1. You should see your repositories listed
2. Find and click on: **`Gunjanmehta001/Potfolio`**
3. Click **"Import"**

---

## Step 4: Configure & Deploy

Vercel shows build settings:
- **Project Name**: `portfolio` ✓
- **Framework**: Next.js (auto-detected) ✓
- **Build Command**: `npm run build` (default) ✓
- **Output Directory**: `.next` (default) ✓

Click **"Deploy"**

---

## Step 5: Wait for Build

Vercel will:
1. Clone from GitHub
2. Run `npm install`
3. Run `npm run build`
4. Deploy to CDN

⏱️ Takes about **2-3 minutes**

---

## 🎉 You're Done!

Once deployment finishes:
- You get a live URL: `https://potfolio-xxxxx.vercel.app`
- Every GitHub push → Auto-deploys
- No more manual steps needed

---

## Auto-Deploy is Now Active

From now on:
```bash
# Make changes locally
git add .
git commit -m "Update portfolio"
git push origin main

# ✨ Vercel automatically deploys within 60 seconds
```

---

## Custom Domain (Optional)

In Vercel Dashboard:
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records
4. SSL certificate auto-managed ✓

---

**Questions?** Check your Vercel email for deployment confirmation and links.
