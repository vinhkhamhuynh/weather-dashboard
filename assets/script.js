









$(document).ready(function () {
    //create variables using javascript
    //create time and date using luxon
    //create getApi function
    //create function to capture searchTerm
        //push searchTerm to api to get weather conditions including below and append to #currentConditionDisplay:
            //cityname, date, icon representations of weather conditions , temperture, humidity, wind speed, uv index
            //color indicates uv index is favorable, moderate , or severe

        //create 5 day forecast append to #5dayDisplay
            //each day with date display, icon, temperature , and humidity
        //save searchTerm to display in #searchHistory section 
    
    
    

    //my api id = a72e07c808e0cdfc9d609b54001dafa3

    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.9526&lon=-75.1652&appid=a72e07c808e0cdfc9d609b54001dafa3'



    function getApi() {
        var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.9526&lon=-75.1652&exclude=hourly,daily&units=imperial&appid=a72e07c808e0cdfc9d609b54001dafa3'

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data.current.temp);
            })
    };


    
    

   


    /*$("#searchBtn").on("click", function() {

     })*/


    var city = []

    function storeCity() {
        var value = city

        localStorage.setItem("cityNames", JSON.stringify(value))
    };

    /*function recallCity() {
        var cityList = JSON.parse(localStorage.getItem("cityNames"));

        city.push(cityList);

    };*/

    

    $("#searchBtn").on("click", function() {

        // 1. create url string
        // 2. store to local storage if it s/ 
        // 3. display stat

        event.preventDefault();

        var cityNames = $("#citySearch").val().trim();
        city.push(cityNames);

        $("#temp").append(getApi());




        storeCity();

        

        /*city.forEach(function(){
        
            var li = $("<li>");
            
            $("#searchHistory").append(li);
    
    
        });*/
        
       

    });
    
  

console.log(city);





})