const CHOICES = ['Rock', 'Paper', 'Scissors']; // array of choices the computer can make
const body = document.querySelector('body');
const playBtn = document.querySelector('.btn');

var informationTextVisible = true; // boolean used to toggle visibility of text elements in scoreboard

var pScore = 0, cScore = 0; // variables to keep track of the scores of the player and computer

/**
 * Function to add an action to the given node. An action consists of
 * a button and the name text underneath it.
 * 
 * @param {object} node The Element object to add the action to.
 * @param {string} classButton The classes for the button separated by spaces.
 * @param {string} name The name of the action.
 */
function addAction(node, classButton, name){
    let container = document.createElement('div');

    let btn = document.createElement('button');

    // classes are separated by ' '
    let classes = classButton.split(' ');
    for(let cssClass of classes){ // add each given class to the button
        btn.classList.add(cssClass);
    }
    
    // make text below the button
    let text = document.createElement('div');
    text.classList.add('actions');
    text.textContent = name;
    text.style.fontSize = '32px';

    container.append(btn);
    container.appendChild(text);
    node.appendChild(container);
}

/**
 * Function to create a more readable way to display the scores.
 * 
 * @returns a div element containing the player and computer scores
 */
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

/**
 * Function to create the information text box that contains
 * the scores and output of the game.
 */
function setupInfoText(){
    // create information text box
    let div = document.createElement('div');
    div.classList.add('information');

    // creates 'title' for information text box
    let text = document.createElement('div');
    text.classList.add('infoText');
    text.classList.add('visible');
    text.textContent = 'Score';

    // creates the textbox for the output of the game
    let outputDialog = document.createElement('div');
    outputDialog.id = 'output';
    outputDialog.textContent = 'Select Rock, Paper, or Scissors to Start';

    // creates the score portion of information text box
    let scores = setupScores();
    scores.classList.add('visible');

    div.appendChild(text);
    div.appendChild(outputDialog);
    div.appendChild(scores);

    body.appendChild(div);
}

/**
 * Function to enable/disable the action buttons
 * for when the game starts/ends. 
 */
function toggleButtons(){
    const rockButton = document.querySelector('button.Rock');
    rockButton.disabled = !rockButton.disabled;

    const paperButton = document.querySelector('button.Paper');
    paperButton.disabled = !paperButton.disabled;

    const scissorsButton = document.querySelector('button.Scissors');
    scissorsButton.disabled = !scissorsButton.disabled;
}

/**
 * Function to toggle the visibility of certain information text
 * box elements to make it more user friendly/readable.
 */
function toggleText(){
    let scoreText = document.querySelector('.infoText');
    let scores = document.querySelector('.scores');

    scoreText.classList.toggle('visible');
    scores.classList.toggle('visible');
}

/**
 * Function to reset the scores and toggle information
 * text elements.
 */
function resetScores() {
    pScore = 0;
    cScore = 0;
    informationTextVisible = true;
    toggleText();
}

/**
 * Function to make the page look like the starting page with only
 * the play button visible.
 */
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

/**
 * Function to make the page the same as after the first play
 * button is clicked.
 */
function restartGame(){
    // remove play again and game over buttons
    let div = document.querySelector('.information');
    let buttons = document.querySelector('.scores');
    div.removeChild(buttons);
    // reset the scores and score text
    resetScores();
    // reset output to display beginning instructions
    let instructions = document.createElement('div');
    instructions.id = 'output';
    instructions.textContent = 'Select Rock, Paper, or Scissors to Start';

    div.insertBefore(instructions, div.lastChild); // add back instructions in proper place
    toggleButtons(); // re-enable the action buttons

    div.firstChild.textContent = 'Score'; // change 'Game Over' text to original text
}

/**
 * Function to end the current game. 
 */
