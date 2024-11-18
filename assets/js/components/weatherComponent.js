import { fetchWeather, generateWeatherSpeechText } from "../services/weatherService.js";
import { speakContent } from "../services/speechService.js";

export function initializeWeather() {
  const heroWeatherDiv = document.querySelector(".hero-weather-container");
  const forecastSection = document.querySelector(".forecast-container");
  let weatherData = null;

  // Show loading state immediately
  heroWeatherDiv.innerHTML = `
        <div class="weather-loading">
            <span>Loading Weather...</span>
        </div>
    `;

  function getWeatherIcon(code, isDay) {
    // Basic weather condition mapping
    switch (code) {
      case 1000: // Clear
        return isDay
          ? `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/>
                        <line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>`
          : `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>`;
      case 1003: // Partly cloudy
      case 1006: // Cloudy
      case 1009: // Overcast
        return `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                    </svg>`;
      case 1063: // Rain
      case 1180: // Light rain
      case 1183: // Rain
      case 1186: // Moderate rain
      case 1189: // Rain
      case 1192: // Heavy rain
        return `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="16" y1="13" x2="16" y2="21"/>
                        <line x1="8" y1="13" x2="8" y2="21"/>
                        <line x1="12" y1="15" x2="12" y2="23"/>
                        <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
                    </svg>`;
      default: // Default sun icon
        return `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/>
                        <line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>`;
    }
  }

  function updateHeroWeather(weatherData) {
    // Replace loading state with weather data
    heroWeatherDiv.innerHTML = `
            <div class="hero-weather-main">
                <div class="hero-weather-icon">${getWeatherIcon(weatherData.current.condition.code, weatherData.current.is_day)}</div>
                <div class="hero-weather-temp">
                    <span class="current-temp">${weatherData.current.temp_c}°C</span>
                    <div class="hero-high-low">H: ${weatherData.forecast.forecastday[0].day.maxtemp_c}°C L: ${
      weatherData.forecast.forecastday[0].day.mintemp_c
    }°C</div>
                </div>
            </div>
            <div class="hero-weather-details">
                <div class="hero-location">${weatherData.location.name}</div>
                <div class="hero-condition">${weatherData.current.condition.text}</div>
            </div>
            <div class="hero-weather-controls">
                <button class="speak-weather btn-primary" aria-label="Read current weather information">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                </button>
                <button class="toggle-forecast btn-primary" aria-label="Toggle forecast" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </button>
            </div>
        `;
  }

  function createForecastCard(forecast, index) {
    const date = new Date(forecast.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    return `
            <div class="forecast-card" data-day="${index + 1}">
                <div class="forecast-header">
                    <h3>${dayName}</h3>
                    <button class="speak-weather btn-primary" aria-label="Read forecast for ${dayName}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                        </svg>
                    </button>
                    <span class="weather-icon">${getWeatherIcon(forecast.day.condition.code, true)}</span>
                </div>
                <div class="forecast-main">
                    <div class="temp">
                        <span class="current-temp">${forecast.day.avgtemp_c}°C</span>
                        <span class="high-low">
                            H: ${forecast.day.maxtemp_c}°C
                            L: ${forecast.day.mintemp_c}°C
                        </span>
                    </div>
                    <div class="condition">${forecast.day.condition.text}</div>
                </div>
                <div class="forecast-details">
                    <div class="detail-item">
                        <span>Rain Chance:</span>
                        <span>${forecast.day.daily_chance_of_rain}%</span>
                    </div>
                    <div class="detail-item">
                        <span>Humidity:</span>
                        <span>${forecast.day.avghumidity}%</span>
                    </div>
                    <div class="detail-item">
                        <span>Wind:</span>
                        <span>${forecast.day.maxwind_kph} km/h</span>
                    </div>
                </div>
            </div>
        `;
  }

  function handleWeatherSpeech(dayIndex) {
    if (!weatherData) return;

    const speechText = generateWeatherSpeechText(weatherData, dayIndex);
    const date = new Date(weatherData.forecast.forecastday[dayIndex].date);
    const dayName = dayIndex === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "long" });
    const title = `Weather Forecast for ${dayName}`;

    speakContent(speechText, `weather-forecast-${dayIndex}`, title);
  }

  function updateWeatherUI(data) {
    weatherData = data;
    updateHeroWeather(weatherData);

    // Update forecast section
    forecastSection.innerHTML = weatherData.forecast.forecastday
      .slice(1) // Skip today's forecast
      .map((day, index) => createForecastCard(day, index))
      .join("");

    // Set up event listeners
    const heroSpeakButton = heroWeatherDiv.querySelector(".speak-weather");
    const toggleButton = heroWeatherDiv.querySelector(".toggle-forecast");

    // Hero weather speech button
    if (heroSpeakButton) {
      heroSpeakButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleWeatherSpeech(0);
      });
    }

    // Toggle forecast visibility
    if (toggleButton) {
      toggleButton.addEventListener("click", () => {
        const isVisible = forecastSection.style.display !== "none";
        forecastSection.style.display = isVisible ? "none" : "grid";
        toggleButton.setAttribute("aria-expanded", !isVisible);
        toggleButton.classList.toggle("active");
      });
    }

    // Forecast cards speech buttons
    document.querySelectorAll(".forecast-card .speak-weather").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const dayIndex = parseInt(button.closest(".forecast-card").dataset.day);
        handleWeatherSpeech(dayIndex);
      });
    });
  }

  // Initial weather load
  fetchWeather()
    .then(updateWeatherUI)
    .catch((error) => {
      console.error("Weather fetch error:", error);
      heroWeatherDiv.innerHTML = `
                <div class="weather-error">
                    Unable to load weather
                </div>
            `;
      forecastSection.innerHTML = "";
    });
}
