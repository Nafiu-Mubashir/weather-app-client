

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

// export default Dashboard

// import React, { useState } from "react";

const Dashboard: React.FC = () => {
  // const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  // const toggleUnit = () => {
  //   setUnit(unit === "metric" ? "imperial" : "metric");
  // };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col md:flex-row justify-center">
      {/* Sidebar */}
      {/* <div className="w-full md:w-1/5 bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="text-xl">SkySense</div>
          <div
            className="cursor-pointer"
            onClick={toggleUnit}>
            {unit === "metric" ? "°C" : "°F"}
          </div>
        </div>
        <div className="mt-10">
          <ul>
            <li className="py-3 border-b border-gray-600">Dashboard</li>
            <li className="py-3 border-b border-gray-600">Forecast</li>
            <li className="py-3">Settings</li>
          </ul>
        </div>
      </div> */}

      {/* Main Dashboard */}
      <div className="flex-grow md:ml-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Current Weather */}
          <div className="bg-gray-800 p-6 rounded-lg flex-grow">
            <div className="flex justify-between">
              <h2 className="text-2xl">Nigeria</h2>
              <span className="text-lg">Monday, 24 Dec 2023</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <h1 className="text-6xl font-bold">26°C</h1>
                <p>Cloudy, feels like 28°C</p>
              </div>
              <div>
                {/* Add a cloud icon or other related image */}
                <img
                  src="/icons/cloudy.svg"
                  alt="Cloudy"
                  className="w-24 h-24"
                />
              </div>
            </div>
          </div>

          {/* Weather Highlights */}
          <div className="bg-gray-800 p-6 rounded-lg md:w-1/3">
            <h3 className="text-xl mb-4">Today Highlight</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p>Chance of Rain</p>
                <h3 className="text-2xl font-bold">20%</h3>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p>UV Index</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p>Wind Status</p>
                <h3 className="text-2xl font-bold">10 km/h</h3>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p>Humidity</p>
                <h3 className="text-2xl font-bold">65%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Week Forecast Section */}
        <div className="bg-gray-800 p-6 mt-4 rounded-lg">
          <h3 className="text-xl mb-4">This Week</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p>Monday</p>
              <div className="flex justify-between items-center mt-2">
                <p>26°C</p>
                <p>Cloudy</p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p>Tuesday</p>
              <div className="flex justify-between items-center mt-2">
                <p>27°C</p>
                <p>Sunny</p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p>Wednesday</p>
              <div className="flex justify-between items-center mt-2">
                <p>28°C</p>
                <p>Rainy</p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p>Thursday</p>
              <div className="flex justify-between items-center mt-2">
                <p>26°C</p>
                <p>Cloudy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Cities Section */}
        <div className="bg-gray-800 p-6 mt-4 rounded-lg">
          <h3 className="text-xl mb-4">Other Cities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-lg">Algeria</h4>
              <p>27°C, Cloudy</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-lg">Cape Verde</h4>
              <p>25°C, Sunny</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-lg">Angola</h4>
              <p>26°C, Rainy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
