import { useTranslation } from "react-i18next";

import logo3 from "../../assets/afro-logo.jpg";

// import logo2 from "../../assets/afros-logo.jpg";
// import logo4 from "../../assets/afrosun-logo.jpg";
// import logo1 from '../../assets/logo.jpg'
// import logo5 from "../../assets/logo.jpg"

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
      // console.log(lng);

      i18n.changeLanguage(lng);
    };
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={logo3}
            className="h-10 rounded-full"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white]">
            {t("Afro-centric Weather App")}
          </span>
        </a>
        <div className="flex gap-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="p-2 border rounded">
            <option value="en">En</option>
            <option value="fr">Fr</option>
            <option value="ha">Ha</option>
            <option value="ig">Ig</option>
            <option value="sw">Sw</option>
            <option value="yo">Yo</option>
            <option value="zu">Zu</option>
          </select>
          <button
            type="button"
            className="text-white p-2 bg-green-500 rounded focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 text-center"
            onClick={toggleUnit}>
            {/* className=""> */}
            {t("Toggle to")}{" "}
            {unit === "metric" ? t("Fahrenheit") : t("Celsius")}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


