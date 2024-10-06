import React from "react";

interface InputProps {
  label: string;
  type: string;
  placeholder?: string;
  errors?: Record<string, string>; // Errors object with key as string and value as string
  name: string;
  value: string; // Controlled input, value must be a string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function signature for onChange
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void; // Function signature for onBlur
  variant?: "pin" | string; // 'variant' should include 'pin' and potentially other string variants
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder = "",
  errors = {},
  name,
  value,
  onChange,
  onBlur,
  variant,
}) => {
  return (
    <>
      {variant === "pin" ? (
        <div className="flex flex-col">
          <input
            type="text"
            name={name}
            id={name}
            value={value} // Controlled input
            onChange={(e) => {
              if (/^\d?$/.test(e.target.value)) {
                onChange(e);
              }
            }}
            onBlur={onBlur}
            maxLength={1} // Limit input to a single character
            pattern="\d*" // Accept only digits
            className="appearance-none block w-[3.25rem] text-center h-[3.25rem] backdrop-blur-sm bg-white/10 shadow-md text-white border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent placeholder:text-white border-gray-400"
          />
          {errors[name] && (
            <span className="inline-block text-[12px] text-red-500 -translate-y-3">
              {errors[name]}
            </span>
          )}
        </div>
      ) : (
        <div className="relative">
          <div className={`w-full`}>
            <label
              className="block tracking-wide text-xs font-bold mb-2 text-[10.481px] lg:text-[14.8993px]"
              htmlFor={name}>
              {label}
            </label>
            <input
              className="appearance-none block w-full backdrop-blur-sm bg-white/10 shadow-md text-white border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent placeholder:text-white border-gray-400"
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              value={value} // Controlled input
              onChange={onChange} // onChange handler
              onBlur={onBlur} // onBlur handler
            />
            {errors[name] && (
              <span
                className={
                  errors[name]
                    ? "absolute right-0 inline-block text-[12px] text-red-500 -translate-y-3"
                    : "inline-block text-[12px] text-red-500 -translate-y-3"
                }>
                {errors[name]}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Input;
