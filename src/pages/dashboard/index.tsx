import { useEffect, useState } from "react";

import { DropHalfBottom, Thermometer, Wind } from "@phosphor-icons/react";

import DailyForecast from "../../components/forcastDetails";
import { useCtxt } from "../../context/authContext/userContext";

const Dashboard: React.FC = () => {
  const { user } = useCtxt();
  const [currentTime, setCurrentTime] = useState<string>("");
  const [sunriseTime, setSunriseTime] = useState<string>("");
  const [sunsetTime, setSunsetTime] = useState<string>("");
  const [dayLength, setDayLength] = useState<string>("");

  // Function to convert Unix timestamp to human-readable time, accounting for the timezone offset
  const formatTime = (timestamp: number, timezoneOffset: number) => {
    const date = new Date((timestamp + timezoneOffset) * 1000); // Adjust for timezone offset
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    if (user?.weatherData) {
      const { timezone, sys } = user.weatherData.currentWeather;

      // Calculate the correct local time based on timezone offset
      const localTime = formatTime(Date.now() / 1000, timezone);
      setCurrentTime(localTime);

      // Convert sunrise and sunset times based on the timezone
      const sunrise = formatTime(sys.sunrise, timezone);
      const sunset = formatTime(sys.sunset, timezone);
      setSunriseTime(sunrise);
      setSunsetTime(sunset);

      // Calculate length of day
      const dayLengthInMs = sys.sunset - sys.sunrise;
      const hours = Math.floor(dayLengthInMs / 3600);
      const minutes = Math.floor((dayLengthInMs % 3600) / 60);
      setDayLength(`${hours}h ${minutes}m`);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-90 text-white p-2 md:p-4 flex flex-col md:flex-row justify-center">
      {/* Main Dashboard */}
      <div className="flex-grow md:ml-4 space-y-4">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Current Weather */}
          <div className="bg-gray-800/50 p-6 rounded-lg lg:w-[40%]">
            <div className="flex justify-between">
              <h2 className="text-2xl">
                {user?.weatherData.currentWeather.name},{" "}
                {user?.weatherData.currentWeather.sys.country}
              </h2>
              <div>
                <p>{currentTime}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <h1 className="text-6xl font-bold">
                  {user?.weatherData.currentWeather.main.feels_like.toFixed()}{" "}
                  °C
                </h1>
                <div className="flex gap-2 text-xs">
                  <p>
                    Low:{" "}
                    {user?.weatherData.currentWeather.main.temp_min.toFixed()}{" "}
                    °C
                  </p>
                  <p>
                    High:{" "}
                    {user?.weatherData.currentWeather.main.temp_max.toFixed()}{" "}
                    °C
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={user?.weatherData.currentWeather.iconUrl}
                  alt={user?.weatherData.currentWeather.weather[0].main}
                  className="w-full h-full"
                />
                <p>{user?.weatherData.currentWeather.weather[0].main}</p>
                <p>{user?.weatherData.currentWeather.weather[0].description}</p>
              </div>
            </div>
          </div>

          {/* Weather Highlights */}
          <div className="bg-gray-800/50 p-6 rounded-lg lg:w-[70%] space-y-3">
            <h3 className="text-xl mb-4">Today Highlight</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <p>Temperature</p>
                <div className=" flex items-center justify-between">
                  <Thermometer
                    size={32}
                    color="white"
                    weight="fill"
                  />
                  <h3 className="text-2xl font-bold">
                    {user?.weatherData.currentWeather.main.feels_like.toFixed()}
                    °C
                  </h3>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <p>Humidity</p>
                <div className=" flex items-center justify-between">
                  <DropHalfBottom
                    size={32}
                    color="white"
                    weight="fill"
                  />
                  <h3 className="text-2xl font-bold">
                    {user?.weatherData.currentWeather.main.humidity.toFixed()}%
                  </h3>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <p>Wind Speed</p>
                <div className=" flex items-center justify-between">
                  <Wind
                    size={32}
                    color="white"
                    weight="fill"
                  />
                  <h3 className="text-2xl font-bold">
                    {user?.weatherData.currentWeather.wind.speed.toFixed()}m/s
                  </h3>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <p>Pressure</p>
                <div className=" flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    {user?.weatherData.currentWeather.main.pressure.toFixed()}
                    hPa
                  </h3>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <p>Sea Level</p>
                <div className=" flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    {user?.weatherData.currentWeather.main.sea_level || "N/A"}
                  </h3>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <p>Sunrise: {sunriseTime}</p>
                <p>Sunset: {sunsetTime}</p>
                <p>Length of Day: {dayLength}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Week Forecast Section */}
        <div className="bg-gray-800/50 p-6 rounded-lg">
          <DailyForecast />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
