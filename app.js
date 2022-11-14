const userChoiceDom = document.createElement('h1');
const computerChoiceDom = document.createElement('h1');
const resultDom = document.createElement('h1');
const gameGrid = document.getElementById('game');
const playAgain = document.createElement('button');
const gameModeDom = document.createElement('h1');
gameGrid.append(gameModeDom, resultDom);
const gameModeChoices = document.querySelectorAll('input');
gameModeDom.innerHTML = 'Game mode: single';

const userPointsDom = document.createElement('h2');
const computerPointsDom = document.createElement('h2');

const choices = ['rock', 'paper', 'scissors'];
let userChoice;
let computerChoice;

let gameMode;

let userPoints = 0;
let computerPoints = 0;

const setGameMode = () => {
    if (document.getElementById('gameModeSingle').checked) {
        playAgain.remove();
        userPoints = 0;
        computerPoints = 0;
        gameMode = 'single';
        userPointsDom.innerHTML = ``;
        computerPointsDom.innerHTML = ``;
        gameGrid.append(resultDom, userChoiceDom, computerChoiceDom);

    }
    if (document.getElementById('gameModeTriple').checked) {
        gameMode = 'triple';
        userPointsDom.innerHTML = `User points: ${userPoints}`;
        computerPointsDom.innerHTML = `Computer points: ${computerPoints}`;
        gameGrid.append(userPointsDom, computerPointsDom);
    }
    gameModeDom.innerHTML = `Game mode: ${gameMode}`;
}

setGameMode();

gameModeChoices.forEach(choice => {
    choice.addEventListener('click', setGameMode);
});


const handleClick = (e) => {
    userChoice = e.target.id;
    userChoiceDom.innerHTML = `User choice: ${userChoice}`;
    generateComputerChoice();
    if (gameMode === 'single') {
        getResults();
    }
    if (gameMode === 'triple') {
        getTripleResults();
    }
}

const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    computerChoice = randomChoice;
    computerChoiceDom.innerHTML = `Computer choice: ${computerChoice}`;
}

resetGame = () => {
    userPoints = 0;
    computerPoints = 0;
    userPointsDom.innerHTML = `User points: ${userPoints}`;
    computerPointsDom.innerHTML = `Computer points: ${computerPoints}`;
    computerChoiceDom.innerHTML = `Computer choice: `;
    userChoiceDom.innerHTML = `User choice: `;
    resultDom.innerHTML = '';
    playAgain.remove();
    enableButtons();
}

const getResults = () => {
    switch (userChoice + computerChoice) {
        case 'scissorspaper':
        case 'rockscissors':
        case 'paperrock':
            resultDom.innerHTML = 'User wins';
            break;
        case 'paperscissors':
        case 'scissorsrock':
        case 'rockpaper':
            resultDom.innerHTML = 'Computer wins';
            break;
        case 'paperpaper':
        case 'scissorsscissors':
        case 'rockrock':
            resultDom.innerHTML = 'Its a tie';
            break;
    }
}

const getTripleResults = () => {
    switch (userChoice + computerChoice) {
        case 'scissorspaper':
        case 'rockscissors':
        case 'paperrock':
            resultDom.innerHTML = 'User wins this round';
            userPoints++;
            userPointsDom.innerHTML = `User points: ${userPoints}`;
            computerPointsDom.innerHTML = `Computer points: ${computerPoints}`;
            break;
        case 'paperscissors':
        case 'scissorsrock':
        case 'rockpaper':
            resultDom.innerHTML = 'Computer wins this round';
            computerPoints++;
            userPointsDom.innerHTML = `User points: ${userPoints}`;
            computerPointsDom.innerHTML = `Computer points: ${computerPoints}`;
            break;
        case 'paperpaper':
        case 'scissorsscissors':
        case 'rockrock':
            resultDom.innerHTML = 'Its a tie';
            userPointsDom.innerHTML = `User points: ${userPoints}`;
            computerPointsDom.innerHTML = `Computer points: ${computerPoints}`;
            break;
    }
    if (userPoints === 3) {
        disableButtons();
        resultDom.innerHTML = 'User wins the game';
        playAgain.innerHTML = 'Play again';
        gameGrid.append(playAgain);
        playAgain.addEventListener('click', resetGame);
    }
    if (computerPoints === 3) {
        disableButtons();
        resultDom.innerHTML = 'Computer wins the game';
        playAgain.innerHTML = 'Play again';
        gameGrid.append(playAgain);
        playAgain.addEventListener('click', resetGame);
    }

}

const disableButtons = () =>{
    document.getElementById('rock').disabled = true;
    document.getElementById('paper').disabled = true;
    document.getElementById('scissors').disabled = true;
}

const enableButtons = () =>{
    document.getElementById('rock').disabled = false;
    document.getElementById('paper').disabled = false;
    document.getElementById('scissors').disabled = false;
}


for (let i = 0; i < choices.length; i++) {
    const button = document.createElement('button');
    button.id = choices[i];
    button.innerHTML = choices[i];
    button.addEventListener('click', handleClick);
    gameGrid.appendChild(button);
}