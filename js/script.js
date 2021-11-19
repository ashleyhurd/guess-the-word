const lettersGuessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remining");
const remainingDisplay = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again ");

let word = "magnolia";
const guessedLetters = [];
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
    const guess = letter.value;
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letter.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter one letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have already guessed that letter; please try again!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        guessesRemaining(guess);
        showGuessed();
        updateWord(guessedLetters);
    }
};

const showGuessed = function () {
    lettersGuessed.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        lettersGuessed.append(li);
    }
};

const updateWord = function (guessedLetters) {
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

const guessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `WRONG! Sorry, try again!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yaaas! ${guess} was right, keep going :)`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `WRONG, WRONG, WRONG! The correct word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingDisplay.innerText = `${remainingGuesses} guess`;
    } else {
        remainingDisplay.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

