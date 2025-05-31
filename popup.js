// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Configuration
  const API_KEY = "your-api-key(steps in readme)"; 
  const API_URL = "https://api.lecto.ai/v1/translate/text";
  
  // Get DOM elements
  const translateBtn = document.getElementById('translateBtn');
  const summarizeBtn = document.getElementById('summarizeBtn');
  const inputText = document.getElementById('inputText');
  const output = document.getElementById('output');

  // Check if all elements exist
  if (!translateBtn || !summarizeBtn || !inputText || !output) {
    console.error('Extension Error: Required DOM elements not found');
    return;
  }

  // Premium loading animation
  function showLoading(button, action) {
    const originalContent = button.innerHTML;
    button.innerHTML = `<span class="loading"></span>${action}...`;
    button.disabled = true;
    
    return {
      stop: () => {
        button.innerHTML = originalContent;
        button.disabled = false;
      }
    };
  }

  // Show result in output div
  function showResult(content, isError = false) {
    if (isError) {
      output.innerHTML = `<div class="error-text">${content}</div>`;
    } else {
      output.innerHTML = `<div class="result-text">${content}</div>`;
    }
    // Scroll to top of output
    output.scrollTop = 0;
  }

  // Real translation function using Lecto API
  async function translateText(text) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-API-Key": API_KEY
        },
        body: JSON.stringify({
          texts: [text],
          to: ["hi"],   
          from: "en"
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Translation request failed with status ${response.status}: ${errorBody}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Parse API response
      if (data.translations && Array.isArray(data.translations) && data.translations[0]) {
        return {
          success: true,
          result: data.translations[0].translated
        };
      } else if (data.details && data.details.message) {
        return {
          success: false,
          error: data.details.message
        };
      } else {
        return {
          success: false,
          error: "Translation failed or API response format changed."
        };
      }

    } catch (error) {
      console.error("Translation error:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Mock summarization function 
  async function summarizeText(text) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple summarization logic 
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const summary = sentences.slice(0, Math.max(1, Math.ceil(sentences.length / 3))).join('. ') + '.';
    
    return {
      success: true,
      result: summary
    };
  }

  // Translate button event listener
  translateBtn.addEventListener('click', async function() {
    const text = inputText.value.trim();
    
    if (!text) {
      showResult('Please enter some text to translate.');
      return;
    }

    // Show loading animation
    const loading = showLoading(this, 'Translating');
    
    try {
      const result = await translateText(text);
      
      if (result.success) {
        showResult(result.result);
      } else {
        showResult(result.error, true);
      }
    } catch (error) {
      showResult('An unexpected error occurred during translation.', true);
      console.error('Translation error:', error);
    } finally {
      loading.stop();
    }
  });

  // Summarize button event listener
  summarizeBtn.addEventListener('click', async function() {
    const text = inputText.value.trim();
    
    if (!text) {
      showResult('Please enter some text to summarize.');
      return;
    }

    // Show loading animation
    const loading = showLoading(this, 'Summarizing');
    
    try {
      const result = await summarizeText(text);
      
      if (result.success) {
        showResult(result.result);
      } else {
        showResult(result.error, true);
      }
    } catch (error) {
      showResult('An unexpected error occurred during summarization.', true);
      console.error('Summarization error:', error);
    } finally {
      loading.stop();
    }
  });

  // Add subtle glow effect on focus
  inputText.addEventListener('focus', function() {
    this.style.boxShadow = '0 20px 40px rgba(139, 95, 191, 0.15), 0 0 0 1px rgba(139, 95, 191, 0.2), 0 0 20px rgba(139, 95, 191, 0.1)';
  });

  inputText.addEventListener('blur', function() {
    this.style.boxShadow = '';
  });

  // Keyboard shortcuts
  inputText.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to translate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      translateBtn.click();
    }
    // Ctrl/Cmd + Shift + Enter to summarize
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      summarizeBtn.click();
    }
  });

  // Initialize
  console.log('Translator & Summarizer extension loaded successfully');
});