// for feather icon

feather.replace();

// for API

const apiURL = ;
const apiKey = ;

const search =document.getElementById('search');
const locationInput = document.getElementById('search-field');

const mainTemp = document.getElementById('main-temp');
const country = document.getElementById('country');
const city = document.getElementById('city');

const feelsLike = document.getElementById('feels-like');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');

const skyInfo = document.getElementById('ski-info');

const body = document.body;

// Search Functionality

search.addEventListener("keyup",function(event){
    if(event.keyCode === 13){
        const location = locationInput.value.trim();
        if(location){
            getWeather(location);
        }
    }
})

// background image

function setBackgroundImage(weatherDescription){
    if(weatherDescription.toLowerCase().includes("cloud")){
        body.style.backgroundImage = "url('/images/cloudy.png')"
    }
    else if(weatherDescription.toLowerCase().includes("clear")){
        body.style.backgroundImage = "url('/images/clear.png')"
    }
    else if(weatherDescription.toLowerCase().includes("rain") ||
    weatherDescription.toLowerCase().includes("haze") ||
    weatherDescription.toLowerCase().includes("mist")){
        body.style.backgroundImage = "url('/images/misc.png')";
    }
    else {
        body.style.backgroundImage = none;
    }

    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
}


// Weather information

function getWeather(location){
    const url = `${apiURL}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        // main section
        mainTemp.innerText = `${Math.round(data.main.temp)}°C`;
        country.innerHTML = data.sys.country;
        city.innerText = data.name;

        // more-section
        feelsLike.innerText = `${Math.round(data.main.feels_like)}°C`;
        windSpeed.innerText = `${data.wind.speed} km/hr`;
        humidity.innerText = `${data.main.humidity}%`;

        // sky information
        skyInfo.innerText = "Weather: " + data.weather[0].description;

        // changing background img
        setBackgroundImage(data.weather[0].description)
    })

    .catch((Error) => {
        console.log("Error fetching weather information:" , error);
    })
}
