// List of words for the game
const words = [
     "hangman", "developer", "programming",
     "coffee", "pasta", "awesome",
     "hippopotomonstrosesquippedaliophobia",
     "awkward", "embezzle", "pneumonia", "fuchsia",
     "abruptly", "bandwagon", "rhythm", "activity",
     "technology", "pancake", "spaghetti", "khaki",
     "quiz", "wave", "voodoo", "gossip"
];

// Choose a random word
let selectedWord = words[Math.floor(Math.random() * words.length)];

// Array to track guessed letters
let guessedLetters = [];

// Maximum attempts allowed
const maxAttempts = 6;

// Initialize the game
function initializeGame() {
     guessedLetters = [];
     updateWordDisplay();
     updateAttempts();
}

// Update the displayed word with underscores for missing letters
function updateWordDisplay() {
     const wordDisplay = document.getElementById("word-display");
     wordDisplay.textContent = selectedWord
          .split("")
          .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
          .join(" ");
}

// Update the list of guessed letters
function updateGuessedLetters() {
     const lettersGuessedElement = document.getElementById("letters-guessed");
     lettersGuessedElement.textContent = "Letters Guessed: " + guessedLetters.join(", ");
}

// Update the remaining attempts
function updateAttempts() {
     const attemptsLeftElement = document.getElementById("attempts-left");
     attemptsLeftElement.textContent = maxAttempts - countIncorrectGuesses() + " out of " + maxAttempts;
}

// Count the number of incorrect guesses
function countIncorrectGuesses() {
     return guessedLetters.filter(letter => !selectedWord.includes(letter)).length;
}

// Check if the player has won
function checkWin() {
     return selectedWord.split("").every(letter => guessedLetters.includes(letter));
}

// Check if the player has lost
function checkLoss() {
     return countIncorrectGuesses() >= maxAttempts;
}

// Handle key presses
document.addEventListener("keydown", function (event) {
     const key = event.key.toLowerCase();

     if (/^[a-z]$/.test(key) && !guessedLetters.includes(key)) {
          guessedLetters.push(key);
          updateWordDisplay();
          updateGuessedLetters();
          updateAttempts();

          if (checkWin()) {
               initializeGame();
               alert("Congratulations! You guessed the word: " + selectedWord);
               location.reload()
          } else if (checkLoss()) {
               initializeGame();
               alert("Sorry, you ran out of attempts. The correct word was: " + selectedWord);
               location.reload()
          }
     }
});

// Initialize the game on page load
initializeGame();