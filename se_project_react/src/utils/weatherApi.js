export const APIkey = "44005c5bfa3da23dde7eb1bb15293d10"; 

export const getWeather =({latitude, longitude}) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`)
 .then((res) => {
    if (res.ok) {
      return res.json();}
      else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
    };
    export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9)
  };
  result.type = getWeatherType(data.main.temp);
  result.icon = data.weather[0].icon;
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  sunrise *= 1000; // Convert to milliseconds
  sunset *= 1000; // Convert to milliseconds
  return sunrise < now && now < sunset;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return 'hot';
  } else if (temperature >= 50 && temperature <= 80) {
            return "warm";
} else {
  return 'cold';
}
    }
    export default getWeather;