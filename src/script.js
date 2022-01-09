var api = "https://fcc-weather-api.glitch.me/api/current?";
var tempUnit = 'C';
var currentTempInCelsius;

$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});
  $("#tempUnit").click(function(){
   var currentTempUnit=$("#tempUnit").text();
    var newTempUnit=currentTempUnit=='C'? 'F':'C';
    $("#tempUnit").text(newTempUnit);
    if(newTempUnit=='F'){
      var farTemp=Math.round(parseInt($("#temp").text())*9/5+32);
      $("#temp").text(farTemp+" "+String.fromCharCode(176));
    }
    else{
       $("#temp").text(currentTempInCelsius+" "+String.fromCharCode(176));
    }
  });
 function getWeather(lat,lon){
   var url=api+lat+ "&" + lon;
   $.ajax({
     url:url, success:function(result){
     $("#city").text(result.name+", ");
     $("#country").text(result.sys.country);
     currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
     $("#temp").text(currentTempInCelsius+" "+String.fromCharCode(176));
     $("#tempUnit").text(tempUnit);
     $("#description").text(result.weather[0].main);
     IconGen(result.weather[0].main);
   }
   });
 }
 function IconGen(desc){
   desc=desc.toLowerCase();
   switch(desc){
     case 'drizzle':
       $("#icon").append('<i class="far fa-cloud-drizzle"></i>');
        $("body").css('backgroundImage','url(https://c.tenor.com/AeaXKKx8CgQAAAAM/rain-droplets.gif)');
        $("#app").css('color','black');
      break;
    case 'clouds':
       $("#icon").append('<i class="fas fa-cloud"></i>');
       $("body").css('backgroundImage','url(https://www.adventurebikerider.com/wp-content/uploads/2017/10/tumblr_o27c7fByaO1tchrkco1_500.gif)');
       
      break;
    case 'rain':
       $("#icon").append('<i class="fas fa-cloud-showers-heavy"></i>');
        $("body").css('backgroundImage','url(https://i.gifer.com/origin/b6/b61f95537ed390713e4025ead3da967d.gif)');
      break;
    case 'snow':
       $("#icon").append('<i class="far fa-snowflake"></i>');
        $("body").css('backgroundImage','url(https://i.gifer.com/WNng.gif)');
       $("#app").css('color','black');
      break;
    case 'clear':
       $("#icon").append('<i class="fas fa-sun"></i>');
        $("body").css('backgroundImage','url(https://i.gifer.com/XFbw.gif)');
      $("#app").css('color','black');
      break;
    case 'thunderstom':
       $("#icon").append('<i class="fad fa-thunderstorm"></i>'); $("body").css('backgroundImage','url(https://64.media.tumblr.com/11cb9043189bf7677c593128a84ad006/d7fd55ae6a011f25-e3/s540x810/b9b0a5a04b1d325347175c81b99cf197c3feee4e.gif)');
      break;
    default:
      $("#icon").append('<i class="fas fa-cloud-sun-rain"></i>');
  }
}

  
  
   