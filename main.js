let origBoard;
const HUMAN_PLAYER = '0';
const AI_PLAYER    = 'x';

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.getElementsByClassName('cell');
onStartGame();

function onStartGame () {
  // console.log('Starting Game');
  document.querySelector('.end-game').style.display = 'none';
  origBoard = Array.from(Array(9).keys());
  // console.table(origBoard);
  // console.log(cells);
  for(let i=0; i< cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', onTurnClick, false)
  }
};

function onTurnClick (e) {
  // console.log(e.target.id);
  const { id:squareId } = e.target;
  onTurn(squareId, HUMAN_PLAYER);
}

function onTurn (squareId, player) {
  document.getElementById(squareId).innerText = player;
}