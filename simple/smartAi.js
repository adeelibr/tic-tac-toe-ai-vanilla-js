let origBoard;
const HUMAN_PLAYER = '0';
const AI_PLAYER = 'x';

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

function onStartGame() {
  // console.log('Starting Game');
  document.querySelector('.end-game').style.display = 'none';
  origBoard = Array.from(Array(9).keys());
  // console.table(origBoard);
  // console.log(cells);
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', onTurnClick, false)
  }
};

function onTurnClick(e) {
  // console.log(e.target.id);
  const { id: squareId } = e.target;
  if (typeof origBoard[squareId] === 'number') {
    onTurn(squareId, HUMAN_PLAYER);
    if (!onCheckGameTie()) {
      onTurn(botPicksSpot(), AI_PLAYER)
    }
  } else {
    const message = 'That spot is already taken, click somewhere else';
    alert(message);
  }
}

function onTurn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let isGameWon = onCheckWin(origBoard, player);
  // console.log(isGameWon)
  if (isGameWon) {
    onGameOver(isGameWon);
  }
}

function onCheckWin(board, player) {
  let plays = board.reduce((a, e, i) => {
    return (e === player) ? a.concat(i) : a;
  }, []);
  let gameWon = false;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {
        index: index,
        player: player
      };
      break;
    }
  }
  return gameWon;
}

function onGameOver({ index, player }) {
  for (let i of winCombos[index]) {
    const color = (player === HUMAN_PLAYER) ? '#2196f3' : '#f44336';
    document.getElementById(i).style.backgroundColor = color;
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', onTurnClick, false)
  }

  const result = (player === HUMAN_PLAYER) ? 'You Win' : 'You Lose';
  onDeclareWinner(result);
}

function onDeclareWinner(who) {
  // console.log('Result: ', who);
  document.querySelector('.end-game').style.display = 'block';
  document.querySelector('.end-game .text').innerText = `Result: ${who}`;
}

/**
 * Bot moves
 */

function onCheckGameTie() {
  if (emptySquares().length === 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = '#8bc34a';
      cells[i].removeEventListener('click', onTurnClick, false)
    }
    onDeclareWinner('A Tie');
    return true;
  } else {
    return false;
  }
}

function emptySquares() {
  return origBoard.filter(item => typeof item === 'number');
}

function botPicksSpot() {
  return minimax(origBoard, AI_PLAYER).index;
}

function minimax(newBoard, player) {
  let availableSpots = emptySquares();

  if (onCheckWin(newBoard, HUMAN_PLAYER)) {
    return { score: -10 }
  } else if (onCheckWin(newBoard, AI_PLAYER)) {
    return { score: 10 }
  } else if (availableSpots.length === 0) {
    return { score: 0 }
  }

  let moves = [];

  for (let i=0; i<availableSpots.length; i++) {
    let move = {};
    move.index = newBoard[availableSpots[i]];
    newBoard[availableSpots[i]] = player;

    if (player === AI_PLAYER) {
      let result = minimax(newBoard, HUMAN_PLAYER);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, AI_PLAYER);
      move.score = result.score;
    } // end of if/else block

    newBoard[availableSpots[i]] = move.index;
    moves.push(move);
  } // end of for look

  let bestMove;

  if (player === AI_PLAYER) {
    let bestScore = -10000;
    for (let i=0; i<moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    } // end of for loop
  } 
  else {
    let bestScore = 10000;
    for (let i=0; i<moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
} // end of minimax func()