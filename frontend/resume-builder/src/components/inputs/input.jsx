import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type, className = "" }) => {
    const [showPassword, setShowPassword] = useState(false);

    const actualType = type === "password" ? (showPassword ? "text" : "password") : type;

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-2 w-full">
            <label className="text-[13px] text-slate-800 font-semibold mb-1 block">
                {label}
            </label>
            <div className="relative w-full">
                <input
                    type={actualType}
                    value={value}
                    onChange={onChange}
                    placeholder={type !== "month" ? placeholder : undefined} // prevent ignored placeholder
                    className={`w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-base shadow focus:border-blue-600 focus:bg-white transition duration-200 outline-none z-50 ${className}`}
                    style={{ position: "relative", zIndex: 50 }} // ensures visibility of picker
                />
                {type === "password" && (
                    <span
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? (
                            <FaRegEye size={22} className="text-primary" />
                        ) : (
                            <FaRegEyeSlash size={22} className="text-slate-400" />
                        )}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Input;
