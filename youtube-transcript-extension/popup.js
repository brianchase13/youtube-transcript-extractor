// Global variables
let currentTranscript = '';
let transcriptArray = [];
let currentHighlights = [];

document.addEventListener('DOMContentLoaded', function() {
  const extractBtn = document.getElementById('extractBtn');
  const copyBtn = document.getElementById('copyBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const settingsBtn = document.getElementById('settingsBtn');
  const summarizeBtn = document.getElementById('summarizeBtn');
  const searchInput = document.getElementById('searchInput');
  const modal = document.getElementById('settingsModal');
  const closeModal = document.querySelector('.close');
  const saveSettingsBtn = document.getElementById('saveSettings');
  
  extractBtn.addEventListener('click', extractTranscript);
  copyBtn.addEventListener('click', copyToClipboard);
  downloadBtn.addEventListener('click', downloadTranscript);
  settingsBtn.addEventListener('click', () => modal.classList.add('show'));
  closeModal.addEventListener('click', () => modal.classList.remove('show'));
  saveSettingsBtn.addEventListener('click', saveSettings);
  summarizeBtn.addEventListener('click', generateSummary);
  searchInput.addEventListener('input', debounce(searchTranscript, 300));
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
  
  // Load saved API key
  loadSettings();
});

async function loadSettings() {
  try {
    const result = await chrome.storage.local.get(['anthropicApiKey']);
    if (result.anthropicApiKey) {
      document.getElementById('apiKey').value = result.anthropicApiKey;
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

async function saveSettings() {
  const apiKey = document.getElementById('apiKey').value.trim();
  const statusDiv = document.getElementById('status');
  
  if (!apiKey) {
    statusDiv.className = 'error';
    statusDiv.textContent = 'Please enter an API key';
    return;
  }
  
  try {
    await chrome.storage.local.set({ anthropicApiKey: apiKey });
    statusDiv.className = 'success';
    statusDiv.textContent = 'Settings saved successfully!';
    document.getElementById('settingsModal').classList.remove('show');
    
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 2000);
  } catch (error) {
    statusDiv.className = 'error';
    statusDiv.textContent = 'Failed to save settings';
  }
}

async function extractTranscript() {
  const statusDiv = document.getElementById('status');
  const transcriptDiv = document.getElementById('transcript');
  const transcriptContainer = document.getElementById('transcript-container');
  const actionsDiv = document.getElementById('actions');
  const searchContainer = document.getElementById('search-container');
  const summaryContainer = document.getElementById('summary-container');
  
  // Show loading status
  statusDiv.className = 'loading';
  statusDiv.textContent = 'Extracting transcript...';
  transcriptContainer.classList.remove('visible');
  actionsDiv.style.display = 'none';
  searchContainer.style.display = 'none';
  summaryContainer.style.display = 'none';
  
  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if we're on a YouTube page
    if (!tab.url.includes('youtube.com/watch')) {
      throw new Error('Please open a YouTube video page');
    }
    
    // Execute the content script to extract transcript
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractTranscriptFromPage
    });
    
    const result = results[0].result;
    
    if (result.error) {
      throw new Error(result.error);
    }
    
    if (!result.transcript || result.transcript.length === 0) {
      throw new Error('No transcript available for this video. The video may not have captions.');
    }
    
    // Store transcript data
    transcriptArray = result.transcript;
    currentTranscript = formatTranscript(result.transcript);
    transcriptDiv.innerHTML = formatTranscriptHTML(result.transcript);
    
    // Show success
    statusDiv.className = 'success';
    statusDiv.textContent = 'Transcript extracted successfully!';
    transcriptContainer.classList.add('visible');
    actionsDiv.style.display = 'block';
    searchContainer.style.display = 'block';
    summaryContainer.style.display = 'block';
    
  } catch (error) {
    statusDiv.className = 'error';
    statusDiv.textContent = `Error: ${error.message}`;
  }
}

// This function runs in the context of the YouTube page
function extractTranscriptFromPage() {
  try {
    // Get the video ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('v');
    
    if (!videoId) {
      return { error: 'Could not find video ID' };
    }
    
    // Try to get the transcript data from the page
    const scripts = document.querySelectorAll('script');
    let transcriptData = null;
    
    for (const script of scripts) {
      const content = script.textContent;
      if (content.includes('captionTracks')) {
        try {
          // Extract the ytInitialPlayerResponse object
          const match = content.match(/var ytInitialPlayerResponse = ({.+?});/);
          if (match) {
            const playerResponse = JSON.parse(match[1]);
            const captionTracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
            
            if (captionTracks && captionTracks.length > 0) {
              // Get the first available caption track
              const captionUrl = captionTracks[0].baseUrl;
              return fetchTranscriptFromUrl(captionUrl);
            }
          }
        } catch (e) {
          console.error('Error parsing player response:', e);
        }
      }
    }
    
    return { error: 'Could not find transcript data. The video may not have captions enabled.' };
    
  } catch (error) {
    return { error: error.message };
  }
}

