# Contributing to YouTube Transcript Extractor

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser version and OS
- Screenshots if applicable

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:
- Clear description of the feature
- Use case / why it's needed
- Potential implementation approach (optional)

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/youtube-transcript-extractor.git
   cd youtube-transcript-extractor
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Test your changes thoroughly
   - Update documentation if needed

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

## Development Setup

1. Clone the repository
2. Make changes to the code
3. Test in browser:
   - Go to `brave://extensions/` or `chrome://extensions/`
   - Click "Reload" on the extension
   - Test your changes on YouTube

## Code Style

- Use meaningful variable names
- Comment complex logic
- Keep functions focused and small
- Use ES6+ JavaScript features
- Follow existing formatting

## Testing

Before submitting a PR, test:
- ✅ Transcript extraction from various videos
- ✅ Search functionality with different queries
- ✅ AI summarization (if applicable)
- ✅ Copy and download features
- ✅ Error handling
- ✅ Different video lengths and languages

## Areas for Contribution

Current priority areas:
1. **Click timestamp to jump to video** - Make timestamps clickable
2. **Multi-language support** - Let users choose caption language
3. **Export formats** - Add JSON, CSV, SRT export options
4. **Batch processing** - Process multiple videos at once
5. **UI improvements** - Better responsive design
6. **Testing** - Add automated tests
7. **Documentation** - Improve guides and examples

## Questions?

Feel free to create an issue with the "question" label.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow GitHub's Community Guidelines

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
