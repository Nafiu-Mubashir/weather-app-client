import logo3 from "../../assets/afro-logo.jpg";

// import logo2 from "../../assets/afros-logo.jpg";
// import logo4 from "../../assets/afrosun-logo.jpg";
// import logo1 from '../../assets/logo.jpg'
// import logo5 from "../../assets/logo.jpg"
const Preloader = () => {
  return (
    <div className="bg-black">
      <div className="flex justify-center w-1/2 h-screen mx-auto items-center">
        <img
          src={logo3}
          alt=""
          className="w-[20rem] h-[20rem] rounded-full mx-auto flex items-start"
        />
      </div>
    </div>
  );
};

export default Preloader;