function endGame(){
    // empty score textbox by removing 'information' container
    // child nodes
    let informationBox = document.querySelector('.information');
    
    informationBox.removeChild(informationBox.childNodes[1]); // removes the output from the last round

    // change infoText information
    informationBox.firstChild.textContent = 'Game Over!';

    toggleButtons(); // disable the action buttons

    // add play again button
    let playAgainBtn = document.createElement('button');
    playAgainBtn.classList.add('playAgain');
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.addEventListener('click', () => {
        restartGame();
    });

    // add game over button
    let gameOverBtn = document.createElement('button');
    gameOverBtn.classList.add('gameOver');
    gameOverBtn.textContent = 'Game Over';
    gameOverBtn.addEventListener('click', () => {
        resetGame();
    })

    let div = document.createElement('div');
    div.classList.add('scores'); // reuse scores css class instead of making a new one

    div.appendChild(playAgainBtn);
    div.appendChild(gameOverBtn);

    informationBox.insertBefore(div, informationBox.lastChild);
}

/**
 * Function to update the information text box with the new scores
 * and ends the game if either player scored 5.
 * 
 * @param {string} output the output string from the last round played.
 */
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

/**
 * Function to setup the game by adding an information
 * text box and action buttons.
 */
function setupGame(){
    let btn = document.querySelector('.btn');
    body.removeChild(btn);
    setupInfoText();
    setupButtons(); // need to setup the buttons before using querySelector function

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

/**
 * Function to add the action buttons to the document.
 */
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

/**
 * Function to play a round of rock paper scissors.
 * 
 * @param {string} action The action that the player chose.
 */
function actionClicked(action){
    // make scores visible in information text box
    if(informationTextVisible){
        toggleText();
        informationTextVisible = false; //reset this var when game end
    }

    let computerChoice = getComputerChoice();
    let output = playRound(action, computerChoice); // get output of round

    if(output.includes('Win')){ // player won
        pScore++;
    } else if(output.includes('Lose')){ // computer won
        cScore++;
    }
    updateText(output); // update the information text box
}

// attach event listener to play button when the script is run
playBtn.addEventListener('click', setupGame);


//-------------------------------------------GAME LOGIC-------------------------------------------------------------------------------------------

/**
 * Function to return a random index within the bounds of an
 * array. 
 * 
 * @param {number} arrLength the length of the array.
 * @returns a random number between 0 and array length - 1.
 */
function randomIndex(arrLength) {
    let rand = Math.random(); // gets number between 0 (inclusive) and 1 (exclusive)
    return Math.floor(rand * arrLength); // gets number between 0 and arrLength - 1
}

/**
 * Function to simulate the computer's choice by returning the
 * element at the random index of the CHOICES array.
 * 
 * @returns the computer's choice of action.
 */
function getComputerChoice() {
    let randIdx = randomIndex(CHOICES.length); // this way more elements could be added to choices without changing the code
    return CHOICES[randIdx];
}

/**
 * Function to format the string and returns it with only the first
 * letter capitalized.
 * 
 * @param {string} str The string to capitalize.
 * @returns A capitalized string.
 */
function capitalize(str) {
    let retVal = str.charAt(0).toUpperCase(); // capitalize first letter
    let restOfString = str.slice(1); // slice the rest of the string
    return retVal + restOfString.toLowerCase(); 
}

/**
 * Plays a round of rock paper scissors with the given parameters
 * and returns the outcome.
 * 
 * @param {string} playerSelection The player's choice of action.
 * @param {string} computerSelection The computer's choice of action.
 * @returns A string representing the outcome of the player choice vs computer choice.
 */
function playRound(playerSelection, computerSelection) {

    // capitalize the first letter of the choices
    let playerChoice = capitalize(playerSelection);
    let computerChoice = capitalize(computerSelection);

    //player wins
    let playerDub = (playerChoice === 'Rock' && computerChoice === 'Scissors') || 
    (playerChoice === 'Paper' && computerChoice === 'Rock') || (playerChoice === 'Scissors' && computerChoice === 'Paper');
    //computer wins
    let computerDub = (computerChoice === 'Rock' && playerChoice === 'Scissors') || 
    (computerChoice === 'Paper' && playerChoice === 'Rock') || (computerChoice === 'Scissors' && playerChoice === 'Paper');

    if(playerDub) { // player wins
        return 'You Win! ' + playerChoice + ' beats ' + computerChoice + '.';
    } else if(computerDub) { //computer wins
        return 'You Lose! ' + computerChoice + ' beats ' + playerChoice + '.';
    } else{ //tie
        return 'It\'s a Tie!';
    }
}