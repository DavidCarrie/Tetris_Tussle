/**
 * @module Server 13 Server Module
 * @brief Handles communication between clients to provide multiplayer functionality
 */
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
  /**
   * The 'CREATE' button was clicked and 'createGame' event occurred.
   */
  socket.on("createGame", function () {
    // Create a unique Socket.IO Room
    let id = makeid(5);

    // Look up the room ID in the Socket.IO manager object to guaruntee unique new room.
    while (io.of("/").adapter.rooms.get(id)) {
      id = makeid(5);
    }

    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    this.emit("newGameCreated", { gameId: id });

    // Join the Room and wait for the player(s)
    this.join(id);
    console.log(io.of("/").adapter.rooms);
  });

  /**
   * A player clicked the 'JOIN GAME' button.
   * Attempt to connect them to the room that matches
   * the gameId entered by the player.
   */
  socket.on("joinGame", function (data) {
    // A reference to the player's Socket.IO socket object
    let sock = this;

    // Look up the room ID in the Socket.IO manager object.
    let room = io.of("/").adapter.rooms.get(data.gameId);
    // If the room exists...
    if (room != undefined && room.size < 2) {
      // attach the socket id to the data object.
      data.mySocketId = sock.id;

      // Join the room
      sock.join(data.gameId);

      console.log(
        "Player " + data.playerName + " joining game: " + data.gameId
      );

      // Emit an event notifying the clients that the player has joined the room.
      //io.sockets.in(data.gameId).emit("playerJoinedRoom", data);
      io.sockets.in(data.gameId).emit("beginNewGame", {
        gameId: room,
      });
    } else {
      // Otherwise, send an error message back to the player.
      this.emit("error", { message: "This room does not exist or is full." });
    }
  });
  /**
   * The game is over, and a player has clicked a button to restart the game.
   */
  socket.on("playerRestart", function (data) {
    // Look up the room ID in the Socket.IO manager object.

    let room = io.of("/").adapter.rooms.get(data.gameId);

    // If the room exists...
    if (room == undefined || room.size === 0) {
      this.join(data.gameId);
      this.emit("waiting", { gameId: data.gameId });
    } else if (room != undefined && room.size === 1) {
      //room full again, restart
      this.join(data.gameId);
      io.sockets.in(data.gameId).emit("beginNewGame", {
        gameId: room,
      });
    } else {
      // Otherwise, send an error message back to the player.
      this.emit("error", { message: "This room does not exist or is full." });
    }
  });

  //update from a player
  socket.on("update", function (data) {
    let room = io.of("/").adapter.rooms.get(data.gameId);
    if (room != undefined && room.has(socket.id)) {
      //if the socket is in this room, update others
      socket.to(data.gameId).emit("heartbeat", data);
    }
  });

  socket.on("gameOver", function (data) {
    // Look up the room ID in the Socket.IO manager object.
    let room = io.of("/").adapter.rooms.get(data.gameId);
    if (room != undefined && room.has(socket.id)) {
      io.sockets.in(data.gameId).emit("gameOver");
      //if the socket is in this room, tell all sockets to leave the room
      // room.forEach((sock) => io.sockets.sockets[sock].leave(data.gameId));
    }
  });

  socket.on("gameOverConfirm", function (data) {
    let room = io.of("/").adapter.rooms.get(data.gameId);
    if (room != undefined && room.has(socket.id)) {
      this.leave(data.gameId);
    }
  });

  socket.on("disconnect", function () {
    if (socket.rooms.length > 0) {
      socket.to(socket.rooms[0]).emit("gameOver");
    }
  });
});
