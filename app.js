let now = new Date();
let day = now.getDay();
let date = now.getDate();
let month = now.getMonth();
let hours = now.getHours();
let minutes = now.getMinutes();
let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
];
let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
// ************************************************//

function displayForecast1() {
    let forecastElement = document.querySelector("#weather-forecast");
    let dayss = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    let forecastHTML = `<div class="row">`;
    dayss.forEach(function (day) {
        forecastHTML =
            forecastHTML +
            `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img src="http://openweathermap.org/img/wn/11n@2x.png" alt="" width="50" class="forecast-img"/>
        <div class="weather-forecast-temp">
            <span class="max-temp">23</span>
            <span class="line">|</span>
            <span class="min-temp">17</span>
        </div>
      </div>
    `;
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}
displayForecast1();
// ********************************* //
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    // console.log(response.data.daily);

    let forecastElement = document.querySelector("#weather-forecast");
    // let dayss = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="50" class="forecast-img"/>
        
        <div class="weather-forecast-temp">
            <span class="max-temp">${Math.round(forecastDay.temp.max)}</span>
            <span class="line">|</span>
            <span class="min-temp">${Math.round(forecastDay.temp.min)}</span>
        </div>
      </div>
    `;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    // console.log(coordinates);
    let apiKey = "817ba81a0b3c35bf55e8a2bffc249d16";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    // console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

let changeDate = document.querySelector("h3");
changeDate.innerHTML = `${days[day]}, ${date} ${months[month]} ${hours}:${minutes}`;
let changeCity = document.querySelector(".search-icon");

function showTemp(response) {
    let changeTemp = document.querySelector(".main-temp");
    changeTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
    // console.log(response.data);
    let changeIcon = document.querySelector(".main-icon");
    changeIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    let changeDescription = document.querySelector(".description");
    changeDescription.innerHTML = `${response.data.weather[0].description}`;
    let changeWind = document.querySelector(".wind");
    changeWind.innerHTML = `Wind: ${response.data.wind.speed}m/s`;
    let changeHumidity = document.querySelector(".humidity");
    changeHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    let changePressure = document.querySelector(".pressure");
    changePressure.innerHTML = `Pressure: ${response.data.main.pressure} hPa`;

    getForecast(response.data.coord);
}

function changing(event) {
    event.preventDefault();
    let input = document.querySelector(".city-name");
    let city = document.querySelector("#search-city");
    input.innerHTML = `${city.value}`;
    let apiKey = "817ba81a0b3c35bf55e8a2bffc249d16";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(showTemp);
}
changeCity.addEventListener("click", changing);
