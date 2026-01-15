const Game = () => {
  const boxWidth = 32;
  const boxHeight = 32;
  const board = document.querySelector(".game-area");

  const rows = Math.floor(board.clientHeight / boxHeight);
  const cols = Math.floor(board.clientWidth / boxWidth);

  //Elements
  let food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows),
  };

  let direction = "right";
  let boxArray = [];
  let score = 0;
  let highScore = Number(localStorage.getItem("highScore")) || 0;
  const highScoreBox = document.querySelector(".high-score");
  highScoreBox.innerText = `High Score: ${highScore}`;
  let time = "00:00";

  let snake = [
    {
      x: 2,
      y: 2,
    },
    {
      x: 1,
      y: 2,
    },
    {
      x: 0,
      y: 2,
    },
  ];

  // const foodBox = document.createElement("div");

  function render() {
    for (let i = 0; i < rows; i++) {
      boxArray[i] = [];
      for (let j = 0; j < cols; j++) {
        const box = document.createElement("div");
        box.classList.add("box");
        if (i == food["y"] && j == food["x"]) {
          box.classList.add("food");
        }

        //   box.innerText = `${i}-${j}`;
        board.appendChild(box);
        boxArray[i][j] = box;
      }
    }

    console.log(boxArray);
  }
  render();
  function generateFood() {
    boxArray[food.y][food.x].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };
    boxArray[food.y][food.x].classList.add("food");
    //   while (true) {
    //     let onSnake = true;
    //     snake.forEach((e, ind) => {
    //       if (e.x == food.x && e.y == food.y) {
    //         boxArray[food.y][food.x].classList.remove("food");
    //         food = {
    //           x: Math.floor(Math.random() * cols),
    //           y: Math.floor(Math.random() * rows),
    //         };
    //         boxArray[food.y][food.x].classList.add("food");
    //         if (ind == snake.length - 1 && e.x != food.x && e.y != food.y) onSnake = false;
    //       }
    //     });
    //     if (!onSnake) break;
    //   }
  }

  // x is col no.
  // y is row no.

  let head = null;
  const intervalId = setInterval(() => {
    // snake.forEach((ele) => {
    //   boxArray[ele.y][ele.x].classList.add("snake");
    // });

    // 0 -> div div
    // 1 ->
    if (direction == "up") {
      head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction == "down") {
      head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction == "left") {
      head = { x: snake[0].x - 1, y: snake[0].y };
    } else if (direction == "right") {
      head = { x: snake[0].x + 1, y: snake[0].y };
    }
    if (
      head.x < 0 ||
      head.x >= cols ||
      head.y < 0 ||
      head.y >= rows ||
      snake.some((seg) => seg.x === head.x && seg.y === head.y)
    ) {
      // alert("Game over");
      const btn = document.getElementById("start");
      const rebtn = document.getElementById("restart");
      const h2 = document.querySelector("h2");
      h2.innerText = `Game Over! Your Score is ${score}`;
      const startScreen = document.querySelector(".aboveall");
      startScreen.style.display = "flex";
      btn.style.display = "none";
      rebtn.style.display = "block";
      rebtn.addEventListener("click", () => {
        startScreen.style.display = "none";
        Game();
      });

      clearInterval(intervalId);
      return;
    }

    snake.unshift(head);
    boxArray[head.y][head.x].classList.add("snake");
    if (head.x == food.x && head.y == food.y) {
      score++;
      generateFood();
      const scorebox = document.querySelector(".curr-score");
      scorebox.innerText = `Score: ${score}`;
    } else {
      // remove last element only when snake doesnt eat food
      let lastele = snake.pop();
      // console.log(lastele);

      boxArray[lastele.y][lastele.x].classList.remove("snake");
    }
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      const highScoreBox = document.querySelector(".high-score");
      highScoreBox.innerText = `High Score: ${highScore}`;
    }
  }, 300);

  /* Direction Change */
  document.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key == "ArrowUp" && direction != "down") {
      direction = "up";
    } else if (e.key == "ArrowLeft" && direction != "right") {
      direction = "left";
    } else if (e.key == "ArrowRight" && direction != "left") {
      direction = "right";
    } else if (e.key == "ArrowDown" && direction != "up") {
      direction = "down";
    }
  });
};
const btn = document.getElementById("start");
btn.addEventListener("click", () => {
  const startScreen = document.querySelector(".aboveall");
  startScreen.style.display = "none";
  Game();
});
