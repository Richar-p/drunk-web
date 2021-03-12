try {
	var switchStatus = false;
	chrome.runtime.onInstalled.addListener(() => {
		chrome.storage.sync.set({ switchStatus });
	});

	chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
		if (changeInfo.url && switchStatus) {
			let newUrl = getNewUrl(changeInfo.url)
			if (newUrl) {
				chrome.tabs.update(tab.id, {url: newUrl});
			}
		}
	});

	chrome.runtime.onMessage.addListener(function (request) {
		if (request.status === "change") {
			switchStatus = true;
			chrome.storage.sync.set({ switchStatus });
		}
	});

	function getNewUrl(url) {
		let forwarding = {}
		forwarding["https://www.youtube.com/"] = "https://vimeo.com"
		forwarding["https://www.facebook.com/"] = "https://twitter.com"

		if (url in forwarding) {
			return forwarding[url];
		}

		return false;
	}


} catch (e) {
	console.log(e);
};
