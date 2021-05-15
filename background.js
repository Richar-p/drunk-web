try {

	let switchStatus = false;
	const forwarding = chrome.runtime.getURL('forwarding.json');

	chrome.runtime.onInstalled.addListener(() => {
		chrome.storage.sync.set({ switchStatus });
	});

	chrome.tabs.onUpdated.addListener( async (tabId, changeInfo, tab) => {
		if (switchStatus) {
			chrome.scripting.executeScript({target: {tabId: tabId}, files: ['artefact.js'] })
			if (changeInfo.url) {
				let newUrl = await getNewUrl(changeInfo.url)
				if (newUrl) {
					chrome.tabs.update(tab.id, {url: newUrl});
				}
			}
		}
	});

	chrome.runtime.onMessage.addListener( (request) => {
		if (request.status === "change") {
			switchStatus = !switchStatus;
			chrome.storage.sync.set({ switchStatus });
		}
	});

	async function getNewUrl(url) {
		let response = await fetch(forwarding);

		if (response.ok) {
			let json = await response.json();
			return url in json ? json[url] : false
		} else {
			console.log("HTTP-Error: " + response.status);
		}
	}

} catch (e) {
	console.log(e);
};
