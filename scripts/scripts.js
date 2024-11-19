const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b")
const hangmanImage = document.querySelector(".hangman-box img")
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = document.querySelector(".play-again")

let currentWord, correctLetters, wrongGuessCount;

const maxGuesses = 6;

const resetGame = () =>{
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () =>{
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word
    console.log(word);
    document.querySelector(".hint-text b").innerHTML = hint;
    resetGame();
}

const gameOver = (isVictory) =>{
    setTimeout(() => {
        const modalText = isVictory ? `You found the word`: `The correct word was:`
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : "lost"}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : "Game Over!"}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b> `;
        gameModal.classList.add("show");
    }, 300);
}

const initGame=(button, clickedLetter) =>{
    /* console.log(button, clickedLetter); */
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index)=>{
            if(letter === clickedLetter){
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
        /* console.log(clickedLetter, " is exist on the word");  */
    }else{
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
        /* console.log(clickedLetter, ' is not exist on the word'); */
    }
    button.disabled = true
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

for (let index = 97; index <= 122; index++) {
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(index);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(index)))
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord)