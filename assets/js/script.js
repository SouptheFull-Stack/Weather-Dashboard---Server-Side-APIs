const APIKey = "9d1a354a55b1647a46223c05b5cee1a1";
const searchFormEl = document.querySelector("#search-form");
const cityInputEl = document.querySelector("#city");
const forecastEl = document.querySelector("#forecast-card");
const cityButtonEl = document.querySelector("#city-button");
searchedCitiesEl = document.querySelector("#searched-cities");
const currentWeatherHeaderEl = document.querySelector(
  "#current-weather-header"
);
const currentWeatherBottomEl = document.querySelector(
  "#current-weather-bottom"
);

let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

function saveSearchedCity(city) {
  localStorage.setItem(`savedCities`, JSON.stringify(city));
}

const formSubmitHandler = function (event) {
  event.preventDefault();

  const cityInput = cityInputEl.value.trim();

  if (cityInput) {
    getWeatherData(cityInput);

    currentWeatherHeaderEl.textContent = "";
    forecastEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Oopsie! Please enter a city!");
  }
};

const getWeatherData = function (city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (cityData) {
          // cities.push(cityData.city.name);
          displayCurrentWeather(cityData);
          // displayFiveForcast(cityData);
          //   const formattedDate = getCurrentDate();
          //   console.log(formattedDate);
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert("Oopsie! Unable to connect!");
    });
};

function listSearchedCities() {
  let citiesSaved = JSON.parse(localStorage.getItem);
}

// function getCurrentDate() {
//   const date = new Date();

//   let day = date.getDate();
//   let month = date.getMonth() + 1;
//   let year = date.getFullYear();

//   if (day < 10) {
//     day = "0" + day;
//   }
//   if (month < 10) {
//     month = "0" + month;
//   }

//   return `${day}/${month}/${year}`;
// }

function displayCurrentWeather(cityData) {
  //   let currentData = cityData.list[0];
  let currentName = cityData.city.name;
  let currentTemp = cityData.list[0].main.temp;
  let currentWind = cityData.list[0].wind.speed;
  let currentHumid = cityData.list[0].main.humidity;
  //   let currentIcon = cityData.list[0].weather[0].currentIcon;

  const currentCityName = document.createElement("h2");
  const headerCityIcon = document.createElement("img");
  const currentCityTemp = document.createElement("p");
  const currentCityWind = document.createElement("p");
  const currentCityHumid = document.createElement("p");

  //   let iconURL = `https://openweathermap.org/img/wn/${cityIcon}d@2x.png`;

  currentCityName.textContent = currentName;
  //   headerCityIcon.setAttribute("src", iconURL);
  currentCityTemp.textContent = `Temperature: ${currentTemp} °C`;
  currentCityWind.textContent = `Wind: ${currentWind} km/hr`;
  currentCityHumid.textContent = `Humidity: ${currentHumid}%`;

  currentWeatherHeaderEl.appendChild(currentCityName);
  currentWeatherHeaderEl.appendChild(headerCityIcon);
  currentWeatherBottomEl.appendChild(currentCityTemp);
  currentWeatherBottomEl.appendChild(currentCityWind);
  currentWeatherBottomEl.appendChild(currentCityHumid);
}

searchFormEl.addEventListener("submit", formSubmitHandler);

// function displayFiveForcast(cityData) {
//   for (let i = 1; i <= 6; i++) {
//     let data = weatherData[i];
//     console.log(data);
//     // Do something with the data at index 1 to 6
//   }
// }
