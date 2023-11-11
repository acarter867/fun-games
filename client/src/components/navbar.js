import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../DarkModeContext";
import '../assets/navbar.css';

export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const backgroundColor = isDarkMode ? 'bg-darkMode-primary' : 'bg-lightMode-primary';
  const textColor = isDarkMode ? 'text-white' : 'text-black';

  return (
    <div className={`${backgroundColor} p-4`}>
      <div className="flex justify-between items-center">
        <Link to={"/"} className={`${textColor} text-lg font-bold`}>
          Fun-Games
        </Link>
        <label className="switch">
          <input type="checkbox" onChange={toggleDarkMode} checked={isDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}
