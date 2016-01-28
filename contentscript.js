console.log("About to fire Ajax Call");
console.log(window.location.href);
console.log(document.URL);
var currentSite = window.location.href;
loadDoc();

function loadDoc(){
	var apiURL = "https://api.mywot.com/0.4/public_link_json2?hosts="
	if(currentSite.length && currentSite.length > 1){
		apiURL = apiURL + currentSite + '/&callback=process&key=5d11e87dde284d4dfce6126cc507dffb4d23740e';
	}
	console.log(apiURL);
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", apiURL, false);
	xhttp.send();
	console.log(xhttp.responseText);
	document.getElementById("jsonResult").innerHTML = xhttp.responseText;
}

// Sending a request from a content script looks like this:
/*
chrome.runtime.sendMessage({greeting:
})
*/