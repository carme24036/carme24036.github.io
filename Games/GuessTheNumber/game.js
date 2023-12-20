let points = 0;

// Game Rules
function gameRuless() {
     alert("This is a game where you have to guess a number within a certain range that progressively gets higher with each level. To play, click the Level 1 button.")
     alert("To keep playing the same level, just press enter on the keyboard when you guess the number.")
     alert("You get a certain amount of points in each level, depending on its difficilty.")
     alert("The more points you have, the more levels you can play. You can also gain points from playing the minigame. (Still in progress)")
}

// Reload
function reload() {
     location.reload()
}

// See Points
function seePoints() {
     alert('You have ' + points + ' points.')
}

// Mini Game
function minigame() {
     alert("Mini-game is still in progress")
     return;

}

// Lvl 1
function guessLvl1(guess) {
     let randNum = Math.floor(Math.random() * 10) + 1;

     let userGuess = prompt("Guess a number between 1 and 10:");

     while (userGuess != randNum) {
          if (userGuess < randNum) {
               alert("Number is too low, try again");
          } else if (userGuess > randNum) {
               alert("Number is too high, try again")
          } else {
               break
          }
          userGuess = prompt("Guess a number between 1 and 10:");
     }

     if (userGuess == randNum) {
          alert("Correct! The number was " + randNum + " \n +2 Points");
          points += 2;
     }

     if (guess == null) {
          return
     }
}


// Lvl 2
function guessLvl2(guess) {
     if (points < 5) {
          alert("You need at least 5 points to play level 2")
          return;
     }
     let randNum = Math.floor(Math.random() * 20) + 1;

     let userGuess = prompt("Guess a number between 1 and 20:");

     while (userGuess != randNum && points >= 5) {
          if (userGuess < randNum) {
               alert("Number is too low, try again");
          } else if (userGuess > randNum) {
               alert("Number is too high, try again")
          } else {
               break
          }
          userGuess = prompt("Guess a number between 1 and 20:");
     }

     if (userGuess == randNum) {
          alert("Correct! The number was " + randNum + " \n +4 Points");
          points += 4;
     }
}

// Lvl 3
function guessLvl3(guess) {
     if (points < 15) {
          alert("You need at least 15 points to play level 3")
          return;
     }
     let randNum = Math.floor(Math.random() * 30) + 1;

     let userGuess = prompt("Guess a number between 1 and 30:");

     while (userGuess != randNum && points >= 15) {
          if (userGuess < randNum) {
               alert("Number is too low, try again");
          } else if (userGuess > randNum) {
               alert("Number is too high, try again")
          } else {
               break
          }
          userGuess = prompt("Guess a number between 1 and 30:");
     }

     if (userGuess == randNum) {
          alert("Correct! The number was " + randNum + " \n +6 Points");
          points += 6;
     }
}

// Lvl 4
function guessLvl4(guess) {
     if (points < 25) {
          alert("You need at least 30 points to play level 4")
          return;
     }
     let randNum = Math.floor(Math.random() * 30) + 1;

     let userGuess = prompt("Guess a number between 1 and 40:");

     while (userGuess != randNum && points >= 30) {
          if (userGuess < randNum) {
               alert("Number is too low, try again");
          } else if (userGuess > randNum) {
               alert("Number is too high, try again")
          } else {
               break
          }
          userGuess = prompt("Guess a number between 1 and 40:");
     }

     if (userGuess == randNum) {
          alert("Correct! The number was " + randNum + " \n +8 Points");
          points += 8;
     }
}
