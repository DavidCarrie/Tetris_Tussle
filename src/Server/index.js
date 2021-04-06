const express = require("express");
const socketIO = require("socket.io");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "/../Client"); //serve the client side code
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
let server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.static(publicPath));

let io = socketIO(server);

// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on("connection", function (socket) {
  game.initGame(io, socket);
});
