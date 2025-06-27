const API_KEY = '1554cf5992464e2fa84151436252406';
const input = document.getElementById('cityInput');
const weatherCards = document.getElementById('weatherCards');

window.addEventListener('DOMContentLoaded', () => {
  fetchWeather('Mansoura');
});

input.addEventListener('input', () => {
  const city = input.value.trim();
  if (city.length >= 3) {
    fetchWeather(city);
  }
});

function fetchWeather(city) {
  weatherCards.innerHTML = `<p class="text-center text-muted">Loading...</p>`;
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        weatherCards.innerHTML = `<p class="text-danger text-center">${data.error.message}</p>`;
      } else {
        renderCards(data);
      }
    })
    .catch(() => {
      weatherCards.innerHTML = `<p class="text-danger text-center">Error loading data</p>`;
    });
}

function renderCards(data) {
  let html = '';
  data.forecast.forecastday.forEach((day, i) => {
    const d = new Date(day.date);
    const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
    const tempC = `${day.day.avgtemp_c}°C`;
    const condition = day.day.condition.text;
    const icon = `https:${day.day.condition.icon}`;

    html += `
      <div class="col-md-4 d-flex">
        <div class="card-box w-100">
          <h5>${weekday}</h5>
          <p>${d.getDate()} ${d.toLocaleDateString('en-US', { month: 'long' })}</p>
          <img src="${icon}" alt="icon">
          <h3>${tempC}</h3>
          <p>${condition}</p>
        </div>
      </div>`;
  });

  weatherCards.innerHTML = html;
}
