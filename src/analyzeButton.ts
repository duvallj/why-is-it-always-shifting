export const setupAnalyzeButton = (element: HTMLButtonElement) => {
  element.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    if (!tab?.id) {
      console.log("no active tab");
      return;
    }
    await chrome.tabs.sendMessage(tab.id, { action: "analyze" });
  });
};
