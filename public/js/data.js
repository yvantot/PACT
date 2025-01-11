const session = chrome.storage.session;
const listBlock = new Set();

chrome.runtime.onMessage.addListener((receive, _, send) => {
	if (receive.message === "restart") chrome.runtime.reload();
	if (receive.message === "limit") {
		const url = receive.url;
		// If it's not scheduled
		if (!listBlock.has(url)) {
			// Add to schedule
			listBlock.add(url);
			setTimeout(async () => {
				const tabs = await chrome.tabs.query({});
				const toBlock = tabs.filter((tab) => tab.url.includes(url)).map((tab) => tab.id);
				await chrome.tabs.remove(toBlock);
				// After operation, delete from schedule list
				listBlock.delete(url);
			}, 10000);
		}
	}
});
