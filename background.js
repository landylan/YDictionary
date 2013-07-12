/**
  @author ArvinH
**/


var controller = true;
function onAndoff() {
   if(controller){
        chrome.browserAction.setBadgeText({text: "ON"});
        //send message to content.js
        chrome.tabs.query({}, function(tabs) {
            var message = {text: "ON"};
            for (var i=0; i<tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, message);
            }
        });
        console.log('ON')
        controller = false;
    }
    else{
        chrome.browserAction.setBadgeText({text: "OFF"});
        chrome.tabs.query({}, function(tabs) {
            var message = {text: "OFF"};
            for (var i=0; i<tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, message);
            }
        });
        controller = true;
        console.log('OFF')
   }
}

chrome.browserAction.onClicked.addListener(onAndoff);
onAndoff();