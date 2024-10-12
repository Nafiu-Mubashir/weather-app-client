import { Link } from "react-router-dom";

import heroBg from "../../assets/mountainBg.jpg";

// Image Links (Replace with the actual images once downloaded)
// const heroBg = "../../assets/mountainBg.jpg";
const sunIcon = "https://yourlink.com/sun-icon.svg";
const rainIcon = "https://yourlink.com/rain-icon.svg";
// const logo = "https://yourlink.com/logo.png"; // Replace with your logo image link

const HomePage = () => {
  // Hero Section with Navbar
  const Hero = () => (
    <div
      className="relative bg-cover bg-center min-h-[80vh] flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-transparent z-20">
        <div className="flex items-center">
          {/* <img
            src={logo}
            alt="Afro-Weather Logo"
            className="h-10 md:h-14"
          /> */}
          <h1 className="text-xl md:text-3xl font-bold text-white"> Afro-Weather</h1>
        </div>
        <div>
          <Link to="/auth/login">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full font-semibold transition">
              Login
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="text-center text-white z-10 space-y-4 mt-10 p-2">
        <h1 className="text-3xl md:text-6xl font-bold">
          Afro-Weather <span className="text-yellow-500">App</span>
        </h1>
        <p className="text-md md:text-xl font-medium max-w-3xl mx-auto">
          Bringing accurate and reliable weather updates with an Afro-centric
          twist. Stay informed and plan ahead with a uniquely Afro experience.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold transition">
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
              Stay ahead with up-to-date weather forecasts tailored for your
              region.
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
              Get accurate weather data with insights on rain, wind, humidity,
              and more.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <img
              src={sunIcon}
              alt="Sun Icon"
              className="w-16 h-16 mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">Afro-inspired Design</h3>
            <p className="text-gray-600 mt-2">
              Experience a beautifully designed app that reflects the beauty of
              Africa.
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
              Receive severe weather warnings and alerts to stay safe.
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
          className="hover:text-yellow-500">
          Terms of Service
        </a>
        <a
          href="#"
          className="hover:text-yellow-500">
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
