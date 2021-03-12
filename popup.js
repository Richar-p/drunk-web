let switchButton = document.getElementById('btn-switch')

switchButton.addEventListener("click", async (e) => {
	chrome.runtime.sendMessage({status: "change"});
	if (switchButton.innerText == 'start') {
		switchButton.innerText = 'stop'
	} else {
		switchButton.innerText = 'start'
	}
});