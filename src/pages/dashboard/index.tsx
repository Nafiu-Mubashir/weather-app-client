// const Dashboard = () => {
//   return (
//     <div className="p-3 w-full">
//       <div className="grid grid-cols-1 md:grid-cols-2">
//         <div className="border p-2">
//           <div className="border">Today's focast</div>
//         </div>
//         <div className="border p-2">
//           <div className="grid grid-cols-2">
//             <div>1</div>
//             <div>2</div>
//           </div>
//           <div className="grid grid-cols-2">
//             <div>1</div>
//             <div>2</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { DropHalfBottom, Wind } from "@phosphor-icons/react";
import { Thermometer } from "@phosphor-icons/react/dist/ssr";

import DailyForecast from "../../components/forcastDetails";
import { useCtxt } from "../../context/authContext/userContext";

// export default Dashboard

// import React, { useState } from "react";

const Dashboard: React.FC = () => {
  // const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  // const toggleUnit = () => {
  //   setUnit(unit === "metric" ? "imperial" : "metric");
  // };

  const { user } = useCtxt();
  console.log(user?.weatherData);

  return (
    <div className="min-h-screen bg-gray-90 text-white p-4 flex flex-col md:flex-row justify-center">
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
              <span className="text-lg">Monday, 24 Dec 2023</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <h1 className="text-6xl font-bold">
                  {user?.weatherData.currentWeather.main.feels_like.toFixed()}{" "}
                  °C
                </h1>
                <div className="flex gap-2 text-xs">
                  <p>
                    Low:
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
                {/* Add a cloud icon or other related image */}
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
            <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <p>WindSpeed</p>
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
                    {user?.weatherData.currentWeather.main.sea_level}
                  </h3>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                <div>Sunrise</div>
                <div>Sunset</div>
                <div>Lemgth of day</div>
              </div>
            </div>
          </div>
        </div>

        {/* Week Forecast Section */}
        <div className="bg-gray-800/50 p-6 rounded-lg">
          <DailyForecast />{" "}
        </div>
        {/* Other Cities Section */}
      </div>
    </div>
  );
};

export default Dashboard;
