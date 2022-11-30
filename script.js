'use srtict';

const titatoCell = document.querySelectorAll('.titato-cell');
const titatoResult = document.querySelector('.titato-status');

let activePlayer = 'X';
let gameplaying = true;
const gameWinnerMessage = () => `${activePlayer} win's the game`;
const gameDrawMessage = () => `The game is a draw`;

//function to switch player
const switchPlayer = function () {
  activePlayer = activePlayer === 'X' ? 'O' : 'X';
  return activePlayer;
};

let titatoSate = ['', '', '', '', '', '', '', '', ''];

let switchingPlayerTurn = () => `It's player ${activePlayer}'s turn`;

titatoResult.textContent = switchingPlayerTurn();

function tictacGameRestart() {
  gameplaying = true;
  activePlayer = 'X';
  titatoSate = ['', '', '', '', '', '', '', '', ''];
  titatoResult.textContent = switchingPlayerTurn();
  const gmCell = document.querySelectorAll('.titato-cell');
  for (let i = 0; i < gmCell.length; i++) {
    gmCell[i].textContent = '';
    console.log(gmCell[i]);
  }
}

//handle click
if (gameplaying) {
  function trackClick() {
    for (let i = 0; i < titatoCell.length; i++) {
      titatoCell[i].addEventListener('click', function () {
        const clickedCell = titatoCell[i];
        const clickedCellIndex = titatoCell[i].getAttribute('data-cell-index');

        if (titatoSate[clickedCellIndex] !== '' && gameplaying) {
          return (titatoResult.textContent =
            'That position has been played by opponent');
        } else if (titatoSate[clickedCellIndex] === '' && !gameplaying) {
          return (titatoResult.textContent = gameWinnerMessage());
        } else {
          titatoSate[clickedCellIndex] = activePlayer;
          clickedCell.textContent = activePlayer;
          switchPlayer();
          titatoResult.textContent = switchingPlayerTurn();
        }

        const winningConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [0, 4, 8],
          [1, 4, 7],
          [2, 5, 8],
          [2, 4, 6],
        ];
        function validateResult() {
          let callWinner = false;
          for (i = 0; i < winningConditions.length; i++) {
            const winningCondition = winningConditions[i];
            let a = titatoSate[winningCondition[0]];
            let b = titatoSate[winningCondition[1]];
            let c = titatoSate[winningCondition[2]];

            if (a === '' && b === '' && c === '') {
              continue;
            }

            if (a === b && b === c) {
              callWinner = true;
            }
            if (callWinner === true) {
              switchPlayer();
              titatoResult.textContent = gameWinnerMessage();
              gameplaying = false;
              titatoCell[i].setAttribute('disabled', '');
              return;
            } else {
              let gameDraw = !titatoSate.includes('');
              if (gameDraw) {
                titatoResult.textContent = gameDrawMessage();
                gameplaying = false;
                titatoCell[i].setAttribute('disabled', '');
                return;
              }
            }
          }
        }
        validateResult();
      });
    }
  }
  trackClick();
}
document
  .querySelector('.titato-restart')
  .addEventListener('click', tictacGameRestart);
