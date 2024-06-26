// fetching using .then and .catch//

// function getWeather() {
//   // Get the city name from the input field
//   const city = document.getElementById("city").value;
//   const apiKey = "ebb64b2add17e1faba6af2d56e05037e";

//   // Check if the city input is empty
//   if (!city) {
//     alert("Please enter a city");
//     return;
//   }

//   // Construct the URLs for the current weather and forecast
//   const curreWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//   const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

//   // Fetch current weather data
//   fetch(curreWeatherUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       displayWeather(data);
//     })
//     .catch((error) => {
//       console.error("Error fetching current weather data:", error);
//       alert("Error fetching current weather data. Please try again.");
//     });

//   // Fetch forecast data
//   fetch(forecastUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       displayHourlyForecast(data.list);
//     })
//     .catch((error) => {
//       console.error("Error fetching hourly forecast data:", error);
//       alert("Error fetching hourly forecast data. Please try again.");
//     });
// }

// function displayWeather(data) {
//   // Get the elements where the weather information will be displayed
//   const tempDivInfo = document.getElementById("temp-div");
//   const weatherInfoDiv = document.getElementById("weather-info");
//   const weatherIcon = document.getElementById("weather-icon");
//   const hourlyForecastDiv = document.getElementById("hourly-forecast");

//   // Clear previous content
//   weatherInfoDiv.innerHTML = "";
//   hourlyForecastDiv.innerHTML = "";
//   tempDivInfo.innerHTML = "";

//   // Check if the city is not found
//   if (data.cod === "404") {
//     weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
//   } else {
//     // Extract weather information from the data
//     const cityName = data.name;
//     const temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
//     const description = data.weather[0].description;
//     const iconCode = data.weather[0].icon;
//     const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

//     // Create HTML content for temperature and weather info
//     const temperatureHTML = `<p>${temperature}°C</p>`;
//     const weatherHTML = `<p>${cityName}</p>
//                          <p>${description}</p>`;

//     // Display the weather information
//     tempDivInfo.innerHTML = temperatureHTML;
//     weatherInfoDiv.innerHTML = weatherHTML;
//     weatherIcon.src = iconUrl;
//     weatherIcon.alt = description;

//     // Show the weather icon
//     showImage();
//   }
// }

// function displayHourlyForecast(hourlyData) {
//   // Get the element where the hourly forecast will be displayed
//   const hourlyForecastDiv = document.getElementById("hourly-forecast");
//   const next24Hours = hourlyData.slice(0, 8); // Get the next 24 hours of forecast

//   next24Hours.forEach((item) => {
//     const dateTime = new Date(item.dt * 1000); // Convert Unix timestamp to JavaScript Date object
//     const hour = dateTime.getHours();
//     const temperature = Math.round(item.main.temp - 273.15); // Convert temperature to Celsius
//     const iconCode = item.weather[0].icon;
//     const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

//     // Create HTML content for each hourly forecast item
//     const hourlyItemHtml = `
//       <div class="hourly-item">
//         <span>${hour}:00</span>
//         <img src="${iconUrl}" alt="Hourly Weather Icon">
//         <span>${temperature}°C</span>
//       </div>
//     `;

//     // Append the hourly forecast item to the container
//     hourlyForecastDiv.innerHTML += hourlyItemHtml;
//   });
// }

// function showImage() {
//   const weatherIcon = document.getElementById("weather-icon");
//   weatherIcon.style.display = "block";
// }

// Fetching using async and await//
async function getWeather() {
  // Get the city name from the input field
  const city = document.getElementById("city").value;
  const apiKey = "ebb64b2add17e1faba6af2d56e05037e";

  // Check if the city input is empty
  if (!city) {
    alert("Please enter a city");
    return;
  }

  // Construct the URLs for the current weather and forecast
  const curreWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  try {
    // Fetch current weather data
    const weatherResponse = await fetch(curreWeatherUrl);
    const weatherData = await weatherResponse.json();
    displayWeather(weatherData);

    // Fetch forecast data
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    displayHourlyForecast(forecastData.list);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Error fetching weather data. Please try again.");
  }
}

function displayWeather(data) {
  // Get the elements where the weather information will be displayed
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  // Clear previous content
  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";

  // Check if the city is not found
  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    // Extract weather information from the data
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    // Create HTML content for temperature and weather info
    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHTML = `<p>${cityName}</p>
                           <p>${description}</p>`;

    // Display the weather information
    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHTML;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    // Show the weather icon
    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  // Get the element where the hourly forecast will be displayed
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  const next24Hours = hourlyData.slice(0, 8); // Get the next 24 hours of forecast

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000); // Convert Unix timestamp to JavaScript Date object
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15); // Convert temperature to Celsius
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    // Create HTML content for each hourly forecast item
    const hourlyItemHtml = `
        <div class="hourly-item">
          <span>${hour}:00</span>
          <img src="${iconUrl}" alt="Hourly Weather Icon">
          <span>${temperature}°C</span>
        </div>
      `;

    // Append the hourly forecast item to the container
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
