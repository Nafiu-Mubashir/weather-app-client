import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import {
  DropHalfBottom,
  MapPinLine,
  Thermometer,
  Wind,
} from "@phosphor-icons/react";

import DailyForecast from "../../components/forcastDetails";
import { RootState } from "../../lib";
import AirPollutionChart from "./component/airPollutionChart";
import TemperatureDonutChart from "./component/temperatureChart";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState<string>("");
  const [sunriseTime, setSunriseTime] = useState<string>("");
  const [sunsetTime, setSunsetTime] = useState<string>("");
  const [dayLength, setDayLength] = useState<string>("");

  const { weatherData } = useSelector((state: RootState) => state.weatherSlice);
  console.log(weatherData);

  // Function to convert Unix timestamp to human-readable time, accounting for the timezone offset
  const formatTime = (timestamp: number, timezoneOffset: number) => {
    const date = new Date((timestamp + timezoneOffset) * 1000); // Adjust for timezone offset
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

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
    <div className="min-h-screen bg-gray-[90] text-white p-2 md:p-4 flex flex-col md:flex-row justify-center">
      <div className="flex-grow md:ml-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="space-y-3 lg:w-[60%]">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <div className="flex justify-between">
                <div className="flex gap-1 items-center bg-green-500 rounded p-1">
                  <MapPinLine
                    size={20}
                    color="#eeeae3"
                    className=""
                  />
                  <h2 className="text-md">
                    {weatherData?.weatherData.currentWeather.name},{" "}
                    {weatherData?.weatherData.currentWeather.sys.country}
                  </h2>
                </div>
                <div>
                  <p>{currentTime}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <h1 className="text-2xl lg:text-6xl font-bold">
                    {weatherData?.weatherData.currentWeather.main.feels_like} °C
                  </h1>
                  <div className="flex flex-col md:flex-row md:gap-2 text-xs">
                    <p>
                      Low:{" "}
                      {weatherData?.weatherData.currentWeather.main.temp_min} °C
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
                    alt={
                      weatherData?.weatherData.currentWeather.weather[0].main
                    }
                    className="md:w-full h-20 md:h-full"
                  />
                  <p className="text-sm">
                    {weatherData?.weatherData.currentWeather.weather[0].main}
                  </p>
                  <p className="text-sm">
                    {
                      weatherData?.weatherData.currentWeather.weather[0]
                        .description
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl mb-4">{t("Today Highlight")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                  <p> {t("Temperature")}</p>
                  <div className="p-3 flex items-center justify-between">
                    <Thermometer
                      size={30}
                      color="white"
                      weight="fill"
                      className="block md:hidden"
                    />
                    <Thermometer
                      size={60}
                      color="white"
                      weight="fill"
                      className="hidden md:block"
                    />
                    <h3 className="text-3xl font-bold">
                      {weatherData?.weatherData.currentWeather.main.feels_like.toFixed()}{" "}
                      °C
                    </h3>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                  <p>{t("Humidity")}</p>
                  <div className="p-3 flex items-center justify-between">
                    <DropHalfBottom
                      size={30}
                      color="white"
                      weight="fill"
                      className="block md:hidden"
                    />
                    <DropHalfBottom
                      size={60}
                      color="white"
                      weight="fill"
                      className="hidden md:block"
                    />
                    <h3 className="text-3xl font-bold">
                      {weatherData?.weatherData.currentWeather.main.humidity.toFixed()}{" "}
                      %
                    </h3>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                  <p>{t("Wind Speed")}</p>
                  <div className="p-3 flex items-center justify-between">
                    <Wind
                      size={30}
                      color="white"
                      weight="fill"
                      className="block md:hidden"
                    />
                    <Wind
                      size={60}
                      color="white"
                      weight="fill"
                      className="hidden md:block"
                    />
                    <h3 className="text-3xl font-bold">
                      {weatherData?.weatherData.currentWeather.wind.speed.toFixed()}{" "}
                      m/s
                    </h3>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                  <p>{t("Pressure")}</p>
                  <div className=" flex items-center justify-between">
                    <h3 className="text-2xl font-bold">
                      {weatherData?.weatherData.currentWeather.main.pressure.toFixed()}{" "}
                      hPa
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[40%] space-y-3">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <DailyForecast
                forecast={weatherData?.weatherData.forecast || []}
              />
            </div>
          </div>
        </div>

        {/* Week Forecast Section */}
        <div className="bg-gray-800/50 p-6 rounded-lg">
          <h3 className="text-xl mb-4">Today Highlight</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg space-y-2">
              {/* Air Pollution Chart */}
              {weatherData?.weatherData.airPollution?.list[0] ? (
                <AirPollutionChart
                  airPollution={weatherData.weatherData.airPollution.list[0]}
                />
              ) : (
                <p>No air pollution data available.</p>
              )}
            </div>
            <div className="space-y-2">
              {/* Add a check to ensure temperatureData exists before rendering */}
              <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                {weatherData?.weatherData.currentWeather?.main && (
                  <TemperatureDonutChart
                    temperatureData={
                      weatherData.weatherData.currentWeather.main
                    }
                  />
                )}
              </div>
              <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                <p className="capitalize">
                  {t("sunrise")}: {sunriseTime}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                <p className="capitalize">
                  {t("sunset")}: {sunsetTime}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                <p className="capitalize">
                  {t("length of day")}: {dayLength}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