function fetchTranscriptFromUrl(url) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    
    if (xhr.status === 200) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
      const textElements = xmlDoc.getElementsByTagName('text');
      
      const transcript = [];
      for (let i = 0; i < textElements.length; i++) {
        const element = textElements[i];
        const text = element.textContent
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
        
        const start = parseFloat(element.getAttribute('start'));
        const duration = parseFloat(element.getAttribute('dur'));
        
        transcript.push({
          text: text.trim(),
          start: start,
          duration: duration
        });
      }
      
      return { transcript: transcript };
    } else {
      return { error: 'Failed to fetch transcript data' };
    }
  } catch (error) {
    return { error: 'Error fetching transcript: ' + error.message };
  }
}

function formatTranscript(transcript) {
  return transcript.map(item => {
    const timestamp = formatTimestamp(item.start);
    return `[${timestamp}] ${item.text}`;
  }).join('\n\n');
}

function formatTranscriptHTML(transcript) {
  return transcript.map((item, index) => {
    const timestamp = formatTimestamp(item.start);
    return `<p data-index="${index}"><span class="timestamp" data-time="${item.start}">[${timestamp}]</span>${item.text}</p>`;
  }).join('');
}

function formatTimestamp(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}

// Search functionality
function searchTranscript(event) {
  const query = event.target.value.toLowerCase().trim();
  const transcriptDiv = document.getElementById('transcript');
  const searchResults = document.getElementById('searchResults');
  
  // Clear previous highlights
  currentHighlights.forEach(index => {
    const p = transcriptDiv.querySelector(`p[data-index="${index}"]`);
    if (p) {
      p.classList.remove('highlight');
      p.innerHTML = p.innerHTML.replace(/<mark>/g, '').replace(/<\/mark>/g, '');
    }
  });
  currentHighlights = [];
  
  if (!query) {
    searchResults.textContent = '';
    return;
  }
  
  // Search and highlight
  let matchCount = 0;
  transcriptArray.forEach((item, index) => {
    if (item.text.toLowerCase().includes(query)) {
      matchCount++;
      currentHighlights.push(index);
      
      const p = transcriptDiv.querySelector(`p[data-index="${index}"]`);
      if (p) {
        p.classList.add('highlight');
        
        // Highlight the matched text
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        const textSpan = p.querySelector('span.timestamp').nextSibling;
        if (textSpan) {
          const highlightedText = item.text.replace(regex, '<mark>$1</mark>');
          const timestamp = formatTimestamp(item.start);
          p.innerHTML = `<span class="timestamp" data-time="${item.start}">[${timestamp}]</span>${highlightedText}`;
        }
      }
    }
  });
  
  searchResults.textContent = matchCount > 0 
    ? `Found ${matchCount} match${matchCount !== 1 ? 'es' : ''}`
    : 'No matches found';
  
  // Scroll to first match
  if (currentHighlights.length > 0) {
    const firstMatch = transcriptDiv.querySelector(`p[data-index="${currentHighlights[0]}"]`);
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// AI Summarization
async function generateSummary() {
  const statusDiv = document.getElementById('status');
  const summaryDiv = document.getElementById('summary');
  const summarizeBtn = document.getElementById('summarizeBtn');
  
  // Check if API key is set
  const result = await chrome.storage.local.get(['anthropicApiKey']);
  if (!result.anthropicApiKey) {
    statusDiv.className = 'error';
    statusDiv.textContent = 'Please set your Anthropic API key in settings first';
    return;
  }
  
  if (!currentTranscript) {
    statusDiv.className = 'error';
    statusDiv.textContent = 'Please extract a transcript first';
    return;
  }
  
  // Show loading state
  summarizeBtn.disabled = true;
  summaryDiv.className = 'loading';
  summaryDiv.textContent = '';
  statusDiv.className = 'loading';
  statusDiv.textContent = 'Generating AI summary...';
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': result.anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `Please provide a concise summary of this YouTube video transcript. Include:
1. Main topic/theme (1-2 sentences)
2. Key points (3-5 bullet points)
3. Important takeaways (2-3 sentences)

Transcript:
${currentTranscript}`
        }]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }
    
    const data = await response.json();
    const summary = data.content[0].text;
    
    // Display summary
    summaryDiv.className = '';
    summaryDiv.textContent = summary;
    statusDiv.className = 'success';
    statusDiv.textContent = 'Summary generated successfully!';
    
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 2000);
    
  } catch (error) {
    summaryDiv.className = '';
    summaryDiv.textContent = '';
    statusDiv.className = 'error';
    statusDiv.textContent = `Error: ${error.message}`;
  } finally {
    summarizeBtn.disabled = false;
  }
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(currentTranscript);
    
    const statusDiv = document.getElementById('status');
    statusDiv.className = 'success';
    statusDiv.textContent = 'Transcript copied to clipboard!';
    
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 2000);
  } catch (error) {
    const statusDiv = document.getElementById('status');
    statusDiv.className = 'error';
    statusDiv.textContent = 'Failed to copy to clipboard';
  }
}

async function downloadTranscript() {
  try {
    // Get video title from the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const title = tab.title.replace(' - YouTube', '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    // Create a blob with the transcript
    const blob = new Blob([currentTranscript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and click it
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}_transcript.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    const statusDiv = document.getElementById('status');
    statusDiv.className = 'success';
    statusDiv.textContent = 'Transcript downloaded!';
    
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 2000);
  } catch (error) {
    const statusDiv = document.getElementById('status');
    statusDiv.className = 'error';
    statusDiv.textContent = 'Failed to download transcript';
  }
}

// Debounce helper function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
