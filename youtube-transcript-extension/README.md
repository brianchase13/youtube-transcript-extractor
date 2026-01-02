# YouTube Transcript Extractor

A powerful browser extension for Brave/Chrome that extracts transcripts from YouTube videos with real-time search and **optional** AI-powered summarization.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ⭐ Core Features (No Setup Required)

- ✅ Extract transcripts from any YouTube video with captions
- ✅ **Real-time Search** within transcripts with highlighting
- ✅ Displays timestamps for each line  
- ✅ Copy transcript to clipboard
- ✅ Download transcript as a .txt file
- ✅ Clean, user-friendly interface
- ✅ Works with auto-generated and manual captions
- ✅ 100% local processing (no external APIs needed)

## 🤖 Optional AI Features

Want AI-powered summaries? Simply add your Anthropic API key:
- Generate concise summaries using Claude Sonnet 4
- Main topic/theme identification
- Key points extraction (bullet format)
- Important takeaways
- **Cost**: ~$0.003 per summary (less than a penny!)
- **Free tier**: $5 in credits = 1,600+ summaries

**The extension works perfectly without AI features!**

## 🚀 Installation

### For Brave Browser:

1. **Download this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/youtube-transcript-extractor.git
   cd youtube-transcript-extractor
   ```
   Or click "Code" → "Download ZIP" and extract

2. **Open Brave** and navigate to `brave://extensions/`

3. **Enable "Developer mode"** (toggle in top-right corner)

4. **Click "Load unpacked"** and select the folder

5. **Done!** The extension icon appears in your toolbar

### For Chrome Browser:

Same steps as above, but navigate to `chrome://extensions/` in step 2.

## 📖 How to Use

### Basic Usage (No Setup Required!)

1. Navigate to any YouTube video that has captions/subtitles
2. Click the extension icon in your browser toolbar
3. Click the "Extract Transcript" button
4. The transcript will appear with timestamps
5. Use the search box to find specific text
6. Copy or download the transcript

### Optional: Enable AI Summarization

**Want AI summaries? Follow these steps:**

1. Get a free API key from [console.anthropic.com](https://console.anthropic.com/) (See [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md))
2. Click the ⚙️ settings icon in the extension
3. Paste your API key and click "Save Settings"
4. After extracting a transcript, click "Generate Summary"
5. Wait 5-15 seconds for the AI-generated summary

**Note:** The extension works great without AI features! Summarization is completely optional.

## Requirements

- The YouTube video must have captions (either auto-generated or manually added)
- Videos without captions will show an error message

## Technical Details

This extension:
- Uses Manifest V3 (latest Chrome extension standard)
- Extracts transcript data directly from YouTube's internal API
- Integrates with Anthropic's Claude API for AI summarization
- Formats timestamps in MM:SS or HH:MM:SS format
- Works entirely client-side except for AI summarization
- Supports all languages that YouTube supports
- Uses debounced search for performance
- Securely stores API key locally in browser storage

## Files Structure

```
youtube-transcript-extension/
├── manifest.json       # Extension configuration (with storage permission)
├── popup.html         # Extension popup UI (with search & summary)
├── popup.css          # Styling for the popup (enhanced UI)
├── popup.js           # Main logic (transcript, search, AI summary)
├── icon16.png         # Extension icon (16x16)
├── icon48.png         # Extension icon (48x48)
├── icon128.png        # Extension icon (128x128)
└── README.md          # This file
```

## Troubleshooting

**"Please open a YouTube video page"**
- Make sure you're on a YouTube video page (URL contains `youtube.com/watch`)

**"No transcript available for this video"**
- The video doesn't have captions enabled
- Try a different video with captions

**"Could not find transcript data"**
- The video may have disabled captions
- YouTube's page structure may have changed (extension may need updating)

**"Please set your Anthropic API key in settings first"**
- Click the ⚙️ settings icon
- Enter your API key from [console.anthropic.com](https://console.anthropic.com/)
- Click "Save Settings"

**AI Summary fails or takes too long**
- Check your API key is correct
- Verify you have API credits remaining
- Long transcripts may take 10-20 seconds to summarize
- Check your internet connection

## Future Enhancements

Possible features to add:
- Language selection for multi-language videos
- Click timestamp to jump to that point in video (requires content script enhancement)
- Export to different formats (JSON, CSV, SRT)
- Different AI models (OpenAI, Gemini, etc.)
- Batch processing multiple videos
- Save summaries to local storage
- Compare transcripts across videos
- Custom summary prompts

## Privacy & Security

This extension:
- Does not collect or store any user data except your API key
- Stores API key locally in browser storage (never sent anywhere except Anthropic)
- Only accesses YouTube pages when you click the extract button
- Only sends transcript data to Anthropic API when you click "Generate Summary"
- All transcript processing happens locally in your browser
- Open source - you can review all code

**Your API Key:**
- Stored securely in Chrome's local storage
- Never shared with third parties
- Only used to authenticate with Anthropic's API
- You can remove it anytime by clearing the settings

## API Costs (Optional Feature)

The extension uses Anthropic's Claude Sonnet 4 model for AI summaries:
- Anthropic offers **$5 in free credits** for new accounts (~1,600 summaries!)
- Cost is approximately **$0.003 per video summary** (less than a penny)
- A typical 10-minute video costs less than 1 cent to summarize
- Check current pricing at [anthropic.com/pricing](https://www.anthropic.com/pricing)

## 📸 Screenshots

*Coming soon - screenshots showing:*
- Main interface with extracted transcript
- Search functionality with highlighting  
- AI summary generation
- Settings modal

## 🤝 Contributing

Contributions are welcome! Please check out [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Areas we'd love help with:**
- Click timestamps to jump to video position
- Multiple language selection
- Export formats (JSON, CSV, SRT)
- Batch processing
- UI/UX improvements

## 📚 Documentation

- **[README.md](README.md)** - Main documentation (you are here)
- **[API_SETUP_GUIDE.md](API_SETUP_GUIDE.md)** - How to get Anthropic API key  
- **[USAGE_EXAMPLES.md](USAGE_EXAMPLES.md)** - 10+ real-world usage examples
- **[FEATURES.md](FEATURES.md)** - Detailed feature documentation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

## 💬 Support

- **Issues:** [Create an issue](https://github.com/YOUR_USERNAME/youtube-transcript-extractor/issues)
- **Discussions:** Use GitHub Discussions for questions
- **Updates:** Watch/Star this repo for new releases

## 🎯 Roadmap

- [x] Basic transcript extraction
- [x] Real-time search with highlighting
- [x] Optional AI summarization
- [ ] Click timestamp to jump in video
- [ ] Multi-language caption selection
- [ ] Export to multiple formats (JSON, CSV, SRT)
- [ ] Batch processing for multiple videos
- [ ] Save summaries locally
- [ ] Custom AI prompts

## ⭐ Show Your Support

If you find this extension helpful:
- ⭐ **Star this repository**
- 🐛 **Report bugs** via issues
- 💡 **Suggest features** via discussions
- 🔀 **Submit pull requests**
- 📢 **Share with others**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by [Brian](https://github.com/YOUR_USERNAME)**

*Using: Vanilla JavaScript • Anthropic Claude API • Chrome Manifest V3 • YouTube Internal API*
