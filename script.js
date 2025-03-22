document.querySelector(".rules-btn").addEventListener("click", function() {
  document.querySelector(".rules-container").style.display = "block";
});
function toggleRules() {
  document.querySelector(".rules-container").style.display = "none";
}
const userChoiceDisplay = document.getElementById("user-choice-display").querySelector("img");
const computerChoiceDisplay = document.getElementById("computer-choice-display").querySelector("img");
const triangleContainer = document.querySelector(".triangle-container");
const resultContainer = document.querySelector(".result-container");
const playAgainBtn = document.getElementById("play-again-btn");

const choices = document.querySelectorAll('.triangle-container .choice');
const userScoreEl = document.getElementById('user-score');
const computerScoreEl = document.getElementById('compter-score');
let userScore =localStorage.getItem('userScore') ? parseInt(localStorage.getItem('userScore')) : 0;
let computerScore =localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;
userScoreEl.textContent = userScore;
computerScoreEl.textContent = computerScore;
const messageEl = document.getElementById('message');
const choicesArray = ['rock','paper','scissors'];
function getComputerChoice(){
  return choicesArray[Math.floor(Math.random() * 3)];
}
function createFallingStars() {
  let starCount = 100;  

  for (let i = 0; i < starCount; i++) {
    let star = document.createElement("div");
    star.classList.add("star");
    star.innerHTML = "⭐";

    star.style.left = Math.random() * window.innerWidth + "px"; 
    star.style.top = -Math.random() * 200 + "px"; 
    star.style.animationDuration = (2 + Math.random() * 3) + "s"; 
    star.style.animationDelay = Math.random() * 2 + "s"; 

    document.body.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 5000); 
  }
}
function determineWinner(userChoice, computerChoice) {
  userChoiceDisplay.classList.remove("winner");
  computerChoiceDisplay.classList.remove("winner");
  if (userChoice === computerChoice) {
      messageEl.textContent = "IT'S A TIE!";
  } 
  else if (
      (userChoice === 'rock' && computerChoice === 'scissors') || 
      (userChoice === 'scissors' && computerChoice === 'paper') || 
      (userChoice === 'paper' && computerChoice === 'rock')
  ) {
      userScore++;
      localStorage.setItem('userScore', userScore);
      userScoreEl.textContent = userScore;
      messageEl.textContent = "YOU WIN AGAINST PC!";
      userChoiceDisplay.classList.add("winner");
      createFallingStars();  
  } 
  else {
      computerScore++;
      localStorage.setItem('computerScore', computerScore);
      computerScoreEl.textContent = computerScore;
      messageEl.textContent = "PC WIN AGAINST YOU!";
      computerChoiceDisplay.classList.add("winner");
  }
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id;
    const computerChoice = getComputerChoice();
    userChoiceDisplay.src = `./images/${userChoice}.png`;
    computerChoiceDisplay.src = `./images/${computerChoice}.png`;
    const borderColors = {
      rock: "#bd00ff",
      paper: "#0074b6",
      scissors: "#ffa943"
    };

    document.getElementById("user-choice-display").style.border = `10px solid ${borderColors[userChoice]}`;
    document.getElementById("computer-choice-display").style.border = `10px solid ${borderColors[computerChoice]}`;

    triangleContainer.style.display = "none";
    resultContainer.style.display = "flex";

    determineWinner(userChoice, computerChoice);
  });
});

playAgainBtn.addEventListener("click", () => {
  resultContainer.style.display = "none";
  triangleContainer.style.display = "flex";
  userChoiceDisplay.classList.remove("winner");
  computerChoiceDisplay.classList.remove("winner");
});
document.getElementById("reset-btn").addEventListener("click", function () {
  userScore = 0;
  computerScore = 0;
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);
  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
});