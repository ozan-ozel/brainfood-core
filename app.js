require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const router = express.Router();
const routes = require('./routes/index.js')

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  path:'/napi'
})

const port = process.env.PORT || 3000

/**
 * Express Configuration
 */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet())

// disable in production
if(process.env.NODE_ENV === "dev")
  app.use(cors())

const socketClients = []

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('greet', function(data) {
    console.log(data);
    const {userId, message} = data

    socketClients.push(userId)

    socket.emit('respond', socketClients);
  });
  socket.on('disconnect', function() {
    console.log('Socket disconnected');
  });
});

// const checkersSpace = io.of('/socket/checkers')

// checkersSpace.use((socket, next) => {
//   // ensure the user has sufficient rights
//   next();
// });

// checkersSpace.on('connection', socket => {
//   console.log("New client connected");

//   socket.on('hello', data => {
//     socketClients.push(data)

//     console.log(socketClients)

//     socket.emit('ack_hello', JSON.stringify(socketClients))
//   })  
// });

app.use('/api/v1', routes(router))

if(process.env.NODE_ENV !== 'test')
  http.listen(port, () => console.log(`BrainFood listening at http://localhost:${port}`))

module.exports = app;
