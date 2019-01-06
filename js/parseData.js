/**
  * parseData.js
  * QOZ app
  * Created by Brandon Li on 1/4/19.
  * Copyright © 2019 Brandon Li. All rights reserved.
 */

document.getElementById('loader').style.visibility = 'hidden'; 
// set the loading to invisible
var loading = false; // keep track of the state


function parseData() {
  /**
  take the given input, and send a htttp get request to 
  https://geocoding.geo.census.gov/ to get the geoId, then call update view,
  which will send a http get request to our csv checking if the geo id is
  there or not and pdating the view
  */
  if (loading){
    return; 
  }

  removeElement("result"); 

  let input = document.getElementById("address").value;
  if (input){  
    document.getElementById('loader').style.visibility ='visible'; //we are now loading
    const HttpReq = new XMLHttpRequest();
    const url = "https://cors-anywhere.herokuapp.com/" 
                + "https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?address=" 
                + input 
                + "&benchmark=4&vintage=4&format=json";
    HttpReq.open("GET", url);
    HttpReq.send(null);

    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "loader"); 
    newDiv.setAttribute("id", "loader"); 
    loading = true;

    document.body.appendChild(newDiv);
    HttpReq.onreadystatechange = function() { 
      if (HttpReq.readyState == 4 && HttpReq.status == 200){
          if (HttpReq.responseText) {
              updateView(input,  HttpReq.responseText);
              document.getElementById('loader').style.visibility='hidden';
              loading = false;
          }
      }
    }
  }
  else{
      addResultHeading("You must enter a valid address")
  }    
}

function removeElement(elementId) {
  // Removes all elements from the document of the given ID
  var element = document.getElementById(elementId);
  while (element != null){   
    element = document.getElementById(elementId);
    if (element == null){
        return;
    }
    element.parentNode.removeChild(element);
  }
}

function updateView(address, str){
  /**
  try to parse the data and get the geo id from the json, and if there
  is an error, that means the user didn't enter a valid address
  */
  try {
    let h = JSON.parse(str);
    let geoId = h['result']
                 ['addressMatches']
                 [0]
                 ['geographies']
                 ['Census Tracts']
                 [0]
                 ['GEOID'];
    
    readCsv(address, geoId);
  } catch (err){
      addResultHeading(address + " is not a valid address");
  }

}



function addResultHeading(str){
  //add a heading to the view informing the user
  var newDiv = document.createElement("h1");
  newDiv.setAttribute("id", "result");

  var newHeading = document.createTextNode(str); 
  newDiv.appendChild(newHeading);  
  document.getElementById('main-container').appendChild(newDiv);
}

var result = "";

function readCsv(address, geoID){
  /**
  take the given id, and send a htttp get request to 
  the csv folder to see if it is inside, and update the view accordingly
  */
  file = "assets/designatedQualified.csv";
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, true);
  result = "";

  rawFile.onreadystatechange = function ()
  {   
    if(rawFile.readyState === 4){
      if(rawFile.status === 200 || rawFile.status == 0){
        var allText = rawFile.responseText;

        if (allText.indexOf(geoID) == -1){//not inside
           result = " NOT";
           
        }
        addResultHeading("" 
                        + address 
                        + " IS" 
                        + result 
                        +" within a designated qualified zone");
        addResultHeading("geoId: " + geoID);
        document.getElementById("result").innerHTML = makeBold("" 
                                                              + address 
                                                              + " IS" 
                                                              + result 
                                                              + " within a designated qualified zone"
                                                              , wordsToBold);
      }
    }
      
  }
  rawFile.send(null);
}

var wordsToBold=["IS", "NOT"];
function makeBold(input, wordsToBold) {
    return input.replace(new RegExp('(\\b)(' + wordsToBold.join('|') + ')(\\b)','ig'), '$1<b>$2</b>$3');
}

let textBox = document.getElementById("address");
  textBox.addEventListener("keydown", event => {
    if (event.key == "Enter"){
      parseData()
    }
  });