/**
 * @module Input 1 Input Module
 * @brief Recieves and processes user keystroke input for passing to model
 */

/**
 * @brief Maps the keyboard presses of the users for passing to model
 * @param {*} e Java script keypress event
 */
document.body.onkeydown = function (e) {
  var keys = {
    37: "left",
    39: "right",
    40: "down",
    38: "rotateCW",
    32: "drop",
    80: "pause",
    90: "rotateCCW",
    16: "hold",
    27: "pause",
  };
  if (typeof keys[e.keyCode] != "undefined") {
    game.keyPress(keys[e.keyCode]);
  }
};
