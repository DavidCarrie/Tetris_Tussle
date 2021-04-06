let io, gameSocket;

/**
 * This function is called by index.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */
exports.initGame = function (sio, socket) {
  io = sio;
  gameSocket = socket;

  gameSocket.emit("connected", { message: "You are connected!" });
  gameSocket.on("createGame", createGame);
  gameSocket.on("joinGame", joinGame);
  gameSocket.on("playerRestart", playerRestart);
  gameSocket.on("update", update);
  gameSocket.on("gameOver", gameOver);
  gameSocket.on("disconnect", disconnect);
};

/**
 * The 'CREATE' button was clicked and 'createGame' event occurred.
 */
function createGame() {
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
}

/**
 * A player clicked the 'JOIN GAME' button.
 * Attempt to connect them to the room that matches
 * the gameId entered by the player.
 */
function joinGame(data) {
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

    console.log("Player " + data.playerName + " joining game: " + data.gameId);

    // Emit an event notifying the clients that the player has joined the room.
    //io.sockets.in(data.gameId).emit("playerJoinedRoom", data);
    io.sockets.in(data.gameId).emit("beginNewGame", {
      gameId: room,
    });
  } else {
    // Otherwise, send an error message back to the player.
    this.emit("error", { message: "This room does not exist or is full." });
  }
}

/**
 * The game is over, and a player has clicked a button to restart the game.
 */
function playerRestart(data) {
  // Look up the room ID in the Socket.IO manager object.
  let room = io.of("/").adapter.rooms[data.gameId];

  // If the room exists...
  if (room != undefined && io.sockets.adapter.rooms[room].length === 0) {
    this.join(data.gameId);
  } else if (room != undefined && io.sockets.adapter.rooms[room].length === 1) {
    //room full again, restart
    this.join(data.gameId);
    io.sockets.in(data.gameId).emit("beginNewGame", {
      gameId: room,
    });
  } else {
    // Otherwise, send an error message back to the player.
    this.emit("error", { message: "This room does not exist or is full." });
  }
}

function update(data) {
  let room = io.of("/").adapter.rooms.get(data.gameId);
  console.log(room);
  console.log(gameSocket.id);
  if (room != undefined && room.has(gameSocket.id)) {
    //if the socket is in this room, update others
    gameSocket.to(data.gameId).emit("heartbeat", data);
  }
}

function gameOver(data) {
  gameSocket.to(data.gameId).emit("gameOver");
}

function disconnect() {
  if (gameSocket.rooms.length > 0) {
    gameSocket.to(gameSocket.rooms[0]).emit("gameOver");
  }
}
