const local = chrome.storage.local;
const blockSites = new Set(["www.reddit.com"]);
const limitSites = new Set(["www.youtube.com"]);
const currentSite = window.location.host;

window.addEventListener("beforeunload", () => {
	chrome.runtime.sendMessage({ message: "restart" });
});

if (limitSites.has(currentSite)) {
	chrome.runtime.sendMessage({ message: "limit", url: currentSite });
}

if (blockSites.has(currentSite)) window.close();
