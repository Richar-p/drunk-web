let switchButton = document.getElementById('btn-switch')

switchButton.addEventListener("click", async () => {
	chrome.runtime.sendMessage( { status: "change" } );
	switchButton.innerText = switchButton.innerText === 'Start' ? 'Stop' : 'Start'
});

window.onload = function() {
	chrome.storage.sync.get('switchStatus', (item) => {
		switchButton.innerText = item['switchStatus'] ? 'Stop' : 'Start'
	});
};
