#!/bin/bash
# One-step push to GitHub + deploy to Vercel

set -e

echo "🚀 Portfolio Push & Deploy Script"
echo "================================"
echo ""

# Step 1: GitHub Authentication
echo "Step 1: GitHub Authentication"
echo "Using GitHub CLI (gh)..."

if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI not found. Install from https://cli.github.com"
    exit 1
fi

# Check if already authenticated
if ! gh auth status &> /dev/null; then
    echo "🔐 Logging in to GitHub..."
    gh auth login
else
    echo "✅ Already authenticated with GitHub"
fi

# Step 2: Push to GitHub
echo ""
echo "Step 2: Pushing code to GitHub..."
echo "Repository: Gunjanmehta001/Potfolio"

git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub!"
else
    echo "❌ Push failed. Check your permissions."
    exit 1
fi

# Step 3: Deploy to Vercel
echo ""
echo "Step 3: Deploying to Vercel..."
echo ""

if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🔐 Vercel Authentication..."
vercel login

echo ""
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "Your portfolio is now live on Vercel!"
echo "Check your email for the deployment URL or visit:"
echo "  https://vercel.com/dashboard"
echo ""
echo "Features:"
echo "  - Press 7 to toggle day/night"
echo "  - Press 1-6 for fast travel"
echo "  - Shake mouse to grow cursor"
echo "  - Click to swing sword/torch"
