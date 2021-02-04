$(document).ready(function () {

    // var cities = ["chicago","new york","china"]

    
    
    // localStorage.setItem("cities", JSON.stringify(cities));
    // console.log(localStorage)

// for (var i=0; i <cities.length; i++) {
   
//     console.log(i);
// }

// cities.forEach(function(){
//     var cities = JSON.parse(localStorage.getItem("cities"))
//     console.log(cities);
// })
// function init (){
//     var cities = JSON.parse(localStorage.getItem("cities"))

//     renderHistory();



// }

 


    //click event to get search city name and store to local storage 
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        // var cities = JSON.parse(localStorage.getItem("cities"))

        //pushing user input city to local storage
        var city = $("#searchTerm").val().trim();
        var testCity = []
        testCity.push(city)
        // localStorage.setItem("task", JSON.stringify(testCity))
        console.log(testCity);
        
        localStorage.setItem("task", JSON.stringify(testCity))
        var searchHistory = JSON.parse(localStorage.getItem("task"))
       
        for (var i = 0 ; i <searchHistory.length; i++){
           // console.log(searchHistory[i]);
           var storedCity = $("<button>").addClass("list-group-item").attr("id", "searchedCity").text(searchHistory[i]);
           
           storedCity.on("click", function(){
               var searchedCity = $(this).html();
               console.log(searchedCity);
               $("#currentConditionDisplay").empty();
               $("#foreCast").empty("#forecast");
               searchWeather(searchedCity);

           })
               $("#searchHistory").append(storedCity);
       };

        // var searchHistory = JSON.parse(localStorage.getItem("task"))

        // console.log(searchHistory);
        

       
        // // var value = city

        // localStorage.setItem("cities", JSON.stringify(city));

        // var cityHistory = JSON.parse(localStorage.getItem("cities"));

        // console.log(cityHistory);



        searchWeather(city);
        // console.log(city);


        // // if (cities.index(city) === -1) {
           
        //    var cities =  localStorage.setItem("cities", JSON.stringify(cities));
        //     cities.push(city);
        
        // console.log(cities);

        // console.log(city);

    })
   
//    $("#searchedCity").on("click", function(ev){
//        ev.preventDefault();
//        console.log("hello")
//    });
//    console.log(searchedCity);
    //create list items for search history 
    // function createListItems(text) {
    //     var li = $("<li>").addClass("list-group-item").text(text);
    //     $("#searchHistory").append(li);
    // }

    //push searchTerm to api to get weather conditions including below and append to #currentConditionDisplay:
    // create function to get lat and lon from input city name
    function searchWeather(name) {

        var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&units=imperial&appid=a72e07c808e0cdfc9d609b54001dafa3'


        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                getForecast(data.coord.lat, data.coord.lon);

                console.log(data);

                // adding condition in dynamicaly
                var cityName = $("<h1>").attr("id", "city").text(data.name)
                // adding date to cityName
                var apiDate = data.dt;
                var date = new Date(apiDate * 1000);
                var dt = $("<h2>").text(date.toDateString())


                // adding icon to cityName
                var iconCode = data.weather[0].icon
                var iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '.png'
                console.log(iconUrl);


                var iconImg = $("<img>").attr({ "id": "iconImg", "src": iconUrl, "alt": "weather icon" })


                //adding current conditions
                var temperature = $("<p>").attr("id", "temp").text("Temperature: " + data.main.temp + "°F")
                var humidity = $("<p>").attr("id", "hum").text("Humidity: " + data.main.humidity + "%")
                var windSpeed = $("<p>").attr("id", "windSpeed").text("Wind Speed: " + data.wind.speed + " MPH")



                $("#currentConditionDisplay").empty(cityName, iconImg, dt, temperature, humidity, windSpeed,);
                $("#foreCast").empty("#forecast");
               


                $("#currentConditionDisplay").append(cityName, iconImg, dt, temperature, humidity, windSpeed,);
            });
    }

      // currentConditions();
    // create function to use lat and lon to get addtional info
    function getForecast(lat, lon) {
        var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly&units=imperial&appid=a72e07c808e0cdfc9d609b54001dafa3'

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data.daily);

                var uvIndex = $("<p>").attr("id", "uvIndex").text("UV Index: " + data.current.uvi)
                
                $("#currentConditionDisplay").append(uvIndex);

                //loop info fetched from api to dynamicaly create card for 5day forecast 
                for (var i = 1; i < 6; i++) {
                    var cardBody = $("<article>").addClass("card col-2 mx-2 card-body icon").attr("id", "forecast")


                    // var card = $("<div>").addClass("card")
                    // var cardBody = $("<div>").addClass("card-body")

                    //create date using luxon and info taken from api
                    var apiDate = data.daily[i].dt;
                    var date = new Date(apiDate * 1000);

                    //generate icon
                    var iconCode = data.daily[i].weather[0].icon
                    var iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '.png'
                    console.log(iconUrl);

                    var iconP = $("<div>")
                    var iconImg = $("<img>").attr({ "id": "iconImg", "src": iconUrl, "alt": "weather icon" })

                    //generate date
                    var dt = $("<h5>").text(date.toDateString())
                    //generate temp
                    var temp = $("<p>").text("Temp: " + data.daily[i].temp.day+" °F")
                    //generate humidity
                    var hum = $("<p>").text("Humidity: " + data.daily[i].humidity+ "%")


                    //append all to html
                   
                    $("#foreCast").append(cardBody)
                    // col.append(card);
                    // card.append(cardBody);

                    cardBody.append(dt, iconP, temp, hum);
                    iconP.append(iconImg);

                }


            })

    }

    //cityname, date, icon representations of weather conditions , temperture, humidity, wind speed, uv index
    //color indicates uv index is favorable, moderate , or severe

    //create 5 day forecast append to #futureDisplay
    //each day with date display, icon, temperature , and humidity
    //save searchTerm to display in #searchHistory section 

})







