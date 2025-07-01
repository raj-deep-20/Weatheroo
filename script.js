// script.js
function toggleDarkMode() {
  const html = document.documentElement;
  const icon = document.getElementById('darkModeIcon');

  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    icon.innerHTML = sunIcon;
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    icon.innerHTML = moonIcon;
    localStorage.setItem('theme', 'dark');
  }
}

// Load saved theme preference on page load
window.onload = function () {
  const theme = localStorage.getItem('theme');
  const html = document.documentElement;
  const icon = document.getElementById('darkModeIcon');

  if (theme === 'dark') {
    html.classList.add('dark');
    icon.innerHTML = moonIcon;
  } else {
    html.classList.remove('dark');
    icon.innerHTML = sunIcon;
  }
}

const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>`;

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M18.364 17.95l-1.414-1.414M6.05 6.05L4.636 7.464" /></svg>`;

function searchCity(name) {
  document.getElementById('cityInput').value = name;
  getWeather();
}

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "712ff450fbda86def6a6c7db5c1977f4";

  if (!city) {
    alert("Enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(data => {
      document.getElementById("weatherResult").classList.remove("hidden");
      document.getElementById("cityName").textContent = data.name;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("windSpeed").textContent = data.wind.speed;

      const temperature = Math.round(data.main.temp);
      document.querySelector("#weatherResult .text-4xl").textContent = `${temperature}°C`;

      const summary = generateSummary(temperature, data.weather[0].main);
      document.getElementById("summaryMessage").textContent = summary;
    })
    .catch(err => {
      alert(err.message);
      document.getElementById("weatherResult").classList.add("hidden");
    });
}

function generateSummary(temp, condition) {
  if (condition.toLowerCase().includes("rain")) return "Don't forget an umbrella!";
  if (temp > 35) return "Its quite hot today.";
  if (temp < 10) return "Ahh, its biting cold outside.";
  if (condition.toLowerCase().includes("cloud")) return "Its cloudy today.";
  return "Enjoy the sunny weather!";
}
