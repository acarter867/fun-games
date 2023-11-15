import React, { useState, useEffect, useRef } from "react";
import { useDarkMode } from "../DarkModeContext";
import { io } from "socket.io-client";

export default function Homepage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const socketRef = useRef(null)

  const [ username, setUsername ] = useState("");
  const [ newLobbyName, setNewLobbyName ] = useState("");
  const [ searchLobby, setSearchLobby ] = useState("");

  //create socket instance
  useEffect(() => {
    socketRef.current = io('http://localhost:3001');

    socketRef.current.on("playerJoined", ({players}) => {
      console.log(players)
    })

    return () => {
      socketRef.current.disconnect();
    }
  }, [])

  //let user join server
  const handleUserJoin = () => {
    socketRef.current.emit("joinServer", { username })
  }

  const handleNewLobby = () => {
    socketRef.current.emit("createLobby", { newLobbyName })
    console.log("creating new lobby")
  }

  const handleJoinLobby = () => {
    socketRef.current.emit("joinLobby", { lobbyName: searchLobby })
  }

  const backgroundColor = isDarkMode ? "bg-darkMode-primary" : "bg-lightMode-primary";
  const textColor = isDarkMode ? "text-white" : "text-black";


  return (
    <div className={`h-screen ${backgroundColor} ${textColor}`}>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Homepage</h1>
        <h2 className="text-2xl mb-4">Available Lobbies:</h2>
        <div>
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleUserJoin}>Join!</button>
        </div>
        <div>
          <input
            placeholder="Create lobby"
            onChange={(e) => setNewLobbyName(e.target.value)}
          />
          <button onClick={handleNewLobby}>Create Lobby</button>
        </div>
        <div>
          <input
            placeholder="Join lobby"
            onChange={(e) => setSearchLobby(e.target.value)}
          />
          <button onClick={handleJoinLobby}>Search Lobby</button>
        </div>
      </div>
    </div>
  );
}
