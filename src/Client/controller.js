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
    keyPress(keys[e.keyCode]);
  }
};
