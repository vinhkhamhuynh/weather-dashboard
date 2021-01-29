$(document).ready(function(){

    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.9526&lon=75.1652&appid=a72e07c808e0cdfc9d609b54001dafa3'
console.log("hello");
function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.9526&lon=75.1652&appid=a72e07c808e0cdfc9d609b54001dafa3'

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}

console.log(requestUrl);
})