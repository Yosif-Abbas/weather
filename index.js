// api key 393f2514d85ad84bb258a2b0e234340b
// weather api key 40b8760f71294fb2adb172405232703
// london http://api.weatherapi.com/v1/current.json?key=40b8760f71294fb2adb172405232703&q=London&aqi=no
// cairo  http://api.weatherapi.com/v1/current.json?key=40b8760f71294fb2adb172405232703&q=cairo&aqi=no

const container = document.querySelector('.container');
const weatherContainer = document.querySelector('.weather-container');
const searchBtn = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('weather-details');
const notFound = document.querySelector('.not-found');
const wind = document.querySelector('.wind');
const apiKey = '40b8760f71294fb2adb172405232703';

searchBtn.addEventListener('click', function () {
  const city = document.querySelector('.search-box input').value;
  getWeather(city)
    .then((data) => renderHTML(data))
    .catch((err) => renderError(err));
});

const getWeather = async function (city) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
    const response2 = await response.json();
    console.log(response2);
    return response2;
  } catch (err) {
    throw err;
  }
};

const renderHTML = function (data) {
  weatherContainer.innerHTML = '';
  const time = new Date(data.current.last_updated);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const timeFormated = `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')} ${(hours % 12).toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${hours / 12 > 1 ? 'PM' : 'AM'}`;

  const html = `
      <div class="weather-box">
        <h1>${data.location.country}, ${data.location.name} ${
    data.location.name == data.location.region
      ? ''
      : `(${data.location.region})`
  }</h1>
        <small>Last updated: ${timeFormated}</small>
        <img src="${data.current.condition.icon}" />
        <p class="temperature">${data.current.temp_c}°C</p>
        <p class="description">${data.current.condition.text}</p>
      </div>

      <div class="weather-details">
        <div class="humidity">
          <i class="fa-solid fa-water"></i>
          <div class="text">
            <span>${data.current.humidity}%</span>
            <p>Humidity</p>
          </div>
        </div>
        <div class="wind">
          <i class="fa-solid fa-wind"></i>
          <div class="text">
            <span>${data.current.wind_kph}kph</span>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>`;
  weatherContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (err) {
  weatherContainer.innerHTML = '';
  const html = `
      <div class="not-found">
        <img src="images/404.png" />
        <p>Oops! Invalid location :/</p>
      </div>
      `;
  weatherContainer.insertAdjacentHTML('beforeend', html);
};
