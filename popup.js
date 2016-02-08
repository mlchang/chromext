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
        var ratings = obj[Object.keys(obj)[0]];
        var categories = obj[Object.keys(obj)[1]];
        

        document.getElementById('zeroRep').innerHTML = ratings["0"][0];
        document.getElementById('zeroCon').innerHTML = ratings["0"][1];
        document.getElementById('oneRep').innerHTML  = ratings["1"][0];
        document.getElementById('oneCon').innerHTML  = ratings["1"][1];
        document.getElementById('twoRep').innerHTML  = ratings["2"][0];
        document.getElementById('twoCon').innerHTML  = ratings["2"][1];
        document.getElementById('fourRep').innerHTML = ratings["4"][0];
        document.getElementById('fourCon').innerHTML = ratings["4"][1];

        document.getElementById('target').innerHTML = ratings["target"];
        //document.getElementById('categories').innerHTML = categories;
        var categoryString = JSON.stringify(ratings["categories"]);
        document.getElementById('categories').innerHTML = categoryString;
        var safe;
        var list = "";
        for(var i = 0; i < 4; i++){
          if(i == 3){
            i++;
          }
          list == list +  ", ";
          list == list +  i.toString();
          if( ratings[i.toString()][0] > 80){
            safe = false;

          }
        }

        document.getElementById('list').innerHTML = list;
        if(safe == false){
          document.getElementById('safetyRating').innerHTML = 'This site has excellent safety';
        } else {
          document.getElementById('safetyRating').innerHTML = 'This site does not have excellent safety';
        }
      }
    }
);
