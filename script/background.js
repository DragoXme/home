// background.js

chrome.action.onClicked.addListener(function() {
    chrome.tabs.create({ url: "chrome://newtab" });
  });
  