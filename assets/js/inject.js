startTimer = async() => { 
    setTimeout(inject, 2000); 
}

eventFire = async(myElement, ElementType) => { 
    let myEvent = document.createEvent("MouseEvents"); 
    myEvent.initMouseEvent(ElementType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
    myElement.dispatchEvent(myEvent); 
}

inject = async() => { 
    let messageBox      = document.querySelectorAll("[contenteditable='true']")[1]; 
    let userCount       = new Promise(function(resolve, reject) {
        chrome.storage.sync.get({"count": true}, function(options) { 
            resolve(options.count); 
        })
    });
    
    let userMessage = new Promise(function(resolve, reject) {
        chrome.storage.sync.get({"message": true}, function(options) { 
            resolve(options.message); 
        })
    });

    let counter = await userCount; 
    let message = await userMessage;
    for (i = 0; i < counter; i++) { 
        event                   = document.createEvent("UIEvents"); 
        messageBox.innerHTML    = message; 
        event.initUIEvent("input", true, true, window, 1); 
        messageBox.dispatchEvent(event); 

        if(message && counter) { 
            eventFire(document.querySelector('span[data-icon="send"]'), 'click'); 
        }
    } 
}

startTimer();
