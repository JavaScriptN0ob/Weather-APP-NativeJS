# Weather-APP-NativeJS

### Wenpei Z

#### Update on 03/08/2020:
  1. using declarative Function & data injection to replace old function<br>
       
          const openWeatherIconURL = [
            {
              min: 0,
              max: 299,
              url: 'http://openweathermap.org/img/wn/11d@2x.png',
            },
            //...
            {
              min: 800,
              max: 804,
              url: {
                0: 'http://openweathermap.org/img/wn/01d@2x.png',
                1: 'http://openweathermap.org/img/wn/02d@2x.png',
                2: 'http://openweathermap.org/img/wn/03d@2x.png',
                3: 'http://openweathermap.org/img/wn/04d@2x.png',
                4: 'http://openweathermap.org/img/wn/04d@2x.png',
              },
            },]
 
          function updateIcons(id, weatherURL) {
            for (let i = 0; i < weatherURL.length; i++) {
              if (id < 800) {
                if (id > weatherURL[i].min && id > weatherURL[i].max) {
                  continue;
                }
                return weatherURL[i].url
              }
              return weatherURL[7].url[id - 800]
            }
          }
         
  2. Using async function & await method to replace promise.then(cb()) for a better code reading, looking and response speed.
          
          function getCurrent(cityName, countryName) { 
            //...
            return axios(config)
            .then((response) => {
              //...
            })
            .catch((error) => {
              console.log(error);
            });
          }

          const weatherCurrentData = await getCurrent(cityName, countryName);
          const weatherForecastData = await getForecast(cityName, countryName);
          updateWeather(weatherCurrentData, weatherForecastData);
          
 Next update will be after few days, I will rewrite this webpage by React.
