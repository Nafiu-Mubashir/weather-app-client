import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { DropHalfBottom, Thermometer, Wind } from "@phosphor-icons/react";

import DailyForecast from "../../components/forcastDetails";
import { RootState } from "../../lib";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
 const [currentTime, setCurrentTime] = useState<string>("");
  const [sunriseTime, setSunriseTime] = useState<string>("");
  const [sunsetTime, setSunsetTime] = useState<string>("");
  const [dayLength, setDayLength] = useState<string>("");
  // Function to convert Unix timestamp to human-readable time, accounting for the timezone offset
  const formatTime = (timestamp: number, timezoneOffset: number) => {
    const date = new Date((timestamp + timezoneOffset) * 1000); // Adjust for timezone offset
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  
  const {weatherData} = useSelector(
    (state: RootState) => state.weatherSlice
  ); 
  console.log(weatherData);
  
  useEffect(() => {
    if (weatherData?.weatherData) {
      const { timezone, sys } = weatherData.weatherData.currentWeather;

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
  }, [weatherData]);

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
                {weatherData?.weatherData.currentWeather.name},{" "}
                {weatherData?.weatherData.currentWeather.sys.country}
              </h2>
              <div>
                <p>{currentTime}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <h1 className="text-6xl font-bold">
                  {weatherData?.weatherData.currentWeather.main.feels_like} °C
                </h1>
                <div className="flex gap-2 text-xs">
                  <p>
                    Low: {weatherData?.weatherData.currentWeather.main.temp_min}{" "}
                    °C
                  </p>
                  <p>
                    High:{" "}
                    {weatherData?.weatherData.currentWeather.main.temp_max} °C
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={weatherData?.weatherData.currentWeather.iconUrl}
                  alt={weatherData?.weatherData.currentWeather.weather[0].main}
                  className="w-full h-full"
                />
                <p>{weatherData?.weatherData.currentWeather.weather[0].main}</p>
                <p>
                  {
                    weatherData?.weatherData.currentWeather.weather[0]
                      .description
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Weather Highlights */}
          <div className="bg-gray-800/50 p-6 rounded-lg lg:w-[70%] space-y-3">
            <h3 className="text-xl mb-4">Today Highlight</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <p> {t("Temperature")}</p>
                <div className=" flex items-center justify-between">
                  <Thermometer
                    size={32}
                    color="white"
                    weight="fill"
                  />
                  <h3 className="text-2xl font-bold">
                    {weatherData?.weatherData.currentWeather.main.feels_like.toFixed()}
                    °C
                  </h3>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <p>{t("Humidity")}</p>
                <div className=" flex items-center justify-between">
                  <DropHalfBottom
                    size={32}
                    color="white"
                    weight="fill"
                  />
                  <h3 className="text-2xl font-bold">
                    {weatherData?.weatherData.currentWeather.main.humidity.toFixed()}
                    %
                  </h3>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <p>{t("Wind Speed")}</p>
                <div className=" flex items-center justify-between">
                  <Wind
                    size={32}
                    color="white"
                    weight="fill"
                  />
                  <h3 className="text-2xl font-bold">
                    {weatherData?.weatherData.currentWeather.wind.speed.toFixed()}
                    m/s
                  </h3>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <p>{t("Pressure")}</p>
                <div className=" flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    {weatherData?.weatherData.currentWeather.main.pressure.toFixed()}
                    hPa
                  </h3>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <p>{t("Sea Level")}</p>
                <div className=" flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    {weatherData?.weatherData.currentWeather.main.sea_level ||
                      "N/A"}
                  </h3>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <p>{t("Sunrise")}: {sunriseTime}</p>
                <p>{t("Sunset")}: {sunsetTime}</p>
                <p>{t("Length of Day")}: {dayLength}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Week Forecast Section */}
        <div className="bg-gray-800/50 p-6 rounded-lg">
          <DailyForecast forecast={weatherData?.weatherData.forecast || []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
