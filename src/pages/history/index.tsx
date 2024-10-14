import { useSelector } from "react-redux";

import { RootState } from "../../lib";

// Date formatter function to separate date and time with AM/PM
function formatDateTime(isoString: string): { date: string; time: string } {
  const dateObj = new Date(isoString);

  // Format date as YYYY-MM-DD
  const date = dateObj.toISOString().split("T")[0];

  // Format time as HH:MM AM/PM
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 24-hour to 12-hour format

  const time = `${hours}:${minutes} ${ampm}`;

  return { date, time };
}

const History = () => {
  const { weatherData } = useSelector((state: RootState) => state.weatherSlice);

  return (
    <div className="p-3">
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3">
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                Country
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                Temperature
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {weatherData?.weatherSearchHistory.map(
              ({ city, weatherData, country, searchedAt }, id) => {
                const { date, time } = formatDateTime(searchedAt); // Format the searchedAt date

                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {city}
                    </th>
                    <td className="px-6 py-4 capitalize">{country}</td>
                    <td className="px-6 py-4">{weatherData.temperature} °C</td>
                    <td className="px-6 py-4">{date}</td>
                    <td className="px-6 py-4">{time}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
