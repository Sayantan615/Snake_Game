// make a button to stop music
let direction = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");

let speed = 19;
let score = 0;
let lastPaintTime = 0;
//y is row and x is column
let snakeArr = [{ x: 13, y: 15 }];
// let food = { x: 6, y: 7 };
let a = 2;
let b = 26;
food = {
  x: 2 + Math.round(a + (b - a) * Math.random()),
  y: 2 + Math.round(a + (b - a) * Math.random()),
};
//Game Function
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
  console.log(ctime);
}
function isCollide(snakeArr) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  // If bump into the wall
  if (
    snakeArr[0].x > 28 ||
    snakeArr[0].x < 0 ||
    snakeArr[0].y > 28 ||
    snakeArr[0].y < 0
  ) {
    return true;
  }
}
function gameEngine() {
  // part1 : Updating the snake Array & Food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    if (!musicSound.paused) {
      musicSound.pause();
    }
    direction = { x: 0, y: 0 };
    alert("Game Over. Pause any button to play again!");
    snakeArr = [{ x: 13, y: 15 }];//head position will return to starting position

    musicSound.play();

    score = 0;
  }

  //If you have eaten the food increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > highScoreVal) {
      highScoreVal = score;
      localStorage.setItem("highScore", JSON.stringify(highScoreVal));
      hiscoreBox.innerHTML = "HighScore: " + highScore;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });
    let a = 2;
    let b = 26;
    food = {
      x: 2 + Math.round(a + (b - a) * Math.random()),
      y: 2 + Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the Snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;

  //Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    }
    snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });
  //Display the Food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Logic
//! The HIGH SCORE value assigning
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
  highScoreVal = 0;
  localStorage.setItem("hiScore", JSON.stringify(highScoreVal));
} else {
  highScoreVal = JSON.parse(highScore);
  hiscoreBox.innerHTML = "HighScore: " + highScore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  direction = { x: 0, y: 1 }; //start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      direction.x = 0;
      direction.y = -1; //GOING UP
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      direction.x = 0;
      direction.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      direction.x = -1;
      direction.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      direction.x = 1;
      direction.y = 0;
      break;
    default:
      break;
  }
});

//! GAME MODE's

function togglePlay() {
  if (musicSound.paused) {
    document.querySelector(".music").innerHTML =
    '<i class="fa-solid fa-music-slash"></i>';
    // ! change the inner html
        return musicSound.play();
    } else {
    return musicSound.pause();
  }
  // return musicSound.paused ? musicSound.play() : musicSound.pause();
}

