const CHOICES = ['Rock', 'Paper', 'Scissors'];
const body = document.querySelector('body');
const playBtn = document.querySelector('.btn');

var pScore = 0, cScore = 0;

function addBtn(node, classButton, name){
    let container = document.createElement('div');

    let btn = document.createElement('button');
    // btn.classList.add(classButton.split(' '));
    let classes = classButton.split(' ');
    for(let cssClass of classes){
        btn.classList.add(cssClass);
    }
    // btn.textContent = text;
    let text = document.createElement('div');
    text.classList.add('actions');
    text.textContent = name;
    text.style.fontSize = '32px';

    container.appendChild(btn);
    container.appendChild(text);
    node.appendChild(container);
}

function setupScores() {
    let scores = document.createElement('div');
    scores.classList.add('scores');

    let player = document.createElement('div');
    player.id = 'pScore';
    player.textContent = 'Player: ' + pScore;

    let computer = document.createElement('div');
    computer.id = 'cScore';
    computer.textContent = 'Computer: ' + cScore;

    scores.appendChild(player);
    scores.appendChild(computer);

    return scores;
}

function setupInfoText(){
    let div = document.createElement('div');
    div.classList.add('information');
    div.textContent = 'Score';

    let scores = setupScores();

    div.appendChild(scores);
    body.appendChild(div);
}

function updateScores(){
    let playerScore = document.getElementById('pScore');
    let computerScore = document.getElementById('cScore');
    playerScore.textContent = 'Player: ' + pScore;
    computerScore.textContent = 'Computer: ' + cScore;
}

function setupGame(){
    body.removeChild(playBtn);
    setupInfoText();
    setupButtons();

    const rockButton = document.querySelector('button.Rock');
    rockButton.addEventListener('click', () => {
        actionClicked('rock');
    });

    const paperButton = document.querySelector('button.Paper');
    paperButton.addEventListener('click', () => {
        actionClicked('paper');
    });

    const scissorsButton = document.querySelector('button.Scissors');
    scissorsButton.addEventListener('click', () => {
        actionClicked('scissors');
    });
}

function setupButtons(){
    let div = document.createElement('div');
    div.classList.add('actions');
    //Rock
    addBtn(div, 'action Rock', 'Rock');
    //Paper
    addBtn(div, 'action Paper', 'Paper');
    //Scissors
    addBtn(div, 'action Scissors', 'Scissors');

    body.appendChild(div);
}

function actionClicked(action){
    let computerChoice = getComputerChoice();
    let output = playRound(action, computerChoice);

    if(output.includes('Win')){
        pScore++;
    } else if(output.includes('Lose')){
        cScore++;
    }
    console.log(output);
    updateScores();
}

// update UI to have buttons for the game
playBtn.addEventListener('click', setupGame);


//--------------------GAME LOGIC---------------------------------------

function randomIndex(arrLength) {
    let rand = Math.random(); // gets number between 0 (inclusive) and 1 (exclusive)
    return Math.floor(rand * arrLength); // gets number between 0 and arrLength - 1
}

function getComputerChoice() {
    let randIdx = randomIndex(CHOICES.length); // this way more elements could be added to choices without changing the code
    return CHOICES[randIdx];
}

function capitalize(str) {
    let retVal = str.charAt(0).toUpperCase(); // capitalize first letter
    let restOfString = str.slice(1);
    return retVal + restOfString.toLowerCase();
}

function playRound(playerSelection, computerSelection) {
    let playerChoice = capitalize(playerSelection);
    let computerChoice = capitalize(computerSelection);

    //player wins
    let playerDub = (playerChoice === 'Rock' && computerChoice === 'Scissors') || 
    (playerChoice === 'Paper' && computerChoice === 'Rock') || (playerChoice === 'Scissors' && computerChoice === 'Paper');
    //computer wins
    let computerDub = (computerChoice === 'Rock' && playerChoice === 'Scissors') || 
    (computerChoice === 'Paper' && playerChoice === 'Rock') || (computerChoice === 'Scissors' && playerChoice === 'Paper');

    if(playerDub) {
        return 'You Win! ' + playerChoice + ' beats ' + computerChoice + '.';
    } else if(computerDub) {
        return 'You Lose! ' + computerChoice + ' beats ' + playerChoice + '.';
    } else{ //tie
        return 'It\'s a Tie!';
    }
}

function game(){
    let playerChoice, computerChoice;
    let playerScore = 0, computerScore = 0; // keeps track of the scores for each player
    while (playerScore < 5 && computerScore < 5){
        playerChoice = prompt('Rock, Paper, or Scissors?');
        computerChoice = getComputerChoice();
        let output = playRound(playerChoice, computerChoice);

        //adjust scores
        if(output.includes('Win')){
            playerScore++;
        } else if(output.includes('Lose')){
            computerScore++;
        }

        console.log(output);
        console.log('Player: ' + playerScore + ' : ' + 'Computer: ' + computerScore);
    }
    console.log('Game Over!');
}