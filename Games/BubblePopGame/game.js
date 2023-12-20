document.addEventListener('DOMContentLoaded', () => {
     const gameContainer = document.getElementById('game-container');
     const scoreValue = document.getElementById('score-value');

     let score = 0;
     let bubblesPopped = 0;

     function getRandomColor() {
          const letters = '0123456789ABCDEF';
          do {
               color = '#';
               for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
               }
          } while (color === '#FFA500' || color === '#008000' || color === '#FFFF00'); // Exclude orange, green, and yellow
          return color;
     }

     function createBubble() {
          const bubble = document.createElement('div');
          bubble.className = 'bubble';
          bubble.style.left = `${Math.random() * (gameContainer.clientWidth - 40)}px`;
          bubble.style.top = `${Math.random() * (gameContainer.clientHeight - 40)}px`;

          bubble.style.backgroundColor = getRandomColor();
          bubble.addEventListener('click', () => {
               popBubble(bubble);
          });

          gameContainer.appendChild(bubble);

          // Have the bubble to fade out after half a second
          setTimeout(() => {
               fadeOutBubble(bubble);
          }, 500);
     }

     function fadeOutBubble(bubble) {
          let opacity = 1;
          const fadeOutInterval = setInterval(() => {
               opacity -= 0.02; // Adjust the fade speed as needed
               bubble.style.opacity = opacity;

               if (opacity <= 0) {
                    clearInterval(fadeOutInterval);
                    gameContainer.removeChild(bubble);

                    bubblesPopped++;
                    if (bubblesPopped >= 10) {
                         // Adjust the timing or speed for the next set of bubbles
                         bubblesPopped = 0;
                    }
               }
          }, 20);
     }

     function popBubble(bubble) {
          bubble.style.transform = 'scale(0)';
          score++;
          scoreValue.textContent = score;
     }

     function startGame() {
          // remvoe the gameLyaer from the body
          document.body.removeChild(document.getElementsByClassName("game-layer")[0]);
          setInterval(() => {
               createBubble();
          }, 500);
     }

     // create a fucntion that will create a div layer with a start button that will start the game when a button inside is clicked
     function createGameLayer() {
          const gameLayer = document.createElement("div");
          gameLayer.classList.add("game-layer");

          // make the gameLayer css z index 99 and position in the center of the screen
          gameLayer.style.zIndex = "99";
          gameLayer.style.position = "absolute";
          gameLayer.style.top = "50%";
          gameLayer.style.left = "50%";
          gameLayer.style.transform = "translate(-50%, -50%)";
          // give the gamLayer a css style with a background image of a gradient
          gameLayer.style.backgroundImage = "linear-gradient(90deg, #c89eff, #df77ff)";
          // make the gameLayer css width and height 100% of the screen size
          gameLayer.style.width = "100%";
          gameLayer.style.height = "100%";
          gameLayer.style.textAlign = "center";

          const startButton = document.createElement("button");
          startButton.textContent = "Start Game";
          startButton.style.padding = "1.5%";
          startButton.style.color = "#d86ce6";
          startButton.style.backgroundColor = "#f4c9ff";
          startButton.style.border = "2px solid #d86ce6";
          startButton.style.borderRadius = "8%";
          startButton.style.fontFamily = "monospace";
          startButton.style.fontWeight = "Bold";
          startButton.style.fontSize = "24px";

          // make the startButton centered in the gameLayer using style 
          startButton.style.position = "absolute";
          startButton.style.top = "50%";
          startButton.style.left = "50%";
          startButton.style.transform = "translate(-50%, -50%)";

          startButton.addEventListener("click", startGame);

          gameLayer.appendChild(startButton);
          // add the gameLayer to the body
          document.body.appendChild(gameLayer);

     }



     createGameLayer();
});
