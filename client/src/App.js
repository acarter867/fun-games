import React from "react";
import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import Dashboard from "./components/dashboard";
import TicTacToe from "./components/Games/tictactoe";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./DarkModeContext";

function App() {
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
