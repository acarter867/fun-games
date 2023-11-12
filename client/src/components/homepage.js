import React, { useState, useEffect } from "react";
import { useDarkMode } from "../DarkModeContext";
import io from "socket.io-client";
import HomeModal from "./Modals/home-modal";

export default function Homepage() {
  const [sessionName, setSessionName] = useState("");
  const [showModal, setShowModal] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const backgroundColor = isDarkMode ? "bg-darkMode-primary" : "bg-lightMode-primary";
  const textColor = isDarkMode ? "text-white" : "text-black";



  return (
    <div>
      <HomeModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}
