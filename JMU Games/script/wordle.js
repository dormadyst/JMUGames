const NUM_GUESSES = 6;
let guessesRemaining = NUM_GUESSES;
let currentGuess = [];
let nextLetter = 0;
const WORDS_KEY = "gameWords";

function initializeWords() {
  const storedWords = JSON.parse(localStorage.getItem(WORDS_KEY));
  if (!storedWords || storedWords.length === 0) {
    const words = ["dukes", "james", "engeo", "eagle", "short", "white", "dhall", "ehall", "greek", "logan", "mauck", "moody", "union", "devon", "upark", "grace"];
    localStorage.setItem(WORDS_KEY, JSON.stringify(words));
  }
}

function getNextWord() {
  let storedWords = JSON.parse(localStorage.getItem(WORDS_KEY));
  if (!storedWords || storedWords.length === 0) {
    initializeWords();
    storedWords = JSON.parse(localStorage.getItem(WORDS_KEY));
  }
  const randomIndex = Math.floor(Math.random() * storedWords.length);
  const nextWord = storedWords[randomIndex];
  storedWords.splice(randomIndex, 1); // Remove the selected word from the array
  localStorage.setItem(WORDS_KEY, JSON.stringify(storedWords)); // Update local storage
  return nextWord;
}

let correctString = getNextWord();

console.log(correctString);

function gameboard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < NUM_GUESSES; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === "#5f147f") {
        return;
      }

      if (oldColor === "yellow" && color !== "#5f147f") {
        return;
      }

      elem.style.backgroundColor = color;
      break;
    }
  }
}

function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
}

function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";
  let correctGuess = Array.from(correctString);

  for (const val of currentGuess) {
    guessString += val;
  }

  if (guessString.length != 5) {
    console.error("Not enough letters!");
    return;
  }

  var letterColor = ["gray", "gray", "gray", "gray", "gray"];

  //check green
  for (let i = 0; i < 5; i++) {
    if (correctGuess[i] == currentGuess[i]) {
      letterColor[i] = "#5f147f";
      correctGuess[i] = "#";
    }
  }

  //check yellow
  //checking guess letters
  for (let i = 0; i < 5; i++) {
    if (letterColor[i] == "#5f147f") continue;

    //checking right letters
    for (let j = 0; j < 5; j++) {
      if (correctGuess[j] == currentGuess[i]) {
        letterColor[i] = "yellow";
        correctGuess[j] = "#";
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    let box = row.children[i];
    let delay = 250 * i;
    setTimeout(() => {
      //flip box
      animateCSS(box, "flipInX");
      //shade box
      box.style.backgroundColor = letterColor[i];
      shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
    }, delay);
  }

  if (guessString === correctString) {
    alert("You guessed right! Game over!");
    guessesRemaining = 0;
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
      alert(`You've run out of guesses! Game over!\nThe right word was: "${correctString}"`);
      //console.info(`The right word was: "${correctString}"`);
    }
  }
}

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter];
  animateCSS(box, "pulse");
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
}

const animateCSS = (element, animation, prefix = "animate__") =>

  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;
    node.style.setProperty("--animate-duration", "0.3s");

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

  document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
    checkGuess();
    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});

document.getElementById("keyboard").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }
  let key = target.textContent;

  if (key === "Del") {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

// Code for button
const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.querySelector('.sidebar');
    
toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
});

initializeWords();
gameboard();