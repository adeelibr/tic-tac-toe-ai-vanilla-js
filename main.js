let origBoard;
const huPlayer = '0';
const aiPlayer = 'x';

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
startGame();

function startGame () {
  document.querySelector('.end-game').style.display = 'none';
  origBoard = Array.from(Array(9).keys());
};