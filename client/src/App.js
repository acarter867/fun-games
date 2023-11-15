import React, { useEffect } from "react";
import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import Dashboard from "./components/dashboard";
import TicTacToe from "./components/Games/tictactoe";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./DarkModeContext";

import { io } from "socket.io-client"


function App() {
  const socket = io("http://localhost:3001")
  useEffect(() => {    
    socket.connect()
    console.log("socket connecting...")

    return () => {
      socket.disconnect()
      console.log("socket disconnecting...")
    };
  }, [socket])
  return (
    <DarkModeProvider>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<><Navbar /><Homepage /></>}/>
            <Route path="/dashboard" element={<><Navbar /><Dashboard /></>}/>
            <Route path="/tic-tac-toe" element={<><Navbar /><TicTacToe /></>}/>
          </Routes>
        </Router>
      </div>
    </DarkModeProvider>
  );
}

export default App;
