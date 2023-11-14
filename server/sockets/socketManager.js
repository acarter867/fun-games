// socketManager.js
const socketIO = require('socket.io');

let io;

function initSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log("potentially connected. but who knows");

    // Check if the user is connecting for the first time
    if (!socket.connectedBefore) {
      console.log('User connected');
      socket.connectedBefore = true;
    }

    socket.currentLobby = 'lobby';
    socket.emit('updateLobbies', getLobbies());

    socket.on('createLobby', ({ sessionName }) => {
      console.log(`Received createLobby event with sessionName: ${sessionName}`);
      
      socket.leave(socket.currentLobby);
      socket.join(sessionName);
      socket.currentLobby = sessionName;
    
      io.emit('updateLobbies', getLobbies());
      console.log(`Created lobby with sessionName: ${sessionName}`);
    });

    socket.on('joinLobby', ({ lobbyId }) => {
      socket.leave(socket.currentLobby);

      socket.join(lobbyId);
      socket.currentLobby = lobbyId;

      io.emit('updateLobbies', getLobbies());
    });

    socket.on('gameMove', (data) => {
      io.to(data.room).emit('gameMove', data.move);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
      io.emit('updateLobbies', getLobbies());
    });
  });
}

function getLobbies() {
  console.log("getting lobbies");
  const rooms = io.sockets.adapter.rooms;
  const lobbies = [];
  for (const roomId in rooms) {
    if (!rooms[roomId].hasOwnProperty(roomId)) {
      lobbies.push(roomId);
    }
  }
  return lobbies;
}

module.exports = { initSocket, getLobbies };
