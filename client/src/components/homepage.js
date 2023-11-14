import React, { useState, useEffect, useRef } from "react";
import { useDarkMode } from "../DarkModeContext";
import io from "socket.io-client";

// Move the socket connection outside of the component
const socket = io('http://localhost:3001');

export default function Homepage() {
  const [sessionName, setSessionName] = useState("");
  const [lobbies, setLobbies] = useState([]);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const backgroundColor = isDarkMode ? "bg-darkMode-primary" : "bg-lightMode-primary";
  const textColor = isDarkMode ? "text-white" : "text-black";

  // Use a ref to track whether the socket has been connected
  const isSocketConnected = useRef(false);

  useEffect(() => {
    const connectSocket = () => {
      if (!isSocketConnected.current) {
        console.log('Connecting socket...');
        socket.connect();
        isSocketConnected.current = true;
        if(socket.connected){
          console.log("WHAT THE FUCK IS UP BOYS?! WE BACK UP IN THIS BITCH")
        }
      }
    
    };
  
    const connectionTimeout = setTimeout(connectSocket, 1000);
  
    socket.on('updateLobbies', (updatedLobbies) => {
      console.log('Received updated lobbies:', updatedLobbies);
      setLobbies(updatedLobbies);
    });
    
  
    return () => {
      clearTimeout(connectionTimeout);
      socket.disconnect();
      isSocketConnected.current = false;
    };
  }, [/* Add any relevant dependencies */]);

  const handleCreateLobby = () => {
    if (sessionName.trim() !== '') {
      console.log('Creating new session:', sessionName);
      socket.emit('createLobby', { sessionName });
    } else {
      console.error('Session name is required for creating a new session');
    }
  };

  const handleJoinLobby = (lobbyId) => {
    if (lobbyId.trim() !== '') {
      console.log('Joining session:', lobbyId);
      socket.emit('joinLobby', { lobbyId });
    } else {
      console.error('Session name is required for joining an existing session');
    }
  };

  return (
    <div className={`h-screen ${backgroundColor} ${textColor}`}>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Homepage</h1>
        <h2 className="text-2xl mb-4">Available Lobbies:</h2>
        <ul>
          {lobbies.map((lobbyId) => (
            <li key={lobbyId}>
              {lobbyId}
              <button onClick={() => handleJoinLobby(lobbyId)}>Join</button>
            </li>
          ))}
        </ul>
        <div>
          <input
            placeholder="Enter New Session Name"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
          />
          <button onClick={handleCreateLobby}>Create Lobby</button>
        </div>
      </div>
    </div>
  );
}
