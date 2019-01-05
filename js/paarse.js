function parseData() {
    removeElement("result");
    let txt_val = document.getElementById("address").value;
    if (txt_val){ 


        const HttpReq = new XMLHttpRequest();
        const url = "https://cors-anywhere.herokuapp.com/" + "https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?address=" + txt_val + "&benchmark=4&vintage=4&format=json";

        HttpReq.open("GET", url);
        HttpReq.send(null);

        HttpReq.onreadystatechange = function() { 
            if (HttpReq.readyState == 4 && HttpReq.status == 200)
                updateView(HttpReq.responseText);
        }
    }
    else{
        addResultHeading("You must enter a valid address")
    }
    
    
}
function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    if (element != null){   
        element.parentNode.removeChild(element);
    }
}

function updateView(str){
    try {
        let h = JSON.parse(str);
        let geoId = h['result']['addressMatches'][0]['geographies']['Census Tracts'][0]['GEOID'];
        addResultHeading(geoId);
    } catch (err){
        addResultHeading("oops: something went wrong");
    }

}



function addResultHeading(str){
    var newDiv = document.createElement("h1");
    newDiv.setAttribute("id", "result");

    var newHeading = document.createTextNode(str); 
    newDiv.appendChild(newHeading);  
    document.body.appendChild(newDiv);
}