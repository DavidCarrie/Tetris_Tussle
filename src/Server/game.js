let io, gameSocket;

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
};

/**
 * The 'CREATE' button was clicked and 'createGame' event occurred.
 */
function createGame() {
  // Create a unique Socket.IO Room
  let id = makeid(5);

  // Look up the room ID in the Socket.IO manager object to guaruntee unique new room.
  while (gameSocket.manager.rooms["/" + id]) {
    id = makeid(5);
  }

  // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
  this.emit("newGameCreated", { gameId: id, mySocketId: this.id });

  // Join the Room and wait for the player(s)
  this.join(id);
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
  let room = gameSocket.manager.rooms["/" + data.gameId];

  // If the room exists...
  if (room != undefined && io.sockets.adapter.rooms[room].length < 2) {
    // attach the socket id to the data object.
    data.mySocketId = sock.id;

    // Join the room
    sock.join(data.gameId);

    //console.log('Player ' + data.playerName + ' joining game: ' + data.gameId );

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
  let room = gameSocket.manager.rooms["/" + data.gameId];

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
  if (gameSocket.rooms.indexOf(data.gameId) >= 0) {
    //if the socket is in this room, update others
    gameSocket.to(data.gameId).emit("update", data);
  }
}

function gameOver(data) {
  data.result === "winner"
    ? gameSocket.to(data.gameId).emit("loser", data)
    : gameSocket.to(data.gameId).emit("winner", data);
}
