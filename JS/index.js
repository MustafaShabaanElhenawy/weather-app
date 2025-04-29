
const apiKey = "4aa317dc0c774099975172027252904";
let debounceTimer;

function getDayName(dateString) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateString);
  return days[date.getDay()];
}

async function searchWeather(city) {
  try {
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
    const data = await res.json();

    let output = "";
    for (let i = 0; i < 3; i++) {
      const day = data.forecast.forecastday[i];
      const isToday = i === 0;

      output += `
        <div class="col-md-4">
          <div class="weather-card text-center">
            <h5>${getDayName(day.date)} - ${day.date}</h5>
            ${isToday ? `<h3>${data.location.name}</h3>` : ""}
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" />
            <h2>${day.day.avgtemp_c}&deg;C</h2>
            <p>${day.day.condition.text}</p>
            <div class="data-row">
              <span>Rain: ${day.day.daily_chance_of_rain}%</span>
              <span>Wind: ${day.day.maxwind_kph} km/h</span>
            </div>
          </div>
        </div>`;
    }

    document.getElementById("weatherContainer").innerHTML = output;
  } catch (error) {
    document.getElementById("weatherContainer").innerHTML = "<p class='text-white text-center'>No results found.</p>";
  }
}

document.getElementById("searchInput").addEventListener("input", function () {
  const city = this.value.trim();
  clearTimeout(debounceTimer);
  if (city.length >= 3) {
    debounceTimer = setTimeout(() => searchWeather(city), 500);
  }
});

searchWeather("Cairo");
