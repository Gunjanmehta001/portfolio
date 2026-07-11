# 📝 Rename GitHub Repository

Rename `Potfolio` → `portfolio` (fix the typo)

---

## Step 1: Go to Repository Settings

1. Visit: https://github.com/Gunjanmehta001/Potfolio
2. Click **Settings** (top right)
3. Scroll down to **"Repository name"**

---

## Step 2: Rename

1. Change: `Potfolio` → `portfolio`
2. Click **"Rename"** button
3. Confirm the warning

---

## Step 3: Update Local Git Remote

After GitHub renames it, run this in PowerShell:

```powershell
cd "c:\Users\GunjanMehta\OneDrive - Hapticware\Desktop\Me\Portfolio"

# Update the remote URL
git remote set-url origin https://github.com/Gunjanmehta001/portfolio.git

# Verify
git remote -v
```

Expected output:
```
origin  https://github.com/Gunjanmehta001/portfolio.git (fetch)
origin  https://github.com/Gunjanmehta001/portfolio.git (push)
```

---

## Step 4: Done! ✅

Your repo is now:
- **GitHub**: https://github.com/Gunjanmehta001/portfolio
- **Local**: Updated to match

Now proceed with Vercel deployment using the new URL.
