const CHOICES = ['Rock', 'Paper', 'Scissors'];

function randomIndex(arrLength) {
    let rand = Math.random(); // gets number between 0 (inclusive) and 1 (exclusive)
    return Math.floor(rand * arrLength); // gets number between 0 and arrLength - 1
}

function getComputerChoice() {
    let randIdx = randomIndex(CHOICES.length); // this way more elements could be added to choices without changing the code
    return CHOICES[randIdx];
}

console.log(getComputerChoice());