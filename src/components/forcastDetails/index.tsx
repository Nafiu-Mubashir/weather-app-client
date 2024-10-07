import { useCtxt } from "../../context/authContext/userContext";
import { formatDate } from "../../utils";

// Define the types for forecast data
interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
  iconUrl: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Forecast {
  dt: number; // Timestamp
  main: MainWeather;
  weather: Weather[];
  clouds: { all: number };
  wind: { speed: number; deg: number; gust: number };
  rain?: { "3h"?: number };
  dt_txt: string; // Readable date and time
}

interface DailyForecastSummary {
  date: string;
  dayOfWeek: string;
  minTemp: number;
  maxTemp: number;
  weatherDescription: string;
  weatherIcon: string;
  time: string; // Time of the forecast entry
}

const DailyForecast: React.FC = () => {
  const { user } = useCtxt();

  // Ensure the user and forecast data exist
  if (!user || !user.weatherData || !user.weatherData.forecast) {
    return <p>No forecast data available.</p>;
  }

  // Extract forecast data from user context
  const forecast: Forecast[] = user.weatherData.forecast;

  // Helper function to format date and extract day of the week and time


  // Helper function to group forecasts by day
  const groupForecastByDay = (
    forecastData: Forecast[]
  ): DailyForecastSummary[] => {
    const forecastByDay: { [date: string]: Forecast[] } = {};

    forecastData.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0]; // Extract the date part (e.g., "2024-10-05")

      if (!forecastByDay[date]) {
        forecastByDay[date] = [];
      }
      forecastByDay[date].push(entry);
    });

    // Create a daily forecast summary
    return Object.keys(forecastByDay).map((date) => {
      const dayData = forecastByDay[date];

      const temps = dayData.map((item) => item.main.temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);

      // Use the first forecast entry for weather description, icon, day of the week, and time
      const weatherDescription = dayData[0].weather[0].description;
      const weatherIcon = dayData[0].weather[0].iconUrl;
      const { dayOfWeek, time } = formatDate(dayData[0].dt_txt);

      return {
        date,
        dayOfWeek,
        minTemp,
        maxTemp,
        weatherDescription,
        weatherIcon,
        time,
      };
    });
  };

  // Get the grouped daily forecast
  const dailyForecast = groupForecastByDay(forecast);

  return (
    <div className="daily-forecast-container">
      <h2 className="text-xl font-bold mb-4">Daily Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
        {dailyForecast.map((day, index) => (
          <div
            key={index}
            className="forecast-day bg-gray-800 text-white p-4 rounded-lg">
            <h3 className="text-lg font-bold">{day.dayOfWeek.slice(0,3)}</h3>
            <p>{day.date}</p>
            <img
              src={day.weatherIcon}
              alt={day.weatherDescription}
              className="h-12 mx-auto my-2"
            />
            <p className="text-center capitalize">{day.weatherDescription}</p>
            <p className="text-center text-sm">
              <span>Min: {Math.round(day.minTemp - 273.15)}°C</span> |{" "}
              <span>Max: {Math.round(day.maxTemp - 273.15)}°C</span>{" "}
              {/* Converting from Kelvin to Celsius */}
            </p>
            <p className="text-center mt-2">Time: {day.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
