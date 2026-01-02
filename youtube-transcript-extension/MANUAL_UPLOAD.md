# MANUAL GITHUB UPLOAD GUIDE

If the automated scripts don't work, here's the manual way:

## Method 1: GitHub Web Interface (Easiest)

1. Go to: https://github.com/new
2. Create repository:
   - Name: `youtube-transcript-extractor`
   - Description: `Browser extension to extract YouTube transcripts with optional AI summarization`
   - Public
   - Don't check any boxes
3. Click "Create repository"
4. On the next page, click "uploading an existing file"
5. Drag and drop ALL files from this folder
6. Scroll down and click "Commit changes"
7. Done!

## Method 2: GitHub Desktop (Recommended)

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in
3. File → Add Local Repository
4. Browse to this folder
5. Click "Publish Repository"
6. Name: `youtube-transcript-extractor`
7. Description: `Browser extension to extract YouTube transcripts`
8. Choose Public
9. Click "Publish Repository"
10. Done!

## Method 3: Command Line

Open Terminal/Command Prompt in this folder:

### Step 1: Create Repository on GitHub
Go to https://github.com/new and create `youtube-transcript-extractor`

### Step 2: Run These Commands

```bash
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: YouTube Transcript Extractor"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/youtube-transcript-extractor.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Method 4: VS Code

1. Open this folder in VS Code
2. Click Source Control icon (left sidebar)
3. Click "Publish to GitHub"
4. Follow prompts
5. Done!

## After Upload - Important!

1. Replace "YOUR_USERNAME" in README.md with your actual username
2. Edit and commit the change:
   ```bash
   git add README.md
   git commit -m "Update username in README"
   git push
   ```

## Getting Your GitHub Personal Access Token (If Needed)

If Git asks for password:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: `Git Access`
4. Check: `repo` scope
5. Click "Generate token"
6. Copy the token (starts with `ghp_`)
7. Use this as your password when pushing

## Troubleshooting

**"fatal: remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/youtube-transcript-extractor.git
```

**"Permission denied"**
- Use GitHub Desktop instead, or
- Set up Personal Access Token (see above)

**"Repository not found"**
- Make sure you created the repository on GitHub first
- Check the URL is correct

## Need More Help?

1. Try GitHub Desktop - it's the easiest
2. Ask ChatGPT or Claude with the error message
3. Google the error message
4. Check: https://docs.github.com/en/get-started

## Files to Upload

Make sure you upload ALL these files:
- manifest.json
- popup.html
- popup.css  
- popup.js
- icon16.png, icon48.png, icon128.png
- README.md
- LICENSE
- All other .md files
- .gitignore

## What NOT to Upload

- .git folder (only if using web interface)
- create_icons.py (not needed by users)
- Any .pyc or __pycache__ folders

## Once It's On GitHub

Your repo will be at:
https://github.com/YOUR_USERNAME/youtube-transcript-extractor

Share this link!

## Questions?

The extension is complete and ready to share. Just get it on GitHub and you're done!
