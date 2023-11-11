import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import Dashboard from "./components/dashboard";
import TicTacToe from "./components/Games/tictactoe";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<><Navbar /><Homepage /></>}/>
            <Route path="/dashboard" element={<><Navbar /><Dashboard /></>}/>
            <Route path="/tic-tac-toe" element={<><Navbar /><TicTacToe /></>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
