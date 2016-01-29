var currentSite = window.location.href;
loadDoc();

function loadDoc(){
	var apiURL = "https://api.mywot.com/0.4/public_link_json2?hosts=";
	var xhttp = new XMLHttpRequest();
	var message = {};
		message['directive'] = "apiJSON";
	if(currentSite.length && currentSite.length > 1){
		apiURL = apiURL + currentSite + '&callback=process&key=5d11e87dde284d4dfce6126cc507dffb4d23740e';
	}

	var xhttp = new XMLHttpRequest();
	
	xhttp.open("GET", apiURL, false);
	xhttp.send();
	message['directive'] = "apiJSON";
	message['apiResult'] = xhttp.responseText;
	console.log(xhttp.responseText);
	var jsonStr = JSON.stringify(xhttp.responseText);
	//REMOVE PROCESS STRING
	var trimmedStr = jsonStr.substr(8, jsonStr.length - 1);
	//var newReponse = JSON.parse(trimmedStr);
	//console.log(newReponse);
	console.log(trimmedStr);
	console.log(jsonStr);
	console.log(xhttp.responseText['www.wikipedia.org']);
	chrome.runtime.sendMessage( message, function(response) {
		console.log(response.farewell);
	});
	//document.getElementById("jsonResult").innerHTML = xhttp.responseText;
}
