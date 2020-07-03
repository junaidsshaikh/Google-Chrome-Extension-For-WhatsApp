chrome.storage.sync.clear();
let button = document.getElementById("btnSend");
let validation = document.getElementById("validation");

sleep = async (ms)=>{ return new Promise(resolve => setTimeout(resolve, ms)); }

sending = async ()=>{
    button.innerHTML    = "Sending."; await sleep(500); 
    button.innerHTML    = "Sending.."; await sleep(500);
    button.innerHTML    = "Sending..."; await sleep(500);
    button.innerHTML    = "Message Sent"; await sleep(1500);
    button.innerHTML    = "Send";
}

button.addEventListener("click", async ()=> {
    let message = document.getElementById("txtMessage").value;
    let count   = document.getElementById("txtCount").value;

    if(!message || !count){
        validation.innerHTML    = "Some fields are empty!";
        validation.className    = "show"; await sleep(2000);
        validation.className    = validation.className.replace("show", "");
    } else if(count > 200){
        validation.innerHTML    = "The count limit is 200";
        validation.className    = "show"; await sleep(3000);
        validation.className    = validation.className.replace("show", "");
        count=2;
        sending();
    } else if(count < 1){
        validation.innerHTML    = "Count limit set to 1";
        validation.className    = "show"; await sleep(3000);
        validation.className    = validation.className.replace("show", "");
        count=1;
        sending();
    }
    chrome.storage.sync.set({"message": message});
    chrome.storage.sync.set({"count": count});  
    chrome.runtime.sendMessage({"send_message_status": true});
});