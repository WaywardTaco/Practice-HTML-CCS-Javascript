let score = JSON.parse(
    localStorage.getItem('score')
) || {
    wins: 0,
    losses: 0,
    ties: 0
};

const resultElement = document.querySelector('.js-result');
const movesElements = document.querySelector('.js-moves');
const scoreElement = document.querySelector('.js-score');

updateResultsElement('');
resetMovesElement();
updateScoreElement();

function playGame(playerMove){
    const computerMove = pickComputerMove();
    const result = calculateResult(playerMove, computerMove);
    
    updateResultsElement(result);
    updateMovesElement(playerMove, computerMove);
    updateScoreElement();
    
    localStorage.setItem('score', JSON.stringify(score));
}

function updateResultsElement(result){
    resultElement.innerHTML = result;
}

function updateMovesElement(playerMove, computerMove){
    movesElements.innerHTML = 
        `You 
        <img src="images/${playerMove}-emoji.png" class="move-icon"/>
         vs
        <img src="images/${computerMove}-emoji.png" class="move-icon"/>
        Computer`
}

function resetMovesElement(){
    movesElements.innerHTML = '';
}

function updateScoreElement(){
    scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

function pickComputerMove(){
    const randomNumber = Math.random();
    if(randomNumber >= 0 && randomNumber < 1/3){
        return 'Rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3){
        return 'Paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1){
        return 'Scissors';
    }
}

function calculateResult(playerMove, computerMove){
    if(playerMove === computerMove){
        score.ties++;
        return 'It\'s a Tie! :|';
    }

    if(
        (computerMove === 'Rock' && playerMove === 'Paper') ||
        (computerMove === 'Paper' && playerMove === 'Scissors') ||
        (computerMove === 'Scissors' && playerMove === 'Rock')
    ){
        score.wins++;
        return 'You Win! :\)';
    }
    if(
        (computerMove === 'Rock' && playerMove === 'Scissors') ||
        (computerMove === 'Paper' && playerMove === 'Rock') ||
        (computerMove === 'Scissors' && playerMove === 'Paper')
    ){
        score.losses++;
        return 'You Lose! :\(';
    }            
}