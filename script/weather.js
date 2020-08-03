const axios = require('axios');
const { count } = require('console');


const weather = {
  countryNameField: document.querySelector('#country'),
  cityNameField: document.querySelector('#city'),
  search: document.querySelector('.search'),
  currentTemp: document.querySelector('.temp_weather__temp'),
  currentWeather: document.querySelector('.temp_weather__weather'),
  currentHumidity: document.querySelector('.current__humidity'),
  currentWind: document.querySelector('.current__wind'),
  city_name: document.querySelector('.city__name'),
  loading: document.querySelector('.hidden')
}

const forecastList = {
  dayOne: document.querySelector('.day-one'),
  dayTwo: document.querySelector('.day-two'),
  dayThree: document.querySelector('.day-three'),
  dayFour: document.querySelector('.day-four'),
  dayFive: document.querySelector('.day-five')
}

const search = document.querySelector('.search');
let weatherCurrentData = undefined;
let weatherForecastData = undefined;

function getCurrent(cityName, countryName) { 
  let config = {
    method: 'get',
    url: `https://weather-server-wenpei.herokuapp.com/cityWeather?countryCode=${countryName}&cityName=${cityName}&weatherType=current`,
    headers: { }
  };

  return axios(config)
  .then((response) => {
    weatherCurrentData = response.data;
    return weatherCurrentData;
  })
  .catch((error) => {
    console.log(error);
  });
}

function getForecast(cityName, countryName) {
  let config = {
    method: 'get',
    url: `https://weather-server-wenpei.herokuapp.com/cityWeather?countryCode=${countryName}&cityName=${cityName}&weatherType=forecast`,
    headers: { }
  };

  return axios(config)
  .then((response) => {
    weatherForecastData = response.data;
    return weatherForecastData;
  })
  .catch((error) => {
    console.log(error);
  });
}

async function searchWeather() {
  const { countryNameField, cityNameField } = weather;
  let cityName = cityNameField.value;
  let countryName = countryNameField.value;
  if (!cityName || !countryName || cityName.trim() == '' || countryName.trim() == '') {
    alert('country name or city name is required')
  }
  console.log(cityName);
  console.log(countryName);
  const weatherCurrentData = await getCurrent(cityName, countryName);
  const weatherForecastData = await getForecast(cityName, countryName);
  updateWeather(weatherCurrentData, weatherForecastData);
}

function updateWeather(currentWeatherInput, forecastWeatherInput) {
  const { currentTemp, currentWeather, currentHumidity, currentWind, city_name, loading } = weather;

  if(!currentWeatherInput || !forecastWeatherInput) {
    console.log('error');
  }
  if(currentWeatherInput == undefined || forecastWeatherInput == undefined) {
    alert('country name or city name is invalid, please try again!');
    location.reload();
  }
  let city = currentWeatherInput.response.city;
  let current = currentWeatherInput.response.current;
  let forecast = forecastWeatherInput.response.forecast;
  console.log(forecast);
  currentTemp.innerHTML = Math.round(current.minCelsius);
  currentWeather.innerHTML = current.weather;
  currentHumidity.innerHTML = `${current.humidity}%`;
  currentWind.innerHTML = `${current.windSpeed}K/M`;
  city_name.innerHTML = city.name;
  setForecast(forecast);
  loading.classList.add('hidden');
}

function setForecast(forecast) {
  const { dayOne, dayTwo, dayThree, dayFour, dayFive } = forecastList;
  const today = new Date().getDay();
  dayOne.children[0].innerHTML = updateDay(today)
  dayOne.children[1].innerHTML = `<img src="${updateIcons(forecast[3].weatherID, openWeatherIconURL)}" />`
  dayOne.children[2].innerHTML = Math.round(forecast[3].maxCelsius);
  dayOne.children[3].innerHTML = forecast[3].weather;
  dayTwo.children[0].innerHTML = updateDay(today + 1);
  dayTwo.children[1].innerHTML = `<img src="${updateIcons(forecast[11].weatherID, openWeatherIconURL)}" />`
  dayTwo.children[2].innerHTML = Math.round(forecast[11].maxCelsius);
  dayTwo.children[3].innerHTML = forecast[11].weather;
  dayThree.children[0].innerHTML = updateDay(today + 2);
  dayThree.children[1].innerHTML = `<img src="${updateIcons(forecast[19].weatherID, openWeatherIconURL)}" />`
  dayThree.children[2].innerHTML = Math.round(forecast[19].maxCelsius);
  dayThree.children[3].innerHTML = forecast[19].weather;
  dayFour.children[0].innerHTML = updateDay(today + 3);
  dayFour.children[1].innerHTML = `<img src="${updateIcons(forecast[27].weatherID, openWeatherIconURL)}" />`
  dayFour.children[2].innerHTML = Math.round(forecast[27].maxCelsius);
  dayFour.children[3].innerHTML = forecast[27].weather;
  dayFive.children[0].innerHTML = updateDay(today + 4);
  dayFive.children[1].innerHTML = `<img src="${updateIcons(forecast[35].weatherID, openWeatherIconURL)}" />`
  dayFive.children[2].innerHTML = Math.round(forecast[35].maxCelsius);
  dayFive.children[3].innerHTML = forecast[35].weather;
}

