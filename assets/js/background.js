chrome.runtime.onMessage.addListener((message, sender)=> {
	if(!message.send_message_status) return;
	else {
        chrome.tabs.executeScript({
		    file: 'assets/js/inject.js'
        }); 
    }
});