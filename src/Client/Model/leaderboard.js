/**
 * @module Leaderboard 4 Leaderboard Module
 * @brief Constains functionality to implement the leaderboard
 */

/**
 * @brief Function processing uses to load the background images
 */
function preload() {
     backgrd = loadImage("images/bg.jpg");
  }

/**
 * @brief Displays the leaderboard, including players and there respective scores. 
 */  
function setup() {
    createCanvas(windowWidth, windowHeight);
    back_button = createElement("a", "Back");
    back_button.position(50, 50);
    back_button.class("canvas-btn");
    back_button.addClass("back");
    back_button.attribute("href", "./");
    
    image(backgrd, 0, 0, windowWidth, windowHeight); 
    let unit = windowHeight / 12;
    let leaderboard = getItem("leaderboard") || [];
    console.log("leaderboard",leaderboard);
    filter(BLUR); 
    noStroke();
    textSize(unit);
    textAlign(CENTER);
    fill(255);
    text("LEADERBOARD", windowWidth / 2, windowHeight / 12);  

    for(i = leaderboard.length; i > 0; i--)
        text(`${i}: ${leaderboard[i-1]}`, windowWidth/2, windowHeight / 12 + unit*i);  
    
}

/**
 * @brief Function required by processing (unused)
 */
function draw() {


}

