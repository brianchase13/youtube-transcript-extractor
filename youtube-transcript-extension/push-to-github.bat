@echo off
REM YouTube Transcript Extractor - GitHub Push Script (Windows)
REM Run this script after extracting the ZIP file

echo.
echo YouTube Transcript Extractor - GitHub Setup
echo =========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo Git is not installed. Please install Git first:
    echo https://git-scm.com/downloads
    pause
    exit /b 1
)

echo Git is installed
echo.

REM Get GitHub username
set /p github_username="Enter your GitHub username: "

if "%github_username%"=="" (
    echo Username cannot be empty
    pause
    exit /b 1
)

echo.
echo Repository will be: https://github.com/%github_username%/youtube-transcript-extractor
echo.
set /p confirm="Is this correct? (y/n): "

if /i not "%confirm%"=="y" (
    echo Cancelled
    pause
    exit /b 1
)

echo.
echo Setting up Git repository...

REM Initialize git if not already done
if not exist ".git" (
    git init
    git config user.name "%github_username%"
    set /p user_email="Enter your email: "
    git config user.email "%user_email%"
)

REM Update README with username
echo Updating README with your username...
powershell -Command "(Get-Content README.md) -replace 'YOUR_USERNAME', '%github_username%' | Set-Content README.md"
powershell -Command "(Get-Content DEPLOY_INSTRUCTIONS.md) -replace 'YOUR_USERNAME', '%github_username%' | Set-Content DEPLOY_INSTRUCTIONS.md"
powershell -Command "(Get-Content QUICK_REFERENCE.md) -replace 'YOUR_USERNAME', '%github_username%' | Set-Content QUICK_REFERENCE.md"

REM Stage all files
echo Staging files...
git add .

REM Commit
echo Creating commit...
git commit -m "Initial commit: YouTube Transcript Extractor"

REM Add remote
echo Adding GitHub remote...
git remote add origin "https://github.com/%github_username%/youtube-transcript-extractor.git"

REM Rename branch to main
git branch -M main

echo.
echo IMPORTANT: Before running the next command...
echo.
echo 1. Go to: https://github.com/new
echo 2. Create a repository named: youtube-transcript-extractor
echo 3. Choose: Public
echo 4. DO NOT initialize with README, .gitignore, or license
echo 5. Click 'Create repository'
echo.
set /p created="Have you created the repository? (y/n): "

if /i not "%created%"=="y" (
    echo.
    echo Please create the repository first, then run:
    echo    git push -u origin main
    pause
    exit /b 0
)

echo.
echo Pushing to GitHub...
echo You may be prompted for your GitHub credentials...
echo.

git push -u origin main

if errorlevel 0 (
    echo.
    echo Success! Your extension is now on GitHub!
    echo.
    echo View it at: https://github.com/%github_username%/youtube-transcript-extractor
    echo.
    echo Next steps:
    echo 1. Add repository topics: browser-extension, youtube, transcript, chrome-extension
    echo 2. Create a release (v1.0.0^)
    echo 3. Share your work!
    echo.
) else (
    echo.
    echo Push failed. This might be because:
    echo    - Repository doesn't exist yet
    echo    - Wrong credentials
    echo    - Network issue
    echo.
    echo Try running: git push -u origin main
)

pause
