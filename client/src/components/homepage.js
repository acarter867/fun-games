import React, { useState, useEffect } from "react";
import { useDarkMode } from "../DarkModeContext";

export default function Homepage(){
    const {isDarkMode, toggleDarkMode } = useDarkMode();

    const backgroundColor = isDarkMode ? 'bg-darkMode-primary' : 'bg-lightMode-primary';
    const textColor = isDarkMode ? 'text-white' : 'text-black';
    
    return(
        <div className={`${backgroundColor} ${textColor}`}>
            hello from homepage
        </div>
    )
}