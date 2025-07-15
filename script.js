// OpenWeather API config
const API_key = 'dd50b017b516c6088c997ef2bb519f5b';
const API_url = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

// DOM Elements
const locationInfo = document.getElementById('location-info');
const weatherInfo = document.getElementById('weather-info');
const networkInfo = document.getElementById('network-info');
const alertInfo = document.getElementById("alert-info");

let latestWeather = "";

// ✅ Geolocation + Weather
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const response = await fetch(`${API_url}&lat=${lat}&lon=${lon}&appid=${API_key}`);
        const data = await response.json();

        const city = data.name;
        const country = data.sys.country;
        const weatherText = `${data.weather[0].main}, ${data.main.temp}°C`;

        locationInfo.textContent = `${city}, ${country} (Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)})`;
        weatherInfo.textContent = weatherText;
        latestWeather = weatherText;
      } catch (error) {
        weatherInfo.textContent = "❌ Failed to fetch weather data.";
      }
    },
    () => {
      locationInfo.textContent = "❌ Unable to retrieve location.";
    }
  );
} else {
  locationInfo.textContent = "❌ Geolocation not supported.";
}

// Network Information API
if ('connection' in navigator) {
  const type = navigator.connection.effectiveType;
  networkInfo.textContent = `Your internet connection: ${type}`;

  if (["2g", "slow-2g", "3g"].includes(type)) {
    networkInfo.textContent += " ⚠️ Slow network detected!";
  }
} else {
  networkInfo.textContent = "Network Information API not supported.";
}

// ✅ Simulated Background Weather Alerts
function showWeatherNotification() {
  if (Notification.permission === "granted" && latestWeather !== "") {
    new Notification("🌤️ SmartCommute Update", {
      body: `Current Weather: ${latestWeather}`,
      icon: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
    });
    alertInfo.textContent = `🔔 Last Alert at: ${new Date().toLocaleTimeString()}`;
  }
}

// ✅ Ask for Notification Permission
if ("Notification" in window) {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      alertInfo.textContent = "🔔 Notifications enabled.";
    } else {
      alertInfo.textContent = "Please allow notifications for weather alerts.";
    }
  });
}

setInterval(showWeatherNotification, 60000);

async function searchCity() {
  const city = document.getElementById("city-input").value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(`${API_url}&q=${city}&appid=${API_key}`);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found. Try again.");
      return;
    }

    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const cityName = data.name;
    const country = data.sys.country;
    const weatherText = `${data.weather[0].main}, ${data.main.temp}°C`;

    // Update UI
    locationInfo.textContent = `${cityName}, ${country} (Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)})`;
    weatherInfo.textContent = weatherText;
    latestWeather = weatherText;
  } catch (error) {
    alert("Error fetching data. Try again later.");
  }
}

document.body.addEventListener("click", () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("✅ Notifications Unlocked!", {
          body: "This is a test notification!",
          icon: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
        });
      } else {
        alert("❌ Please allow notifications to test this feature.");
      }
    });
  } else {
    new Notification("🔔 SmartCommute Test", {
      body: "This is a working notification from your app!",
      icon: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
    });
  }
});
// OpenWeather API config
const API_key = 'dd50b017b516c6088c997ef2bb519f5b';
const API_url = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

// DOM Elements
const locationInfo = document.getElementById('location-info');
const weatherInfo = document.getElementById('weather-info');
const networkInfo = document.getElementById('network-info');
const alertInfo = document.getElementById("alert-info");

let latestWeather = "";

// ✅ Geolocation + Weather
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const response = await fetch(`${API_url}&lat=${lat}&lon=${lon}&appid=${API_key}`);
        const data = await response.json();

        const city = data.name;
        const country = data.sys.country;
        const weatherText = `${data.weather[0].main}, ${data.main.temp}°C`;

        locationInfo.textContent = `${city}, ${country} (Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)})`;
        weatherInfo.textContent = weatherText;
        latestWeather = weatherText;
      } catch (error) {
        weatherInfo.textContent = "❌ Failed to fetch weather data.";
      }
    },
    () => {
      locationInfo.textContent = "❌ Unable to retrieve location.";
    }
  );
} else {
  locationInfo.textContent = "❌ Geolocation not supported.";
}

// Network Information API
if ('connection' in navigator) {
  const type = navigator.connection.effectiveType;
  networkInfo.textContent = `Your internet connection: ${type}`;

  if (["2g", "slow-2g", "3g"].includes(type)) {
    networkInfo.textContent += " ⚠️ Slow network detected!";
  }
} else {
  networkInfo.textContent = "Network Information API not supported.";
}

// ✅ Simulated Background Weather Alerts
function showWeatherNotification() {
  if (Notification.permission === "granted" && latestWeather !== "") {
    new Notification("🌤️ SmartCommute Update", {
      body: `Current Weather: ${latestWeather}`,
      icon: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
    });
    alertInfo.textContent = `🔔 Last Alert at: ${new Date().toLocaleTimeString()}`;
  }
}

// ✅ Ask for Notification Permission
if ("Notification" in window) {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      alertInfo.textContent = "🔔 Notifications enabled.";
    } else {
      alertInfo.textContent = "Please allow notifications for weather alerts.";
    }
  });
}

setInterval(showWeatherNotification, 60000);

async function searchCity() {
  const city = document.getElementById("city-input").value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(`${API_url}&q=${city}&appid=${API_key}`);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found. Try again.");
      return;
    }

    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const cityName = data.name;
    const country = data.sys.country;
    const weatherText = `${data.weather[0].main}, ${data.main.temp}°C`;

    // Update UI
    locationInfo.textContent = `${cityName}, ${country} (Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)})`;
    weatherInfo.textContent = weatherText;
    latestWeather = weatherText;
  } catch (error) {
    alert("Error fetching data. Try again later.");
  }
}

document.body.addEventListener("click", () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("✅ Notifications Unlocked!", {
          body: "This is a test notification!",
          icon: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
        });
      } else {
        alert("❌ Please allow notifications to test this feature.");
      }
    });
  } else {
    new Notification("🔔 SmartCommute Test", {
      body: "This is a working notification from your app!",
      icon: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
    });
  }
});
