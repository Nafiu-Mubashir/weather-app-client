// const API_KEY = "70a4c4a0b69dba05235b97754e83b8cc";

// const makeIconUrl = (iconId: string) =>
//   `https://openweathermap.org/img/wn/${iconId}@2x.png`;

// const makeWeatherMapUrl = (lat: number, lon: number, layer: string = "temp") =>
//   `https://tile.openweathermap.org/map/${layer}/10/10/10.png?appid=${API_KEY}`;

// interface Weather {
//   description: string;
//   icon: string;
// }

// interface Main {
//   feels_like: number;
//   pressure: number;
//   humidity: number;
//   temp_max: number;
//   temp_min: number;
//   temp: number;
// }

// interface Wind {
//   speed: number;
// }

// interface Sys {
//   country: string;
//   sunrise: number;
//   sunset: number;
// }

// interface Coord {
//   lon: number;
//   lat: number;
// }

// interface Clouds {
//   all: number;
// }

// interface WeatherData {
//   weather: Weather[];
//   main: Main;
//   wind: Wind;
//   sys: Sys;
//   clouds: Clouds;
//   name: string;
//   coord: Coord;
//   timezone: number;
// }

// interface Forecast {
//   dt: number;
//   main: Main;
//   weather: Weather[];
//   wind: Wind;
// }

// export interface ForecastData {
//   list: Forecast[];
// }

// export interface FormattedWeatherData {
//   description: string;
//   iconURl: string;
//   feels_like: number;
//   pressure: number;
//   humidity: number;
//   temp_max: number;
//   temp_min: number;
//   speed: number;
//   country: string;
//   name: string;
//   temp: number;
//   sunrise: number;
//   sunset: number;
//   lon: number;
//   lat: number;
//   timezone: number;
//   weatherMapUrl: string; // Added field for weather map URL
// }

// export interface FormattedWeeklyForecast {
//   date: number;
//   description: string;
//   iconURl: string;
//   temp_max: number;
//   temp_min: number;
//   feels_like: number;
//   humidity: number;
//   speed: number;
//   pressure: number;
//   // precipitation: number;
// }

// const getFormattedWeatherData = async (
//   city: string,
//   units: "metric" | "imperial" = "metric"
// ): Promise<{
//   current: FormattedWeatherData;
//   forecast: FormattedWeeklyForecast[];
// }> => {
//   // Fetch current weather data
//   const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
//   const weatherData: WeatherData = await fetch(weatherUrl).then((res) =>
//     res.json()
//   );

//   const { weather, main, wind, sys, name, coord, timezone } = weatherData;
//   const { description, icon } = weather[0];

//   const currentWeather: FormattedWeatherData = {
//     description,
//     iconURl: makeIconUrl(icon),
//     feels_like: main.feels_like,
//     pressure: main.pressure,
//     humidity: main.humidity,
//     temp_max: main.temp_max,
//     temp_min: main.temp_min,
//     speed: wind.speed,
//     country: sys.country,
//     name,
//     temp: main.temp,
//     sunrise: sys.sunrise,
//     sunset: sys.sunset,
//     lon: coord.lon,
//     lat: coord.lat,
//     timezone,
//     weatherMapUrl: makeWeatherMapUrl(coord.lat, coord.lon), // Added URL for weather map
//   };

//   // Fetch weekly forecast data
//   const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`;
//   const forecastData: ForecastData = await fetch(forecastUrl).then((res) =>
//     res.json()
//   );

//   const now = new Date();
//   const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day ahead
//   const endDay = new Date(nextDay.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days ahead

//   const weeklyForecast: FormattedWeeklyForecast[] = forecastData.list
//     .filter((item) => {
//       const date = new Date(item.dt * 1000); // Convert Unix timestamp to Date
//       return date >= nextDay && date <= endDay;
//     })
//     .map((item) => ({
//       date: item.dt,
//       description: item.weather[0].description,
//       iconURl: makeIconUrl(item.weather[0].icon),
//       temp_max: item.main.temp_max,
//       temp_min: item.main.temp_min,
//       feels_like: item.main.feels_like,
//       humidity: item.main.humidity,
//       speed: item.wind.speed,
//       pressure: item.main.pressure,
//       // precipitation: item.weather[0].main === "Rain" ? item.main.temp : 0, // Assuming 'temp' in rain data indicates precipitation, adjust accordingly
//     }));

//   return { current: currentWeather, forecast: weeklyForecast };
// };

// export { getFormattedWeatherData };
