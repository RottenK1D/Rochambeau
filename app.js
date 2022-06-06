const SELECTIONS = [
    {
     tool: 'rock',
     defeat: 'scissors',
    },
    {
     tool: 'paper',
     defeat: 'rock',
    },
    {
     tool: 'scissors',
     defeat: 'paper', 
    },
]

function closeCard(){
    document.querySelector('.selections').style.visibility = 'hidden';
    document.querySelector('.score-board').style.visibility = 'hidden';
    document.querySelector('.result').style.visibility = 'hidden';
}
function openCard(){
    document.querySelector('.game-card').style.height = '700px';
    document.querySelector('.game-title').innerHTML = '';
    document.querySelector('.selections').style.visibility = 'visible';
    document.querySelector('.score-board').style.visibility = 'visible';
    document.querySelector('.result').style.visibility = 'visible';
}
closeCard();
document.querySelector('button').addEventListener('click', () => {
    openCard();
    document.querySelector('button').addEventListener('click', () => {
        window.location.reload();
    })  
})

const selectionInstruments = document.querySelectorAll('[data-selection]');
const yourScore = document.querySelector('[data-user-score]');
const compScore = document.querySelector('[data-comp-score]');
let gameMessage = document.querySelector('.end-msg');
let userScore = 0;
let computerScore = 0;
let tries = 7;

function game(){
        selectionInstruments.forEach(selectionInstrument => {
                selectionInstrument.addEventListener('click', () => {
                const selectionName = selectionInstrument.dataset.selection
                const selection = SELECTIONS.find(selection => selection.tool === selectionName)
                makeSelection(selection)
            })
        })
}


  
function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);

    if(tries > 0){
        if (yourWinner) {
            incrementScore(yourScore);
            gameMessage.innerHTML = selection.tool + " vs " + computerSelection.tool;
            userScore++;
            tries--;
        }
        if (computerWinner) {
            incrementScore(compScore);
            gameMessage.innerHTML = selection.tool + " vs " +computerSelection.tool;
            computerScore++;
            tries--;
    
        }
        if(selection.tool === computerSelection.tool){
            gameMessage.innerHTML = "draw";
            tries--;
            
        }
        if(tries === 0){
            if(userScore > computerScore){
               gameMessage.innerHTML = 'you won';
            }
            if(computerScore > userScore){
               gameMessage.innerHTML = 'you lost';
            }
        }


    }    

  }

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function isWinner(selection, opponentSelection) {
    return selection.defeat === opponentSelection.tool;
  }

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex];
}

game();