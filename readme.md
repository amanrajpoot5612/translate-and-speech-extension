# Translate & Speech Browser Extension

A simple browser extension that translates selected text and converts text to speech.

## Features

- **Translate Text**: Select any text on a webpage and translate it
- **Text-to-Speech**: Listen to selected text in different voices
- **Right-click Context Menu**: Easy access to translation and speech features
- **Multiple Languages**: Support for popular languages

## Planned Features

- **Text Summarization**: Using Hugging Face API for content summarization
- **Auto-copy Translation**: Automatically copy translated text to clipboard
- **YouTube Video Summarization**: Summarize YouTube video content
- **Bug fixes**: Improve performance and fix minor issues

## Installation

1. Download or clone this repository
2. Open Chrome/Firefox and go to Extensions page
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder

## Usage

1. Select any text on a webpage
2. Right-click to open context menu
3. Choose "Translate Text" or "Speak Text"
4. View results in the popup

## API Setup (Required)

This extension requires you to provide your own API keys:

1. **Translation**: Get a free API key from Google Translate or similar service
2. **AI Features**: Get a Hugging Face API key for summarization features
3. Add your API keys in the extension settings

## Files Structure

```
translate-speech-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── content.js            # Content script for webpage interaction
├── background.js         # Background service worker
├── options.html          # Settings page
├── options.js            # Settings functionality
└── icons/               # Extension icons
```

## Tech Used

- **HTML/CSS/JavaScript**: Core extension code
- **Chrome Extension APIs**: For browser integration
- **Translation APIs**: Google Translate, DeepL, etc.
- **Web Speech API**: For text-to-speech functionality

## Known Issues

- Speech may interrupt when switching between texts quickly
- Large text selections may be slow to process
- Some languages may not support speech synthesis

## Version History

**v0.1.1 (Current)**
- Basic translation and speech functionality
- Right-click context menu
- Settings page for configuration
- Hugging Face integration for summarization

**v0.2.0 (Planned)**
- Enhanced UI/UX with theme support
- Context menu summarization and translation
- Dark mode and light mode toggle
- YouTube video summarization
- Auto-copy translated text
- Performance improvements and bug fixes

## License

MIT License - see LICENSE file for details.

---

**Note**:
         This extension follows the "Bring Your Own API Key" pattern for security and cost reasons. You'll need to get your own free API keys from the respective services.

---

***Known Issues***

Large text selections may take longer to process
API rate limits depend on your Lecto.AI plan
Internet connection required for all features

***Troubleshooting API Key Issues***

Make sure your API key is correctly pasted in popup.js
Verify your Lecto.AI account has sufficient credits
Check that there are no extra spaces or quotes around the API key

***Extension Not Working***

Ensure Developer mode is enabled in your browser
Try reloading the extension after making changes
Check browser console for any error messages

***Security & Privacy***

No Data Storage: Your API key is only stored locally in the extension files
Direct API Calls: All requests go directly to Lecto.AI, not through third-party servers
User Control: You control your own API usage and costs
Open Source: All code is visible and auditable

---
Visit [Lecto.Ai](https://dashboard.lecto.ai/)
Get your API Key and paste that in the
Popup.js file -->

    const API_KEY = "your-api-key(steps in
    readme)"; 


<img src="public\api_key.png" alt="Refrence n the Source Code" />

---


```
Sample Popup Image
```
<img src="public\sample_popup.png" alt="Refrence n the Source Code" />

```
Sample Text Image
```
<img src="public\sample_text.png" alt="Refrence n the Source Code" />


-----


```
Sample Translation Image
```

<img src="public\sample_translation.png" alt="Refrence n the Source Code" />

---

**Important Notes**

⚠️ This extension requires your own Lecto.AI API key to function
🔒 Your API key is stored locally and never shared
💰 You pay only for your own API usage
🚀 More features coming in the next version!
