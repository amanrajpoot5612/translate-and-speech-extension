chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translateAndRead",
    title: "Translate and Read Text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "translateAndRead") {
    const selectedText = info.selectionText;

    // Translate the selected text
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: selectedText,
        source: "auto",
        target: "en",
        format: "text"
      })
    });

    const data = await response.json();
    const translatedText = data.translatedText;

    // Use TTS to read the translation
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
      },
      args: [translatedText]
    });
  }
});
