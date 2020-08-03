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
  dayOne.children[1].innerHTML = `<img src="${updateIcons(forecast[3].weatherID)}" />`
  dayOne.children[2].innerHTML = Math.round(forecast[3].maxCelsius);
  dayOne.children[3].innerHTML = forecast[3].weather;
  dayTwo.children[0].innerHTML = updateDay(today + 1);
  dayTwo.children[1].innerHTML = `<img src="${updateIcons(forecast[11].weatherID)}" />`
  dayTwo.children[2].innerHTML = Math.round(forecast[11].maxCelsius);
  dayTwo.children[3].innerHTML = forecast[11].weather;
  dayThree.children[0].innerHTML = updateDay(today + 2);
  dayThree.children[1].innerHTML = `<img src="${updateIcons(forecast[19].weatherID)}" />`
  dayThree.children[2].innerHTML = Math.round(forecast[19].maxCelsius);
  dayThree.children[3].innerHTML = forecast[19].weather;
  dayFour.children[0].innerHTML = updateDay(today + 3);
  dayFour.children[1].innerHTML = `<img src="${updateIcons(forecast[27].weatherID)}" />`
  dayFour.children[2].innerHTML = Math.round(forecast[27].maxCelsius);
  dayFour.children[3].innerHTML = forecast[27].weather;
  dayFive.children[0].innerHTML = updateDay(today + 4);
  dayFive.children[1].innerHTML = `<img src="${updateIcons(forecast[35].weatherID)}" />`
  dayFive.children[2].innerHTML = Math.round(forecast[35].maxCelsius);
  dayFive.children[3].innerHTML = forecast[35].weather;
}

function setLoading() {
  const { loading } = weather;
  loading.classList.remove('hidden');
}

function updateIcons(id) {
  if (id < 300) {
    return 'http://openweathermap.org/img/wn/11d@2x.png';
  }
  else if (id < 400) {
    return 'http://openweathermap.org/img/wn/09d@2x.png';
  }
  else if (id < 600) {
    if(id < 505) {
      return 'http://openweathermap.org/img/wn/10d@2x.png';
    }
    else if (id < 520) {
      return 'http://openweathermap.org/img/wn/13d@2x.png';
    }
    return 'http://openweathermap.org/img/wn/09d@2x.png';
  }
  else if (id < 700) {
    return 'http://openweathermap.org/img/wn/13d@2x.png';
  }
  else if (id < 800) {
    return 'http://openweathermap.org/img/wn/50d@2x.png';
  }
  else if (id >= 800) {
    switch(id) {
      case(800):
        return 'http://openweathermap.org/img/wn/01d@2x.png';
      case(801):
        return 'http://openweathermap.org/img/wn/02d@2x.png';
      case(802):
        return 'http://openweathermap.org/img/wn/03d@2x.png';
      case(803):
        return 'http://openweathermap.org/img/wn/04d@2x.png';
      case(804):
        return 'http://openweathermap.org/img/wn/04d@2x.png';
    }
  }
}

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