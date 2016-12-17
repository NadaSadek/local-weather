main();
function main(){
  var url = "http://freegeoip.net/json/";
makeRequest(url,0);
}

function makeRequest(url, res){
var xmlhttp;
  console.log("res: " + res);
if (window.XMLHttpRequest) { 
   xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
 var Obj = JSON.parse(this.responseText);
   return getResponse(Obj,res);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();
}
}

function getResponse(obj,res){
  if(res == 0){
    if(obj){
    var city = obj.city;
    var country = obj.country_name;
    $('#location').html(city + ', ' + country);
var url2 = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=641397ea8fe91f38da4e55b4b283ab17"; 

  makeRequest(url2,2);
    }
       else {
       $('#location').html('No results found');
}  
            } 
  
  else if(res == 2){
    if(obj.main){
      var inF = Math.round(obj.main.temp - 273.15);
      $("#weather").html(inF + " °C");
      $("#weather3").html( obj.weather[0].description);
      $("#icon").html("<img src='http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png'>");
    }
    else {
      $('#weather').html('No results found');
    } 
  }
}
function change(){
  if(document.getElementById("button1").innerHTML == "°C"){
    var F = document.getElementById("weather").textContent.split(" ");
    var convert= (parseInt(F) - 32) * 5/9;
    console.log(F)
    $("#weather").html(convert + " °C");
  document.getElementById("button1").innerHTML = "°F";
  }
  else {
        var C = document.getElementById("weather").textContent.split(" ");
    var convert= (parseInt(C) * (9/5)) + 32;
    $("#weather").html(convert + " °F");
  document.getElementById("button1").innerHTML = "°C";
       }
}