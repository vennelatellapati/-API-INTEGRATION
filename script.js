document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
  const apiKey = '3cdae4c4da11963bdfc3172f0995ed2b'; // <-- Replace this with your actual OpenWeatherMap API key
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('result');

  if (!city) {
    resultDiv.innerHTML = '<p class="error">Please enter a city name.</p>';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');

    const data = await response.json();

    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}
