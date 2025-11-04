let player;
let hearts = [];
let bombs = [];
let score = 0;
let gameOver = false;
let gameWon = false;
let heartImg, bombImg;

function preload() {
  heartImg = loadImage('heart.png');
  bombImg = loadImage('bomb.png');
}

function setup() {
  // create canvas and attach it to the canvas-holder div so instructions can live outside the canvas
  let cnv = createCanvas(400, 600);
  cnv.parent('canvas-holder');
  player = createVector(width / 2, height - 50);
// create hearts and bombs
  for (let i = 0; i < 5; i++) {
    hearts.push(createVector(random(width), random(-600, 0)));
    bombs.push(createVector(random(width), random(-600, 0)));
  }
}

function draw() {
  // set canvas background to requested hex color
  background('#ffc2e7ff');

  if (gameOver || gameWon) {
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    if (gameOver) {
      text("💔 Game Over 💔", width / 2, height / 2);
    } else {
      text("💖 You Win! 💖", width / 2, height / 2);
    }
    return;
  }

  // Draw the player
  fill(255, 105, 180);
  ellipse(player.x, player.y, 50, 50);

  // Move and draw the hearts
  for (let h of hearts) {
    image(heartImg, h.x, h.y, 30, 30);
    h.y += 2;

    // check distance between player and heart
    if (dist(player.x, player.y, h.x, h.y) < 30) {
      score++;
      h.y = random(-600, 0);
      h.x = random(width);
    }
    if (h.y > height) {
      h.y = random(-600, 0);
      h.x = random(width);
    }
  }

  // Move and draw the bombs
  for (let b of bombs) {
    image(bombImg, b.x, b.y, 30, 30);
    b.y += 3;

    // check distance between player and bomb
    if (dist(player.x, player.y, b.x, b.y) < 30) {
      gameOver = true;
    }

    if (b.y > height) {
      b.y = random(-600, 0);
      b.x = random(width);
    }
  }

  // win or lose
  if (score >= 10) {
    gameWon = true;
  }

  // Display the score
  fill(0);
  textSize(40);
  textAlign(LEFT, TOP);
  text("Hearts: " + score, 10, 10);

  // keep player on-screen
  player.x = constrain(player.x, 25, width - 25);
}

// movement
function keyPressed() {
  // Allow Arrow keys and A/D (both lower and upper case) to move the player
  if (keyCode === LEFT_ARROW || (key && key.toLowerCase && key.toLowerCase() === 'a')) {
    player.x -= 20;
  } else if (keyCode === RIGHT_ARROW || (key && key.toLowerCase && key.toLowerCase() === 'd')) {
    player.x += 20;
  }
}
