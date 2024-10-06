import React from "react";

// Define the props for the Button component
interface ButtonProps {
  value: string;
  type?: "button" | "submit" | "reset"; // Limit to button types
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ value, type = "button", onClick }) => {
  return (
    <div>
      <button
        className="appearance-none block w-full bg-gradient-to-t from-[#F84401] to-[#FE7A48] border-[#D13900] shadow-md text-white border rounded py-2 px-4 mb-3 leading-tight focus:outline-none"
        type={type}
        onClick={onClick}
        aria-label={value}>
        {value}
      </button>
    </div>
  );
};

export default Button;
