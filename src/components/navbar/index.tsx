import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useCtxt } from "../../context/authContext/userContext";
import { AppDispatch } from "../../lib";
import { fetchWeatherData } from "../../lib/action";

// {
//   unit,
//   setUnit,
// }: {
//   unit: string;
//   setUnit: React.Dispatch<React.SetStateAction<"metric" | "imperial">>;
// }
const Navbar = () => {
  const { t, i18n } = useTranslation();
    const { user } = useCtxt();
 const [city, setCity] = useState<string>(user?.city || "");
 const dispatch = useDispatch<AppDispatch>();
 const loadWeatherData = (city: string) => {
   dispatch(fetchWeatherData({ city }));
 };
 useEffect(() => {
   //  loadWeatherData(city)
   if (city) {
     loadWeatherData(city); // Fetch weather data when city is set
   }
 }, [city]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (city) {
      dispatch(fetchWeatherData({ city }));
  }
  
}

  // const toggleUnit = () => {
  //   setUnit((prevUnit: string) =>
  //     prevUnit === "metric" ? "imperial" : "metric"
  //   );
  // };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="border-b border-gray-200 w-full">
      <div className="max-w-screen-x flex md:flex-row md:items-center justify-between mx-auto p-2 md:p-4 gap-4 md:gap-0">
        {/* Search Input with animation */}
        <div className="relativ flex items-center">
          <form onSubmit={handleSearch}>
            <div className="flex items-center w-full">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-2 border rounded-l h-9 w-full text-black"
                placeholder={t("Search for a city...")}
              />
              <button
                type="submit"
                className="p-[0.35rem] bg-blue-500 text-white rounded-r">
                {t("Search")}
              </button>
            </div>
          </form>
        </div>

        {/* Unit Toggle and Language Selector */}
        <div className="flex items-center justify-between gap-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse w-ful md:w-auto text-black">
          {/* Language Selector */}
          <select
            onChange={(e) => changeLanguage(e.target.value)}
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

          {/* Unit Toggle */}
          {/* <div
            className="flex border rounded-full transition-all duration-300 h-[2rem] w-20 md:w-20 bg-white" // Full width on mobile, fixed width on larger screens
            onClick={toggleUnit}>
            <button
              className={
                unit === "metric"
                  ? "bg-white w-1/2 rounded-full uppercase"
                  : "bg-[#060C1A] w-1/2 rounded-full"
              }>
              f
            </button>
            <button
              className={
                unit === "metric"
                  ? "bg-[#060C1A] w-1/2 rounded-full"
                  : "bg-white w-1/2 rounded-full uppercase"
              }>
              c
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
