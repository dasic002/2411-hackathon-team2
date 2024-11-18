import { WEATHER_API_KEY, WEATHER_API_URL } from "../../../secrets.js";

// Default location as fallback
const DEFAULT_LOCATION = "Dublin,Ireland";

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Store the last successful weather data
let weatherCache = {
  timestamp: null,
  data: null,
  location: null,
};

/**
 * Gets the user's current location using the Geolocation API with improved error handling
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    // Set a timeout for the geolocation request
    const timeoutId = setTimeout(() => {
      reject(new Error("Location request timed out"));
    }, 5000); // 5 second timeout

    const options = {
      enableHighAccuracy: false, // false for faster response
      timeout: 5000,
      maximumAge: 10 * 60 * 1000, // Allow 10-minute-old cached positions
    };

    // Get the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        clearTimeout(timeoutId);
        reject(new Error(`Geolocation error: ${error.message}`));
      },
      options
    );
  });
}

/**
 * Check if cached weather data is still valid
 * @returns {boolean}
 */
function isCacheValid() {
  return weatherCache.timestamp && weatherCache.data && Date.now() - weatherCache.timestamp < CACHE_DURATION;
}

/**
 * Fetches weather data with improved error handling and caching
 * @param {string} [location=""] - City name or coordinates
 * @returns {Promise<Object>} Weather data
 */
export async function fetchWeather(location = "") {
  try {
    // Return cached data if valid
    if (isCacheValid() && !location) {
      return weatherCache.data;
    }

    // Get location in order of preference
    if (!location) {
      try {
        // First try geolocation
        const coords = await getCurrentLocation();
        location = `${coords.latitude},${coords.longitude}`;
      } catch (geoError) {
        console.warn("Geolocation failed:", geoError);
        location = DEFAULT_LOCATION;
      }
    }

    // Fetch weather data with retry logic
    const fetchWithRetry = async (retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(`${WEATHER_API_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=3&aqi=no`);

          if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
          }

          const data = await response.json();

          // Update cache
          weatherCache = {
            timestamp: Date.now(),
            data: data,
            location: location,
          };

          return data;
        } catch (error) {
          if (i === retries - 1) throw error;
          // Wait before retry (exponential backoff)
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
      }
    };

    return await fetchWithRetry();
  } catch (error) {
    console.error("Weather fetch error:", error);

    // If we have cached data, return it as a fallback
    if (weatherCache.data) {
      console.log("Returning cached weather data due to fetch error");
      return weatherCache.data;
    }

    throw error;
  }
}

/**
 * Generates text for speech synthesis from weather data
 * @param {Object} weatherData - Current weather data
 * @param {number} dayIndex - Index of the forecast day
 * @returns {string} Formatted text for speech
 */
export function generateWeatherSpeechText(weatherData, dayIndex = 0) {
  if (!weatherData || !weatherData.location || !weatherData.forecast?.forecastday) {
    return "Weather data is currently unavailable.";
  }

  const location = weatherData.location;
  const forecastDays = weatherData.forecast.forecastday;

  if (dayIndex >= forecastDays.length) {
    return "Forecast data for the requested day is not available.";
  }

  if (dayIndex === 0) {
    const current = weatherData.current;
    if (!current) {
      return "Current weather data is unavailable.";
    }

    return `Current weather in ${location.name}, ${location.country || ""}.
            The temperature is ${current.temp_c} degrees Celsius,
            feels like ${current.feelslike_c} degrees.
            Conditions are ${current.condition?.text || "unavailable"}
            with wind speed of ${current.wind_kph} kilometers per hour.
            Humidity is ${current.humidity}%.`;
  }

  const forecast = forecastDays[dayIndex];
  if (!forecast || !forecast.day) {
    return "Forecast data is unavailable.";
  }

  const date = new Date(forecast.date);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = forecast.day;

  return `Weather forecast for ${dayName} in ${location.name}, ${location.country || ""}.
        The average temperature will be ${day.avgtemp_c} degrees Celsius,
        with a high of ${day.maxtemp_c} and a low of ${day.mintemp_c} degrees.
        Expected conditions are ${day.condition?.text || "unavailable"}.
        The chance of rain is ${day.daily_chance_of_rain}%,
        average humidity will be ${day.avghumidity}%,
        and maximum wind speed of ${day.maxwind_kph} kilometers per hour.
        `;
}
