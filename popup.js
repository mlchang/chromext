// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
  chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='" + e.target.id + "'"}, function(){ console.log("made it into the callback"); } );
  window.close();
}


document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});


function clickHandler(e) {
    chrome.runtime.sendMessage({directive: "popup-click"}, function(response) {
         // close the popup when the background finishes processing request
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('click-me').addEventListener('click', clickHandler);
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.directive = "apiJSON"){
        var obj = request.apiResult;
        var target = obj[Object.keys(obj)[0]];
        var categories = obj[Object.keys(obj)[0]];
        

        document.getElementById('zeroRep').innerHTML = target["0"][0];
        document.getElementById('zeroCon').innerHTML = target["0"][1];
        document.getElementById('oneRep').innerHTML  = target["1"][0];
        document.getElementById('oneCon').innerHTML  = target["1"][1];
        document.getElementById('twoRep').innerHTML  = target["2"][0];
        document.getElementById('twoCon').innerHTML  = target["2"][1];
        document.getElementById('fourRep').innerHTML = target["4"][0];
        document.getElementById('fourCon').innerHTML = target["4"][1];

        var jsonStr = JSON.stringify(request.apiResult);
        document.getElementById('jsonResult').innerHTML = jsonStr;
      }
    }
);
