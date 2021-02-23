const express = require("express");
const socketIO = require("socket.io");
const app = express();
let Player = require("./Player");
const path = require("path");
const publicPath = path.join(__dirname, "/../Client"); //serve the client side code

let isPlaying = true; //remove this later

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
let server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.static(publicPath));

let io = socketIO(server);
let players = {};

let rooms = []; //unused for now -- need later

//update the game every 16 ms
setInterval(updateGame, 16);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on(
  "connection",
  // We are given a websocket object in our function
  function (socket) {
    console.log("We have a new client: " + socket.id);
    socket.on("start", function (data) {
      console.log(socket.id);
      let player = new Player(
        socket.id,
        data.board,
        data.shape,
        data.shadow,
        data.position,
        data.clr
      );
      players[socket.id] = player;
    });

    socket.on("update", function (data) {
      console.log("updating " + socket.id);
      let player = players[socket.id];
      player.board = data.board;
      player.shape = data.shape;
      player.shadow = data.shadow;
      player.position = data.position;
      player.clr = data.clr;
    });

    socket.on("disconnect", function () {
      console.log("Client " + socket.id + " has disconnected");
    });
  }
);

function updateGame() {
  //change this to only update players in specific rooms
  io.sockets.emit("heartbeat", players);
}
