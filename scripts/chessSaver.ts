//Puzzles sourced from https://www.chess.com/forum/view/more-puzzles/300-checkmate-puzzles-puzzles-1---50
let puzzleMoves: string[][] = [[], [], []];
let badMoves: string[] = [];
let solvedPuzzles: number = 0;

function puzzleHandler(puzzleNumber: number) {
  const pgnInput = document.getElementById(`puzzleInput${puzzleNumber}`) as HTMLInputElement;
  const chessPuzzleImage = document.getElementById(`chessPuzzle${puzzleNumber}`) as HTMLImageElement;

  // Get the entered move
  let chessMove = pgnInput.value.trim();

  if (chessMove !== '') {
    // Check move based on puzzle number
    switch (puzzleNumber) {
      case 1:
        if (puzzleMoves[0].length === 0) { // First move
          if (chessMove === 'Qg8') {
            puzzleMoves[0].push(chessMove);
            puzzleMoves[0].push('Rxg8'); 
            chessPuzzleImage.src = 'images/puzzle1.2.png';
            pgnInput.value = ''; 
          } else {
            badMoves.push(chessMove)
            alert('Incorrect move. Try again.');
          }
        } else if (puzzleMoves[0].length === 2 && chessMove === 'Nf7') { // Second move
          pgnInput.value = 'Congratulation, you win';
          puzzleMoves[0].push(chessMove);
          pgnInput.disabled = true; 
          chessPuzzleImage.src = 'images/puzzle1.3.png';
          solvedPuzzles = solvedPuzzles + 1;
        } else {
          alert('Incorrect move. Try again.');
        }
        break;
      case 2:
        if (puzzleMoves[1].length === 0) { // First move
          if (chessMove === 'Nxf6') {
            puzzleMoves[1].push(chessMove);
            puzzleMoves[1].push('Qxf6'); 
            chessPuzzleImage.src = 'images/puzzle2.2.png';
            pgnInput.value = ''; 
          } else {
            badMoves.push(chessMove)
            alert('Incorrect move. Try again.');
          }
        } else if (puzzleMoves[1].length === 2 && chessMove === 'Qf8') { // Second move
          puzzleMoves[1].push(chessMove);
          pgnInput.value = 'Congratulation, you win';
          pgnInput.disabled = true; 
          chessPuzzleImage.src = 'images/puzzle2.3.png';
          solvedPuzzles = solvedPuzzles + 1;
        } else {
          alert('Incorrect move. Try again.');
        }
        break;
      case 3:
        if (puzzleMoves[2].length === 0) { // First move
          if (chessMove === 'Qxf6') {
            puzzleMoves[2].push(chessMove);
            puzzleMoves[2].push('xf6'); 
            chessPuzzleImage.src = 'images/puzzle3.2.png';
            pgnInput.value = ''; 
          } else {
            badMoves.push(chessMove)
            alert('Incorrect move. Try again.');
          }
        } else if (puzzleMoves[2].length === 2 && chessMove === 'Bxf6') { // Second move
          puzzleMoves[2].push(chessMove);
          pgnInput.value = 'Congratulation, you win';
          pgnInput.disabled = true; 
          chessPuzzleImage.src = 'images/puzzle3.3.png';
          solvedPuzzles = solvedPuzzles + 1;
        } else {
          alert('Incorrect move. Try again.');
        }
        break;
      default:
        console.error('Invalid puzzle number.');
    }

    console.log('Chess Moves:', puzzleMoves[puzzleNumber - 1]);
    checkEloCondition();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const submitButtons = document.querySelectorAll('[id^="puzzleButton"]');
  submitButtons.forEach((button) => {
    const puzzleId = button.id.split('puzzleButton')[1];
    button.addEventListener('click', () => puzzleHandler(parseInt(puzzleId)));
  });
});

//Calculate Elo based on user performance 
function checkEloCondition() {
  const eloAside = document.querySelector('#eloBox');

  if (eloAside) {
    if (solvedPuzzles === 3) {
      if (badMoves.length > 5) {
        // Update the content of the aside element
        eloAside.textContent = 'Your ELO is probably at least 100!';
      } else if (badMoves.length > 3) {
        // Update the content of the aside element
        eloAside.textContent = 'Your ELO is probably at least 400!';
      } else if (badMoves.length > 1) {
        // Update the content of the aside element
        eloAside.textContent = 'Your ELO is at least 600!';
      } else if (badMoves.length === 0) {
        // Update the content of the aside element
        eloAside.textContent = 'Your ELO is at least 800!';
      }
    }
  } else {
    console.error('eloAside element not found');
  }
}


