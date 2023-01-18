const CHOICES = ['Rock', 'Paper', 'Scissors'];

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

game();