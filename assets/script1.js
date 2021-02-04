

$(document).ready(function () {

    //click event to get search city name and store to local storage 
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();

              //pushing user input city to local storage
        var city = $("#searchTerm").val().trim();
        var testCity = []
        testCity.push(city)
       

        localStorage.setItem("task", JSON.stringify(testCity))
        var searchHistory = JSON.parse(localStorage.getItem("task"))

        for (var i = 0; i < searchHistory.length; i++) {
            
            var storedCity = $("<li>").addClass("list-group-item btn-outline-success").attr("id", "searchedCity").text(searchHistory[i]);

            storedCity.on("click", function () {
                var searchedCity = $(this).html();

                $("#currentConditionDisplay").empty();
                $("#foreCast").empty("#forecast");
                searchWeather(searchedCity);

            })
            $("#searchHistory").append(storedCity);
        };




        searchWeather(city);


    })

    //   

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
               
                // adding condition in dynamicaly
                var cityName = $("<h1>").attr("id", "city").text(data.name)
                // adding date to cityName
                var apiDate = data.dt;
                var date = new Date(apiDate * 1000);
                var dt = $("<h2>").text(date.toDateString())


                // adding icon to cityName
                var iconCode = data.weather[0].icon
                var iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '.png'

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
                console.log(data);

                // var uvIndex = $("<p>").attr("id", "uvIndex").text("UV Index: " + data.current.uvi)
                var uvIndex = $("<p>").attr("id", "uvIndex").text("UV Index: ")
                var uvSpan = $("<p>").text(data.current.uvi)

                $("#currentConditionDisplay").append(uvIndex);
                $("#uvIndex").append(uvSpan)

                console.log(uvSpan.text());

                //add color to indicate uv index condition
                if (uvSpan.text() <= 2) {
                    uvSpan.addClass("bg-success")
                } else if (uvSpan.text() <= 5 ) {
                    uvSpan.addClass("bg-warning")
                } else {
                    uvSpan.addClass("bg-danger")
                }

                //loop info fetched from api to dynamicaly create card for 5day forecast 
                for (var i = 1; i < 6; i++) {
                    var cardBody = $("<article>").addClass("card col-2 mx-2 card-body icon").attr("id", "forecast")

                    //create date using luxon and info taken from api
                    var apiDate = data.daily[i].dt;
                    var date = new Date(apiDate * 1000);

                    //generate icon
                    var iconCode = data.daily[i].weather[0].icon
                    var iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '.png'
                    

                    var iconP = $("<div>")
                    var iconImg = $("<img>").attr({ "id": "iconImg", "src": iconUrl, "alt": "weather icon" })

                    //generate date
                    var dt = $("<h5>").text(date.toDateString())
                    //generate temp
                    var temp = $("<p>").text("Temp: " + data.daily[i].temp.day + " °F")
                    //generate humidity
                    var hum = $("<p>").text("Humidity: " + data.daily[i].humidity + "%")


                    //append all to html

                    $("#foreCast").append(cardBody)

                    cardBody.append(dt, iconP, temp, hum);
                    iconP.append(iconImg);

                }


            })

    }


})







