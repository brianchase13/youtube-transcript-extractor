# How to Deploy to GitHub

This guide will walk you through uploading the YouTube Transcript Extractor to your GitHub account.

## Prerequisites

- A GitHub account ([sign up free](https://github.com/join))
- Git installed on your computer ([download here](https://git-scm.com/downloads))

## Step 1: Create a New Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top-right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name:** `youtube-transcript-extractor` (or your preferred name)
   - **Description:** `Browser extension to extract YouTube transcripts with optional AI summarization`
   - **Visibility:** Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Link Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Navigate to your project folder
cd /path/to/youtube-transcript-extension

# Add the GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/youtube-transcript-extractor.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username.

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. The README.md will be displayed on the main page

## Step 4: Update README Links

Now that you know your GitHub URL, update the README:

1. Edit `README.md`
2. Replace `YOUR_USERNAME` with your actual GitHub username
3. Save the file
4. Commit and push the changes:

```bash
git add README.md
git commit -m "Update README with correct GitHub username"
git push
```

## Step 5: Enable GitHub Pages (Optional)

If you want a website for your project:

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under "Source", select **main** branch
5. Click **Save**
6. Your documentation will be available at: `https://YOUR_USERNAME.github.io/youtube-transcript-extractor`

## Step 6: Add Topics/Tags

Make your repository discoverable:

1. Go to your repository main page
2. Click the **⚙️ gear icon** next to "About"
3. Add topics: `browser-extension`, `youtube`, `transcript`, `chrome-extension`, `brave-browser`, `ai`, `claude`, `anthropic`
4. Add website URL if you enabled GitHub Pages
5. Click **Save changes**

## Step 7: Create a Release (Optional)

Create versioned releases for users:

1. Go to your repository
2. Click **Releases** on the right sidebar
3. Click **"Create a new release"**
4. Fill in:
   - **Tag version:** `v1.0.0`
   - **Release title:** `v1.0.0 - Initial Release`
   - **Description:** List features and installation instructions
5. Attach a ZIP of your extension files (optional)
6. Click **"Publish release"**

## Common Git Commands

### Making Changes

```bash
# Check status of files
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push
```

### Creating Branches

```bash
# Create new branch
git checkout -b feature/new-feature

# Switch back to main
git checkout main

# Push branch to GitHub
git push -u origin feature/new-feature
```

### Syncing Changes

```bash
# Pull latest changes from GitHub
git pull origin main

# View commit history
git log
```

## Troubleshooting

### "fatal: remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/youtube-transcript-extractor.git
```

### "Permission denied (publickey)"

Set up SSH keys or use HTTPS URL with personal access token:
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate new token with "repo" scope
3. Use token as password when pushing

### "Updates were rejected"

```bash
# Pull first, then push
git pull origin main --rebase
git push
```

## Next Steps After Upload

1. **Star your own repo** to make it visible
2. **Add a nice README badge** for license and stars
3. **Create issues** for planned features
4. **Set up GitHub Actions** for automated testing (advanced)
5. **Write a blog post** about your extension
6. **Share on social media** (Twitter, Reddit, LinkedIn)
7. **Submit to Chrome Web Store** (if going public)

## Sharing Your Extension

Once on GitHub, share the installation link:
```
https://github.com/YOUR_USERNAME/youtube-transcript-extractor
```

Users can then:
1. Click "Code" → "Download ZIP"
2. Extract the files
3. Follow installation instructions in README.md

## Making Your First Update

When you make changes:

```bash
# Make your changes to the code
# Then:
git add .
git commit -m "Add: Description of what you changed"
git push
```

## Repository Best Practices

1. **Write clear commit messages**
   - Good: "Fix: Search highlighting not working on long videos"
   - Bad: "fixed stuff"

2. **Update version in manifest.json** when making releases

3. **Keep documentation updated** with new features

4. **Respond to issues** users create

5. **Tag releases** with semantic versioning (v1.0.0, v1.1.0, etc.)

## Going Public

If you want more users:

1. **Polish the README** with screenshots
2. **Create a demo video** showing features
3. **Submit to browser extension stores**
4. **Post on Reddit** (r/chrome, r/browsers, r/webdev)
5. **Share on Product Hunt**
6. **Write on dev.to or Medium**

## Getting Help

- [GitHub Docs](https://docs.github.com/)
- [Git Documentation](https://git-scm.com/doc)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)

---

**Congratulations! Your extension is now on GitHub! 🎉**
