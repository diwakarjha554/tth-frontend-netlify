'use client';

import { useState, useEffect } from "react";
import { useTheme } from "next-themes"; // Assuming this is from Next.js

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false); // Initialize isChecked to false

  // Sync the initial state of isChecked with the current theme
  useEffect(() => {
    setIsChecked(theme === "dark");
  }, [theme]); // Triggered whenever theme changes

  const handleCheckboxChange = () => {
    const newTheme = isChecked ? "light" : "dark"; // Toggle the theme
    setIsChecked(!isChecked); // Toggle isChecked state
    setTheme(newTheme); // Update the theme
  };

  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <div
          className={`box block h-8 w-14 rounded-full ${
            isChecked ? "bg-custom-shd" : "bg-custom-shl"
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition ${
            isChecked ? "translate-x-full" : ""
          }`}
        ></div>
      </div>
    </label>
  );
}
