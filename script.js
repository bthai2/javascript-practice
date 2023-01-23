const CHOICES = ['Rock', 'Paper', 'Scissors'];
const body = document.querySelector('body');
const playBtn = document.querySelector('.btn');

var informationTextVisible = true;

var pScore = 0, cScore = 0;

function addAction(node, classButton, name){
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

    container.append(btn);
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

    let text = document.createElement('div');
    text.classList.add('infoText');
    text.classList.add('visible');
    text.textContent = 'Score';
    // text.style.visibility = 'hidden';

    let outputDialog = document.createElement('div');
    outputDialog.id = 'output';
    outputDialog.textContent = 'Select Rock, Paper, or Scissors to Start';

    let scores = setupScores();
    scores.classList.add('visible');
    // scores.style.visibility = 'hidden';

    div.appendChild(text);
    div.appendChild(outputDialog);
    div.appendChild(scores);
    body.appendChild(div);
}

function toggleButtons(){
    const rockButton = document.querySelector('button.Rock');
    rockButton.disabled = !rockButton.disabled;

    const paperButton = document.querySelector('button.Paper');
    paperButton.disabled = !paperButton.disabled;

    const scissorsButton = document.querySelector('button.Scissors');
    scissorsButton.disabled = !scissorsButton.disabled;
}

function toggleText(){
    let scoreText = document.querySelector('.infoText');
    let scores = document.querySelector('.scores');
    scoreText.classList.toggle('visible');
    scores.classList.toggle('visible');
}

function resetScores() {
    pScore = 0;
    cScore = 0;
    informationTextVisible = true;
    toggleText();
}

function resetGame(){
    resetScores();
    //remove buttons
    let buttons = document.querySelector('.actions');
    body.removeChild(buttons);
    //remove info text
    let informationText = document.querySelector('.information');
    body.removeChild(informationText);
    //add play button
    let button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = 'Play!';
    button.addEventListener('click', setupGame);
    body.appendChild(button);
}

function restartGame(){
    // toggleText();
    let div = document.querySelector('.information');
    let buttons = document.querySelector('.scores');
    div.removeChild(buttons);
    resetScores();
    let instructions = document.createElement('div');
    instructions.id = 'output';
    instructions.textContent = 'Select Rock, Paper, or Scissors to Start';

    div.insertBefore(instructions, div.lastChild);
    toggleButtons();

    div.firstChild.textContent = 'Score';
}

function endGame(){
    // empty score textbox by removing 'information' container
    // child nodes
    let informationBox = document.querySelector('.information');
    
    informationBox.removeChild(informationBox.childNodes[1]);

    // change infoText information
    informationBox.firstChild.textContent = 'Game Over!';

    toggleButtons();

    // add game over buttons
    let playAgainBtn = document.createElement('button');
    playAgainBtn.classList.add('playAgain');
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.addEventListener('click', () => {
        restartGame();
    });

    let gameOverBtn = document.createElement('button');
    gameOverBtn.classList.add('gameOver');
    gameOverBtn.textContent = 'Game Over';
    gameOverBtn.addEventListener('click', () => {
        resetGame();
    })

    let div = document.createElement('div');
    div.classList.add('scores');

    div.appendChild(playAgainBtn);
    div.appendChild(gameOverBtn);

    informationBox.insertBefore(div, informationBox.lastChild);
}

function updateText(output){
    let playerScore = document.getElementById('pScore');
    let computerScore = document.getElementById('cScore');
    let outputDialog = document.getElementById('output');
    
    playerScore.textContent = 'Player: ' + pScore;
    computerScore.textContent = 'Computer: ' + cScore;
    outputDialog.textContent = output;

    if(pScore === 5 || cScore === 5){
        endGame();
    }
}

function setupGame(){
    let btn = document.querySelector('.btn');
    body.removeChild(btn);
    setupInfoText();
    setupButtons();

    const rockButton = document.querySelector('button.Rock');
    rockButton.addEventListener('click', () => {
        actionClicked('rock');
        console.log('rock');
    });

    const paperButton = document.querySelector('button.Paper');
    paperButton.addEventListener('click', () => {
        actionClicked('paper');
        console.log('paper');
    });

    const scissorsButton = document.querySelector('button.Scissors');
    scissorsButton.addEventListener('click', () => {
        actionClicked('scissors');
        console.log('scissors');
    });
}

function setupButtons(){
    let div = document.createElement('div');
    div.classList.add('actions');
    //Rock
    addAction(div, 'action Rock', 'Rock');
    //Paper
    addAction(div, 'action Paper', 'Paper');
    //Scissors
    addAction(div, 'action Scissors', 'Scissors');

    body.appendChild(div);
}

function actionClicked(action){
    if(informationTextVisible){
        toggleText();
        informationTextVisible = false; //reset this var when game end
    }

    let computerChoice = getComputerChoice();
    let output = playRound(action, computerChoice);

    if(output.includes('Win')){
        pScore++;
    } else if(output.includes('Lose')){
        cScore++;
    }
    updateText(output);
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