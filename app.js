const gameBoard = document.querySelector('#snakepit');
const scoreBoard = document.querySelector('#score');
const gameStart = document.getElementsByClassName('start');

let anniePosition = [{ x:11, y: 11 }];
let arrowDirection = { x: 0, y: 0 };
let speed = 10;
let score = 0;
let timeClock = 0;
let food = { x:20, y:20 };
/* Runs the main game loop using window.requestAnimationFrame. If the time since the last
 * game loop is less than 1 / speed in seconds, return early. Otherwise, update the timeClock
 * to the current time and call the gamePlay function.*/
function main(gameStart) {
    window.requestAnimationFrame(main);
    if ((gameStart - timeClock) / 1000 < 1 / speed) {
        return;
    }
    timeClock = gameStart;
    gamePlay();
}
/*Updates the display with the remaining time*/
function timeLeft(duration, display){

    let timer = duration, 
        minutes, 
        seconds;

    setInterval(function(){
        minutes = parseInt(timer/60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes <10 ? '0' + minutes : minutes;
        seconds = seconds <10 ? '0' + seconds : seconds;

        display.textContent =' ' + minutes + ':' + seconds;

        if(--timer< 0){
            alert("OH NO!! YOU LOSSSSSSSST!!!, CLICK LET'S PLAY!!")
            location.reload();
            timer = duration
        }
    },1000)
}
/*Starts a timer for one minute and displays the remaining time on the screen*/
function countDown() {
    let oneMinute = 60; // the duration of the timer in seconds
    let display = document.querySelector("#time-left"); // the element where the remaining time is displayed
    timeLeft(oneMinute, display); // start the timer
}
countDown()
/*Moves Annie's position on the game board based on the arrow direction.Changes the arrow direction based on the key pressed.*/
function changeDirection(event) {
    switch (event.key) {
        case "ArrowUp":
            arrowDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            arrowDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            arrowDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            arrowDirection = { x: 1, y: 0 };
            break;
    }
}
document.addEventListener("keydown", changeDirection);
 window.requestAnimationFrame(main);

 /* Updates the game board with Annie's new position and the food element.
 * Checks for collisions with food and increments the score if a collision occurs.
 */
function gamePlay(){
    for (let i = anniePosition.length - 2; i >= 0; i--) {
        anniePosition[i + 1] = { ...anniePosition[i] };
        }
    // Move Annie's position
    anniePosition[0].x += arrowDirection.x;
    anniePosition[0].y += arrowDirection.y;

    // Clear the game board
    gameBoard.innerHTML = "";

    // Add Annie and the snake elements to the game board
    anniePosition.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            // Annie's head
            snakeElement.classList.add("annieHead");
        } else {
            // The rest of the snake
            snakeElement.classList.add("annie");
        }
        gameBoard.appendChild(snakeElement);
    });

    // Add the food element to the game board
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);

    // Check if the snake has collided with the food
    if (anniePosition[0].y === food.y && anniePosition[0].x === food.x) {
        // Increase the score by 1 and update the score board
        score += 1;
        scoreBoard.innerHTML = " " + score;

        // Add a new segment to the front of the snake
        anniePosition.unshift({
            x: anniePosition[0].x + arrowDirection.x,
            y: anniePosition[0].y + arrowDirection.y,
        });

        // Generate a new food location
        let a = 2;
        let b = 23;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random()),
        };

        // If the score is 10, display a message and reload the page
        if(score === 10 ){
            alert("ANNIE IS FULL...WAY TO GO!!!");
            location.reload();
        }
    }

    // Check for collisions
    if (annieSelfDestruct(anniePosition)) {
        arrowDirection = { x: 0, y: 0 }; // Reset arrow direction.
        alert("GAME OVER!!"); // Display game over message.
        location.reload(); // Reload the page.
        anniePosition = [{ x: 11, y: 11}]; // Reset Annie's position.
        score = 0; // Reset the score.
    }
}
