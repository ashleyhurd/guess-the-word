const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remining");
const remainingDisplay = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playButton = document.querySelector(".play-again ");

const word = "magnolia";

const inProgress = function (word) {
    const inProgressLetters = [];
    for (const letter of word) {
        console.log(letter);
        inProgressLetters.push("●");
    }
    wordInProgress.innerText = inProgressLetters.join("");
};

inProgress(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const.guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});