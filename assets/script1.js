$(document).ready(function () {


    var cities = JSON.parse(localStorage.getItem("cities"))

    // localStorage.setItem("cities", JSON.stringify(cities));
    // console.log(localStorage)




    //click event to get search city name and store to local storage 
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();

        var city = $("#searchTerm").val().trim();
        searchWeather(city);

        if (cities.indexOf(city) === -1) {
            cities.push(city);
            localStorage.setItem("cities", JSON.stringify(cities));
        }
        console.log(cities);

        console.log(city);

    })

    //create list items for search history 
    function createListItems(text) {
        var li = $("<li>").addClass("list-group-item").text(text);
        $("#searchHistory").append(li);
    }

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


                var iconImg = $("<img>").attr({ "id": "iconImg", "scr": iconUrl, "alt": "weather icon" })


                //adding current conditions
                var temperature = $("<p>").attr("id", "temp").text("Temperature: " + data.main.temp + "°F")
                var humidity = $("<p>").attr("id", "hum").text("Humidity: " + data.main.humidity + "%")
                var windSpeed = $("<p>").attr("id", "windSpeed").text("Wind Speed: " + data.wind.speed + " MPH")






                $("#currentConditionDisplay").append(cityName, iconImg, dt, temperature, humidity, windSpeed,);






                // var currentConditionDisplay = $("<div>").addClass("card").text(data.name)
                // $("#currentConditionDisplay").append(data.name);


            });
    }

    // function currentConditions() {

    //     var cityName = $("#city").text(data.name)
    //     $("#currentConditionDisplay").append(cityName);


    // };

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
                    var col = $("<div>").addClass("col-sm-2")


                    var card = $("<div>").addClass("card")
                    var cardBody = $("<div>").addClass("card-body")

                    //create date using luxon and info taken from api
                    var apiDate = data.daily[i].dt;
                    var date = new Date(apiDate * 1000);

                    //generate icon
                    var iconCode = data.daily[i].weather[0].icon
                    var iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '.png'
                    console.log(iconUrl);

                    var iconP = $("<div>")
                    var iconImg = $("<img>").attr({ "id": "iconImg", "scr": iconUrl, "alt": "weather icon" })

                    //generate date
                    var dt = $("<p>").text(date.toDateString())
                    //generate temp
                    var temp = $("<p>").text("Temp: " + data.daily[i].temp.day)
                    //generate humidity
                    var hum = $("<p>").text("Humidity: " + data.daily[i].humidity)


                    //append all to html
                    $("#foreCast").append(col)
                    col.append(card);
                    card.append(cardBody);

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