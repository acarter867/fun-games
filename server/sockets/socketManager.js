
const { Server } = require('socket.io');

let users = [];
let lobbies = [];

function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    socket.on("joinServer", ({ username }) => {
      const user = {
        username,
        id: socket.id
      };
      users.push(user);
      console.log(users)
    });

    //dont need lobby creator id, as creation device will be game master
    socket.on('createLobby', ({ newLobbyName }) => {
      //const lobbyId = generateLobbyId();
      const newLobby = createLobby(newLobbyName, socket.id);
      socket.join(newLobby.lobbyId);
      console.log(`New lobby "${newLobby.lobbyName}" has been created`);
      console.log(lobbies)
    });

    socket.on("joinLobby", ({ lobbyName }) => {
      const lobby = findLobbyByName(lobbyName);
      if(lobby && !lobby.players.includes(socket.id)){
        socket.join(lobby.lobbyId);
        addPlayerToLobby(lobby.lobbyName, findUsernameById(socket.id));
        console.log(`${findUsernameById(socket.id)} has joined the lobby`);
      }
      io.to(lobby.lobbyId).emit('playerJoined', {
        players: lobby.players
      })
    });
  });
};

function generateLobbyId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let lobbyId = '';
  for (let i = 0; i < 12; i++) {
    let randomChar = characters.charAt(Math.floor(Math.random() * characters.length))
    lobbyId += randomChar;
  }
  return lobbyId;
};

function createLobby(newLobbyName, creatorSocketId) {
  const lobbyId = generateLobbyId();
  const newLobby = {
    lobbyId,
    lobbyName: newLobbyName,
    creator: creatorSocketId,
    players: []
  };
  lobbies.push(newLobby);
  return newLobby;
};

function findLobbyByName(lobbyName) {
  return lobbies.find(lobby => lobby.lobbyName === lobbyName);
};

function addPlayerToLobby(lobbyName, username) {
  console.log("this is being called")
  const lobby = findLobbyByName(lobbyName);
  if (lobby) {
    lobby.players.push(username);
    console.log(lobby + "asdfasdfasdf")
  }else{
    console.log(`No lobby found with name: ${lobbyName}`);
  }
};

function findLobbyPlayers(lobbyName){
  const lobby = lobbies.find(lobby => lobby.name === lobbyName);
  return lobby.players;
}

function findUsernameById(socketId){
  const user = users.find(user => user.id === socketId);
  return user.username;
};

module.exports = { initSocket }