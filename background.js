chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed: context menu added");
  chrome.contextMenus.create({
    id: "translateAndRead",
    title: "Translate and Read Text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log("Context menu clicked:", info, tab);  // <== Check this appears

  if (info.menuItemId === "translateAndRead") {
    const selectedText = info.selectionText;
    console.log("Selected text:", selectedText);

    try {
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
      console.log("Translation response:", data);
      const translatedText = data.translatedText;

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (text) => {
          const utterance = new SpeechSynthesisUtterance(text);
          speechSynthesis.speak(utterance);
        },
        args: [translatedText]
      });
    } catch (err) {
      console.error("Translation or TTS error:", err);
    }
  }
});
