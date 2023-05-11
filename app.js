const gameBoard = document.querySelector("#snakepit");
const scoreBoard = document.querySelector("#score");
const gameStart = document.getElementsByClassName('start');

let anniePosition = [{ x:11, y: 11 }];
let arrowDirection = { x: 0, y: 0 };
let speed = 10;
let score = 0;
let timeClock = 0;
let food = { x:20, y:20 };

/**
 * Runs the main game loop using window.requestAnimationFrame. If the time since the last
 * game loop is less than 1 / speed in seconds, return early. Otherwise, update the timeClock
 * to the current time and call the gamePlay function.
 *
 */
function main(gameStart) {
    window.requestAnimationFrame(main);
if ((gameStart - timeClock)/1000 < 1 / speed) {
    return;
}
timeClock = gameStart;
gamePlay();
}

window.requestAnimationFrame(main);
    window.addEventListener("keydown", function (e) {
    inputDirection = { x: 0, y: 1 };
    switch (e.key) {
    case "up pressed":
    inputDirection.x = 0;
    inputDirection.y = -1;
        break;

    case "down pressed":
    inputDirection.x = 0;
    inputDirection.y = 1;
        break;

    case "left pressed":
    inputDirection.x = -1;
    inputDirection.y = 0;
        break;

    case "right pressed":
    inputDirection.x = 1;
    inputDirection.y = 0;
        break;
    default:
        break;
    }
});