import { useTranslation } from "react-i18next";

const Navbar = ({
  unit,
  setUnit,
}: {
  unit: string;
  setUnit: React.Dispatch<React.SetStateAction<"metric" | "imperial">>;
}) => {
  const { t, i18n } = useTranslation();

  const toggleUnit = () => {
    setUnit((prevUnit: string) =>
      prevUnit === "metric" ? "imperial" : "metric"
    );
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-whit dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600 w-full">
      <div className="max-w-screen-x flex flex-col md:flex-row md:items-center justify-between mx-auto p-2 md:p-4 gap-4 md:gap-0">
        {/* Search Input with animation */}
        <div className="relative flex items-center">
          <input
            type="text"
            className="p-2 border rounded-full h-9" // Expands to 14rem on hover or focus
            placeholder={t("Search for a city...")}
          />
        </div>

        {/* Unit Toggle and Language Selector */}
        <div className="flex items-center gap-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse w-full md:w-auto text-black">
          {/* Language Selector */}
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="p-2 border rounded h-9 w-full md:w-auto" // Full width on mobile, auto on larger screens
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
          <div
            className="flex border rounded-full transition-all duration-300 h-[2rem] w-full md:w-20 bg-white" // Full width on mobile, fixed width on larger screens
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
