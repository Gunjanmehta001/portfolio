@echo off
REM One-step push to GitHub + deploy to Vercel (Windows)

echo.
echo ========================================
echo   Portfolio Push and Deploy to Vercel
echo ========================================
echo.

REM Step 1: Check GitHub CLI
echo Step 1: GitHub Authentication
where gh >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: GitHub CLI not found
    echo Install from: https://cli.github.com
    pause
    exit /b 1
)

REM Authenticate if needed
gh auth status >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo 🔐 Logging in to GitHub...
    call gh auth login
) else (
    echo ✅ Already authenticated with GitHub
)

REM Step 2: Push to GitHub
echo.
echo Step 2: Pushing code to GitHub...
echo Repository: Gunjanmehta001/Potfolio
echo.

call git push -u origin main
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Push failed. Check your GitHub permissions.
    pause
    exit /b 1
)

echo ✅ Code pushed successfully!

REM Step 3: Deploy to Vercel
echo.
echo Step 3: Deploying to Vercel...
echo.

where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo 📦 Installing Vercel CLI...
    call npm install -g vercel
)

echo.
echo 🔐 Vercel Authentication (if first time)...
call vercel login

echo.
echo 🚀 Deploying to Vercel...
call vercel --prod

echo.
echo ========================================
echo ✅ DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your portfolio is now live on Vercel!
echo.
echo Portfolio Features:
echo   • Press 7 to toggle day/night mode
echo   • Press 1-6 for fast travel between sections
echo   • Shake your mouse to grow the cursor
echo   • Click to swing sword/torch
echo.
echo Check deployment at:
echo   https://vercel.com/dashboard
echo.
pause
