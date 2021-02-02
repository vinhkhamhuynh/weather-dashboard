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
                var temperature = $("<p>").attr("id", "temp").text(data.main.temp)
                var humidity = $("<p>").attr("id", "hum").text(data.main.humidity)
                var windSpeed = $("<p>").attr("id", "windSpeed").text(data.wind.speed)
                
                



                
                $("#currentConditionDisplay").append(cityName, temperature, humidity, windSpeed,);
                

                



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

                var uvIndex = $("<p>").attr("id", "uvIndex").text(data.current.uvi)
                $("#currentConditionDisplay").append(uvIndex);

                for (var i=0 ; i<5; i++ ) {
                    var col = $("<div>").addClass("col-sm-2")
                    
                    
                    var card = $("<div>").addClass("card")
                    var cardBody = $("<div>").addClass("card-body")

                    var dt = $("<p>").text(data.daily[i].dt)
                    var icon = $("<p>").text(data.daily[i].weather[0].icon)
                    var temp = $("<p>").text(data.daily[i].temp.day)
                    var hum = $("<p>").text(data.daily[i].humidity)
                    

                    $("#foreCast").append(col)
                    col.append(card);
                    card.append(cardBody);

                    cardBody.append(dt, icon, temp, hum);




                }
                

            })

    }

    //cityname, date, icon representations of weather conditions , temperture, humidity, wind speed, uv index
    //color indicates uv index is favorable, moderate , or severe

    //create 5 day forecast append to #futureDisplay
    //each day with date display, icon, temperature , and humidity
    //save searchTerm to display in #searchHistory section 

})