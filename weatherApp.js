var APPID = "16ce9a8551aef1cae25297022c25cf7b ";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

function updateByZip(zip){
  var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&APPID=" + APPID;
  sendRequest(url);
}

//function updateByGeo(lat, lon){
//  var url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=16ce9a8551aef1cae25297022c25cf7b" +
//  "lat=" + lat +
//  "&lon=" + lon +
//  "&APPID=" + APPID;
//  sendRequest(url);
//  
//}
   //   //
function sendRequest(url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var data = JSON.parse(xmlhttp.responseText);
      
      
      var weather = {};
      weather.icon = data.weather[0].id;
      weather.humidity = data.main.humidity;
      weather.wind = data.wind.speed;
      weather.direction = degreesToDirection(data.wind.deg);
      weather.loc = data.name;
      weather.temp = K2F(data.main.temp);
      console.log(weather);
      update(weather);
    }
    
  };
  
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  
}

function degreesToDirection(degrees){
  var range = 360/16;
  var low = 360 - range/2;
  var high = (low + range) % 360;
  var angles = ["N", "NNE", "ENE", "E", "ESE", "SE", "SSE" , "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW" ];
  for(i in angles) {
    if(degrees >= low && degrees < high){
      return angles[i];
    }  
    low = (low + range) % 360;
    high = (high + range) % 360; 
  }
  return "N";
  
}

function K2F(k) {
  return Math.round(k*(9/5) - 459.64);
  
}



function update(weather){
  wind.innerHTML = weather.wind;
  direction.innerHTML = weather.direction;
  humidity.innerHTML = weather.humidity;
  loc.innerHTML = weather.loc;
  temp.innerHTML = weather.temp;
  icon.src="imgs/code/" + weather.icon + ".png";
  

}

function showPosition(position){
  updateByGeo(position.coords.latitude, position.coords.longitute);
  
}

window.onload = function () {
  temp = document.getElementById("temperature");
  loc = document.getElementById("location");
  icon = document.getElementById("icon");
  humidity = document.getElementById("humidity");
  wind = document.getElementById("wind");
  direction = document.getElementById("direction");
  
  var zip = window.prompt("Please Enter Your Zipcode")
       updateByZip(zip);
  
//  if(navigator.geolocation){
//    console.log(navigator.geolocation.getCurrentPosition(showPosition));
//
//    } else {
//        var zip = window.prompt("Could not locate your location. What is your zipcode?")
//        updateByZip(zip);
//      }      
}

