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

function findWinner(playerChoice, computerChoice){
    //player wins
    let playerDub = (playerChoice == 'Rock' && computerChoice == 'Scissors') || 
    (playerChoice == 'Paper' && computerChoice == 'Rock') || (playerChoice == 'Scissors' && computerChoice == 'Paper');
    //computer wins
    let computerDub = (computerChoice == 'Rock' && playerChoice == 'Scissors') || 
    (computerChoice == 'Paper' && playerChoice == 'Rock') || (computerChoice == 'Scissors' && playerChoice == 'Paper');

    if(playerDub) {
        return 'You Win! ' + playerChoice + ' beats ' + computerChoice + '.';
    } else if(computerDub) {
        return 'You Lose! ' + computerChoice + ' beats ' + playerChoice + '.';
    } else{ //tie
        return 'It\'s a Tie!';
    }
}

function oneRound(playerSelection, computerSelection) {
    let playerChoice = capitalize(playerSelection);

}

console.log(findWinner('Rock', 'Scissors'));
console.log(findWinner('Paper', 'Scissors'));
console.log(findWinner('Scissors', 'Scissors'));