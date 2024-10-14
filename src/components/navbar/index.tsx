import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getCookie } from "typescript-cookie";

import { useCtxt } from "../../context/authContext/userContext";
import { AppDispatch } from "../../lib";
import { fetchWeatherData } from "../../lib/action/weatherAction";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user } = useCtxt(); // Get the logged-in user
  const [city, setCity] = useState<string>(user?.city || ""); // Use empty string initially for input state
  const dispatch = useDispatch<AppDispatch>();
  const token = getCookie("auth_token"); // Get auth token from cookies

  console.log("Token:", token); // Debugging token

  // Function to load weather data based on city and token
  const loadWeatherData = (city: string) => {
    if (token && city) {
      dispatch(fetchWeatherData({ city }));
      console.log(`Weather data fetched for city: ${city}`);
    } else {
      console.warn("City or token is missing, cannot load weather data.");
    }
  };

  // Load weather data if city and token are available (on initial mount or when city changes)
  useEffect(() => {
    if (token && city) {
      loadWeatherData(city); // Automatically fetch weather for the logged-in user's city on load
    }
  }, []); // Token is added as a dependency to ensure proper effect

  // Function to handle the form 
  
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form from refreshing the page

    if (city) {
      console.log("Searching for city:", city); // Debugging city value before dispatch

      try {
        // dispatch(fetchWeatherData({ city })); // Dispatch action to fetch weather data for searched city
        loadWeatherData(city);
        console.log("Dispatch successful for city:", city);
      } catch (error) {
        console.error("Error during dispatch:", error); // Log errors if dispatch fails
      }
    } else {
      console.warn("City is empty, cannot fetch weather data."); // Handle empty city scenario
    }
  };

  // Function to change language using react-i18next
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="border-b border-gray-200 w-full">
      <div className="max-w-screen-x flex md:flex-row md:items-center justify-between mx-auto p-2 md:p-4 gap-4 md:gap-0">
        {/* Search Input with animation */}
        <div className="relative flex items-center">
          <form onSubmit={handleSearch}>
            <div className="flex items-center w-full">
              <input
                type="text"
                // value={city}
                onChange={(e) => setCity(e.target.value)} // Update the city state on input change
                className="p-2 border rounded-l h-9 w-full text-black"
                placeholder={t("Search for a city...")} // Translation for placeholder text
              />
              <button
                type="submit"
                className="p-[0.35rem] bg-blue-500 text-white rounded-r">
                {t("Search")} {/* Translation for button text */}
              </button>
            </div>
          </form>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-between gap-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse w-ful md:w-auto text-black">
          <select
            onChange={(e) => changeLanguage(e.target.value)} // Change language on select
            className="p-2 border rounded h-9 w-auto md:w-auto" // Full width on mobile, auto on larger screens
          >
            <option value="en">En</option>
            <option value="fr">Fr</option>
            <option value="ha">Ha</option>
            <option value="ig">Ig</option>
            <option value="sw">Sw</option>
            <option value="yo">Yo</option>
            <option value="zu">Zu</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
