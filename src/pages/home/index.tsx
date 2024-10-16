import { Link } from "react-router-dom";

import logo from "../../assets/logo.webp"; // Replace with your logo image link
import heroBg from "../../assets/mountainBg.jpg"; // Replace with your actual background image

// Image Links (Replace with the actual images once downloaded)
const sunIcon = "https://yourlink.com/sun-icon.svg";
const rainIcon = "https://yourlink.com/rain-icon.svg";


const HomePage = () => {
  // Hero Section with Navbar
  const Hero = () => (
    <div
      className="relative bg-cover bg-center min-h-[80vh] flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-transparent z-20">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Afro-Weather Logo" className="h-10 md:h-16 rounded-full" />
          <h1 className="text-xl md:text-3xl font-bold text-white">
            Afro-Weather
          </h1>
        </div>
        <div>
          <Link to="/auth/login">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition">
              Login
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="text-center text-white z-10 space-y-4 mt-10 p-2">
        <h1 className="text-3xl md:text-6xl font-bold">
          Afro-Weather <span className="text-green-500">App</span>
        </h1>
        <p className="text-md md:text-xl font-medium max-w-3xl mx-auto">
          Providing accurate and reliable weather updates for African users.
          Tailored to meet your needs with multiple African language support and
          real-time, localized forecasts.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition">
          <Link to={"/auth/login"}>Get Started</Link>
        </button>
      </div>

      {/* App Showcase Image */}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  );

  // Features Section
  const Features = () => (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto text-center space-y-8 p-3">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Why Choose Afro-Weather?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <img
              src={sunIcon}
              alt="Sun Icon"
              className="w-16 h-16 mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">Real-time Forecasts</h3>
            <p className="text-gray-600 mt-2">
              Stay ahead with up-to-date weather forecasts tailored for African
              cities, using localized meteorological data sources.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <img
              src={rainIcon}
              alt="Rain Icon"
              className="w-16 h-16 mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">Accurate Data</h3>
            <p className="text-gray-600 mt-2">
              Get accurate and localized weather data, with detailed insights on
              rain, wind, humidity, and more.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <img
              src={sunIcon}
              alt="Sun Icon"
              className="w-16 h-16 mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">
              Multi-language Support
            </h3>
            <p className="text-gray-600 mt-2">
              Choose from five major African languages including Hausa, Swahili,
              Yoruba, Igbo, and Zulu, for a more personalized experience.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <img
              src={rainIcon}
              alt="Rain Icon"
              className="w-16 h-16 mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">Weather Alerts</h3>
            <p className="text-gray-600 mt-2">
              Receive severe weather warnings and alerts for your region to stay
              safe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // Footer Section
  const Footer = () => (
    <footer className="bg-gray-800 py-6 text-white text-center">
      <p className="text-sm">© 2024 Afro-Weather App. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-4">
        <a
          href="#"
          className="hover:text-green-500">
          Terms of Service
        </a>
        <a
          href="#"
          className="hover:text-green-500">
          Privacy Policy
        </a>
      </div>
    </footer>
  );

  return (
    <div>
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default HomePage;
