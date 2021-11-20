const lettersGuessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessElement = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};


getWord();

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const guess = letterInput.value;
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Enter a letter.";
  } else if (input.length > 1) {
    message.innerText = "Enter ONE letter at a time.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a LETTER.";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that, try another.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updateGuessesRemaining(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

const showGuessedLetters = function () {
  lettersGuessed.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    lettersGuessed.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  // console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `WRONG, the word doesn't contain ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `YAASSS! ${guess} was right, keep going!`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `GAME OVER! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses`;
  }
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">Yasssss you win! Congrats!</p>`;

    startOver();
  }
};

const startOver = function () {
  guessButton.classList.add("hide");
  remainingGuessElement.classList.add("hide");
  lettersGuessed.classList.add("hide");
  playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingSpan.innerText = `${remainingGuesses} guesses`;
  lettersGuessed.innerHTML = "";
  message.innerText = "";
  getWord();

  guessButton.classList.remove("hide");
  playAgain.classList.add("hide");
  remainingGuessElement.classList.remove("hide");
  lettersGuessed.classList.remove("hide");
}); 