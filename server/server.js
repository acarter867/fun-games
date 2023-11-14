const path = require('path');
const express = require('express');
const http = require('http');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const socketManager = require('./sockets/socketManager'); // Import the socketManager module
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize the server
const server = http.createServer(app);

// Initialize session store
const sess = {
  secret: 'foundation',
  cookie: {},
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Initialize socket.io
socketManager.initSocket(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, '0.0.0.0', () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
