# Quick Setup Guide: Getting Your Anthropic API Key

Follow these steps to get your free Anthropic API key and enable AI summarization:

## Step 1: Create an Anthropic Account

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Click "Sign Up" or "Get Started"
3. Create an account with your email
4. Verify your email address

## Step 2: Get Your API Key

1. Once logged in, go to [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. Click "Create Key" or "+ Create Key"
3. Give it a name (e.g., "YouTube Transcript Extension")
4. Click "Create Key"
5. **IMPORTANT:** Copy the key immediately - you won't be able to see it again!
   - It will look like: `sk-ant-api03-xxxxx...`

## Step 3: Add API Key to Extension

1. Open the YouTube Transcript Extension
2. Click the ⚙️ (settings) icon in the top right
3. Paste your API key in the "Anthropic API Key" field
4. Click "Save Settings"
5. Done! You can now use AI summarization

## Step 4: Test It Out

1. Go to any YouTube video with captions
2. Click "Extract Transcript"
3. Click "Generate Summary"
4. Wait 5-10 seconds for the AI summary to appear

## Free Credits

Anthropic provides free API credits for new accounts:
- $5 in free credits when you sign up
- Each video summary costs about $0.003 (less than a penny)
- That's approximately 1,600+ video summaries with free credits!

## Pricing (After Free Credits)

- Claude Sonnet 4: $3 per million input tokens
- Average 10-minute video: ~1,000 tokens
- Cost per summary: approximately $0.003
- 100 summaries = $0.30 (30 cents)

Check latest pricing: [anthropic.com/pricing](https://www.anthropic.com/pricing)

## Troubleshooting

**"Invalid API key" error:**
- Make sure you copied the entire key (starts with `sk-ant-`)
- Check for any extra spaces before or after the key
- Create a new key if the old one was deleted

**"Quota exceeded" error:**
- You've used all your free credits
- Add a payment method in the Anthropic Console
- Check your usage: [console.anthropic.com/settings/usage](https://console.anthropic.com/settings/usage)

**Summary takes too long:**
- Long videos (30+ minutes) may take 15-20 seconds
- Check your internet connection
- Try again - sometimes API requests timeout

## Security

- Your API key is stored locally in your browser
- Never share your API key with anyone
- You can delete it anytime from extension settings
- You can revoke keys from the Anthropic Console

## Need Help?

- Anthropic Documentation: [docs.anthropic.com](https://docs.anthropic.com/)
- Anthropic Support: [support.anthropic.com](https://support.anthropic.com/)
- Extension Issues: Check the main README.md file
