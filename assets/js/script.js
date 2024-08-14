const searchFormEl = document.querySelector("#search-form");
const cityInput = document.querySelector("#city");
const forecastEl = document.querySelector("#forecast-card");

const formSubmitHandler = function (event) {
  event.preventDefault();

  const citySearch = cityInput.value.trim();

  if (citySearch) {
    getCityWeather(citySearch);

    forecastEl.textContent = "";
    cityInput.value = "";
  } else {
    alert("Oopsie! Please enter a city!");
  }
};

const getCityWeather = function (weather) {
  const apiUrl = `https://api.github.com/users/${weather}/repos`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, weather);
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert("Oopsie! Unable to connect!");
    });
};

const displayWeather = function (weatherResults, searchTerm) {
  if (weatherResults === 0) {
    forecastEl.textContent = "Oopsie! No weather data found.";
    return;
  }
};
