// Content script for analyzing shifting elements
// This script runs on all web pages to help identify layout shifting issues

console.log("Why Is It Always Shifting - Content Script Loaded");

const getDomPath = (el: Element): string | null => {
  let nodeName = el.nodeName.toLowerCase();
  if (el === document.body) return "body";
  if (el.id) nodeName += "#" + el.id;
  else if (el.classList.length) nodeName += "." + [...el.classList].join(".");
  if (!el.parentNode) return null;
  return getDomPath(el.parentNode as Element) + " " + nodeName;
};

const analyzeShiftingElements = () => {
  const elements = document.querySelectorAll("*");
  const shiftingElements: Element[] = [];

  for (const element of elements) {
    const computedStyle = window.getComputedStyle(element);

    if (
      computedStyle.overflow === "hidden" &&
      element.clientHeight &&
      element.scrollHeight > element.clientHeight
    ) {
      shiftingElements.push(element);
    }
  }

  const paths = new Map<string, Element[]>();

  for (const shiftingElement of shiftingElements) {
    const path = getDomPath(shiftingElement) ?? "(unknown element)";
    const elementsWithPath = paths.get(path) ?? [];
    elementsWithPath.push(shiftingElement);
    paths.set(path, elementsWithPath);
  }

  console.log(
    `Found ${shiftingElements.length} potential shifting elements:\n`,
    [...paths.entries()]
      .map(([path, els]) => `"${path}": ${els.length}`)
      .join("\n"),
  );

  // Send message to background service worker to update badge
  chrome.runtime.sendMessage({
    action: "updateBadge",
    data: { count: shiftingElements.length },
  });

  return shiftingElements;
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", analyzeShiftingElements);
} else {
  analyzeShiftingElements();
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "analyze") {
    analyzeShiftingElements();
    sendResponse();
    return false;
  }
  return false;
});
