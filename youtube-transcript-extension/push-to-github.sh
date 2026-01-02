#!/bin/bash

# YouTube Transcript Extractor - GitHub Push Script
# Run this script after extracting the ZIP file

echo "🚀 YouTube Transcript Extractor - GitHub Setup"
echo ""
echo "This script will help you push to GitHub"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " github_username

if [ -z "$github_username" ]; then
    echo "❌ Username cannot be empty"
    exit 1
fi

echo ""
echo "📝 Repository will be: https://github.com/$github_username/youtube-transcript-extractor"
echo ""
read -p "Is this correct? (y/n): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "❌ Cancelled"
    exit 1
fi

echo ""
echo "Setting up Git repository..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    git init
    git config user.name "$github_username"
    read -p "Enter your email: " user_email
    git config user.email "$user_email"
fi

# Update README with username
echo "Updating README with your username..."
sed -i.bak "s/YOUR_USERNAME/$github_username/g" README.md
sed -i.bak "s/YOUR_USERNAME/$github_username/g" DEPLOY_INSTRUCTIONS.md
sed -i.bak "s/YOUR_USERNAME/$github_username/g" QUICK_REFERENCE.md
rm -f *.bak

# Stage all files
echo "Staging files..."
git add .

# Commit
echo "Creating commit..."
git commit -m "Initial commit: YouTube Transcript Extractor

Features:
- Extract transcripts from YouTube videos
- Real-time search with highlighting
- Optional AI summarization using Claude Sonnet 4
- Copy and download transcripts
- Clean, modern UI
- Privacy-focused (no data collection)"

# Add remote
echo "Adding GitHub remote..."
git remote add origin "https://github.com/$github_username/youtube-transcript-extractor.git"

# Rename branch to main
git branch -M main

echo ""
echo "⚠️  IMPORTANT: Before running the next command..."
echo ""
echo "1. Go to: https://github.com/new"
echo "2. Create a repository named: youtube-transcript-extractor"
echo "3. Choose: Public"
echo "4. DO NOT initialize with README, .gitignore, or license"
echo "5. Click 'Create repository'"
echo ""
read -p "Have you created the repository? (y/n): " created

if [ "$created" != "y" ] && [ "$created" != "Y" ]; then
    echo ""
    echo "❌ Please create the repository first, then run:"
    echo "   git push -u origin main"
    exit 0
fi

echo ""
echo "Pushing to GitHub..."
echo "You may be prompted for your GitHub credentials..."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Success! Your extension is now on GitHub!"
    echo ""
    echo "View it at: https://github.com/$github_username/youtube-transcript-extractor"
    echo ""
    echo "Next steps:"
    echo "1. Add repository topics: browser-extension, youtube, transcript, chrome-extension"
    echo "2. Create a release (v1.0.0)"
    echo "3. Share your work!"
    echo ""
else
    echo ""
    echo "❌ Push failed. This might be because:"
    echo "   - Repository doesn't exist yet"
    echo "   - Wrong credentials"
    echo "   - Network issue"
    echo ""
    echo "Try running: git push -u origin main"
fi
