$('.loc-list').on('change', function() {
    // Remove class if city changed again
    $('.weather-info').removeClass('animated fadeInDown');
    $('.weather-icon').removeClass('animated fadeInDown');

    var city_id = $('#loc-list').val();
    var app_id = '79d4dcc5b864a5c687e744a74e3485e0';

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?id=" + city_id + "&units=metric&appid=" + app_id, function(data) {

    // Getting latitude and longitude values to use for Google Timezone API
    var lat = data.coord.lat;
    var long = data.coord.lon;
    var loc = data.name;
    var icon = 'images/' + data.weather[0].icon + '.png';
    var temp = Math.floor(data.main.temp) + " C°";
    var weather_main = data.weather[0].main;
    var weather_desc = data.weather[0].description;

    $('.weather-info').addClass('animated fadeInDown');
    $('.weather-icon').addClass('animated fadeInDown');
    $('.location').html('<strong>' + loc + '</strong>')
    $('.weather-icon').attr('src', icon);
    $('.weather-icon').attr('alt', "Weather Icon");
    $('.weather-temp').html(temp);
    $('.weather-main').html(weather_main);
    $('.weather-desc').html(weather_desc);
    
    getLocationTime(lat, long);
    
    });
});


function getLocationTime(lat, long) {
    var currentDate = new Date();
    var timestamp = currentDate.getTime()/1000 + currentDate.getTimezoneOffset() * 60;
    var api_key = "KZGCIFLDYASE";

    $.getJSON("http://api.timezonedb.com/v2.1/get-time-zone?key=" + api_key + "&format=json&by=position&lat=" + lat + "&lng=" + long, function(data){
        var datetime = new Date(data.formatted);
        // // var hr = addZero(datetime.getHours());
        // // var min = addZero(datetime.getMinutes());
        // // var s = addZero(datetime.getSeconds());
        // // var time = hr + ":" + min + ":" + s;
        var time = datetime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        $('.local-time').text(time);
    });
    
    // ditch the setInterval for the meantime, unstable API call. 

    // setInterval(function(){
    //     // $.ajax({
    //     //     type: "GET",
    //     //     url: "http://api.timezonedb.com/v2.1/get-time-zone?key=" + api_key + "&format=json&by=position&lat=" + lat + "&lng=" + long,
    //     //     contentType: "text/plain",
    //     //     // crossDomain: true,
    //     //     // dataType: 'jsonp',
    //     //     xhrFields: {
    //     //         withCredentials: false
    //     //     },
    //     //     headers: {},
    //     //     success: function(data) {
    //     //         var datetime = new Date(data.formatted);
    //     //         var time = datetime.toLocaleTimeString();     
    //     //         $('.local-time').text(time);
    //     //     },
    //     //     error: function() {
    //     //         console.log("error");
    //     //     }
    //     // });
    // }, 2000);
    
}