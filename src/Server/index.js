const express = require("express");
const socketIO = require("socket.io");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "/../Client"); //serve the client side code
const port = process.env.PORT || 3000;
// // Import the game file.
// const game = require("./game");
app.use(express.static(publicPath));
let server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.static(publicPath));

let io = socketIO(server);

function makeid(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on("connection", function (socket) {
  //game.initGame(io, socket);
  socket.emit("connected", { message: "You are connected!" });
  socket.on("start", function (data) {});
});
