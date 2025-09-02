console.log('Why Is It Always Shifting - Background Service Worker Loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);

  if (request.action === 'updateBadge') {
    const count = request.data?.count || 0;

    chrome.action.setBadgeText({
      text: count > 0 ? count.toString() : '',
      tabId: sender.tab?.id
    });

    sendResponse();
    return true;
  }

  return false;
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed/updated, clearing all badges');
  chrome.action.setBadgeText({ text: '' });
});
