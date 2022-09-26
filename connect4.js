/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
for (let i=0;i<HEIGHT;i++){
board.push([])
for(let x=0;x<WIDTH;x++){
  board[i].push(null)
  //console.log(board[i])
}}
//console.log(board)
return board
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" letiable from the item in HTML w/ID of "board"
let htmlBoard = document.querySelector('#board')
  

// This adds the top entrance area to the board
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

// This builds the rest of the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
console.log(x + ': is x')
  console.log(board)
  for(let i=HEIGHT - 1;i>=0;i--){
     if (!board[i][x]) {
      console.log(board[i][x])
      //console.log(board[i][x])
      board[i][x] = currPlayer
     // console.log(board)
     console.log(i, x)
      return i 
} 
  
  } 
  return null
}
/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let cell = document.getElementById(`${y}-${x}`)
  console.log(cell)
let newDiv = document.createElement('div')
let tableRow = document.querySelectorAll('tr')
newDiv.classList.add('piece')
if(currPlayer === 1){
  newDiv.classList.add('p1')
}else if (currPlayer === 2){
  newDiv.classList.add('p2')
}else{
  alert('Error with Turn Procession')
}
// console.log(tableRow[y].childNodes[x])
cell.append(newDiv)


}


/** endGame: announce game end */
// console.log(document.querySelector('#board').children)
function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
location.reload()
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table


  // TODO: add line to update in-memory board


  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
// if (board[0] === ['taken', 'taken', 'taken', 'taken', 'taken', 'taken', 'taken'])
function tieChecker(){
  let arr = []
  for (let x of board[0]){
  if (x === 1 || x === 2){
    arr.push('taken')
  }
}
if (arr[6] === 'taken'){
  endGame('The game has ended in a Tie')
}
}
tieChecker()


  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 2){
    currPlayer --
  } else if(currPlayer === 1){
    currPlayer++
  }else{
    throw('something went wrong with currplayer transition')
  }
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
    //  These check for a cell, a cell in a direction, 2 direction and 3 direction as long as it's within the bound stated in the win_ call.
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
// if any of those are true, a currPlayer wins.
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

console.log('place in table cdl above')
console.log(board[0])