function setLoading() {
  const { loading } = weather;
  loading.classList.remove('hidden');
}


const openWeatherIconURL = [
  {
    min: 0,
    max: 299,
    url: 'http://openweathermap.org/img/wn/11d@2x.png',
  },
  {
    min: 300,
    max: 400,
    url: 'http://openweathermap.org/img/wn/09d@2x.png',
  },
  {
    min: 401,
    max: 505,
    url: 'http://openweathermap.org/img/wn/10d@2x.png',
  },
  {
    min: 506,
    max: 519,
    url: 'http://openweathermap.org/img/wn/13d@2x.png',
  },
  {
    min: 520,
    max: 599,
    url: 'http://openweathermap.org/img/wn/09d@2x.png',
  },
  {
    min: 600,
    max: 699,
    url: 'http://openweathermap.org/img/wn/13d@2x.png',
  },
  {
    min: 700,
    max: 799,
    url: 'http://openweathermap.org/img/wn/50d@2x.png',
  },
  {
    min: 700,
    max: 799,
    url: 'http://openweathermap.org/img/wn/50d@2x.png',
  },
  {
    min: 799,
    max: 800,
    url: 'http://openweathermap.org/img/wn/01d@2x.png',
  },
  {
    min: 800,
    max: 801,
    url: 'http://openweathermap.org/img/wn/02d@2x.png',
  },
  {
    min: 801,
    max: 802,
    url: 'http://openweathermap.org/img/wn/03d@2x.png',
  },
  {
    min: 802,
    max: 805,
    url: 'http://openweathermap.org/img/wn/04d@2x.png',
  },
]

function updateIcons(id, weatherURL) {
  for (let i = 0; i < weatherURL.length; i++) {
    for (let i = 0; i < weatherURL.length; i++) {
      if (id > weatherURL[i].min && id > weatherURL[i].max) {
        continue;
      }
      
      return weatherURL[i].url
    }
  }
}

// console.log('url200:', updateIcons(200, openWeatherIconURL));
// console.log('url232:', updateIcons(232, openWeatherIconURL));
// console.log('url300:', updateIcons(300, openWeatherIconURL));
// console.log('url321:', updateIcons(321, openWeatherIconURL));
// console.log('url500:', updateIcons(500, openWeatherIconURL));
// console.log('url511:', updateIcons(511, openWeatherIconURL));
// console.log('url531:', updateIcons(531, openWeatherIconURL));
// console.log('url600:', updateIcons(600, openWeatherIconURL));
// console.log('url622:', updateIcons(622, openWeatherIconURL));
// console.log('url701:', updateIcons(701, openWeatherIconURL));
// console.log('url781:', updateIcons(781, openWeatherIconURL));
// console.log('url800:', updateIcons(800, openWeatherIconURL));
// console.log('url801:', updateIcons(801, openWeatherIconURL));
// console.log('url802:', updateIcons(802, openWeatherIconURL));
// console.log('url803:', updateIcons(803, openWeatherIconURL));
// console.log('url804:', updateIcons(804, openWeatherIconURL));

function updateDay(dayIndex) {
  const dayName = {
    1: "MON", 
    2: "TUE", 
    3: "WED", 
    4: "THU", 
    5: "FRI", 
    6: "SAT", 
    7: "SUN"
  };
  return dayName[dayIndex];
}

console.log(updateDay())

search.addEventListener('click', () => {
  searchWeather();
  setLoading();
});