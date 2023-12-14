const chessboard = document.getElementById("chessboard");
chessboard.style.width = "400px";
chessboard.style.margin = "auto";

const squares = [];

for (let row = 0; row < 8; row++) {
  squares[row] = [];
  for (let col = 0; col < 8; col++) {
    const square = document.createElement("div");
    square.className = `square ${((row + col) % 2 === 0) ? "white" : "black"}`;
    square.dataset.row = row;
    square.dataset.col = col;
    squares[row][col] = square;
    chessboard.appendChild(square);
  }
}

let selectedPiece = null;
let pieceInventory = {}; 

const pieces = {
  pawn: "♙",
  knight: "♘",
  bishop: "♗",
  rook: "♖",
  queen: "♕",
  king: "♔",
};

function placePiece(pieceType, row, col) {
  if (pieceInventory[pieceType] > 0) {
    const newPiece = document.createElement("div");
    newPiece.className = "chess-piece";
    newPiece.innerText = pieces[pieceType];
    squares[row][col].appendChild(newPiece);
    pieceInventory[pieceType]--;
  }
}

chessboard.addEventListener("click", function (event) {
  const target = event.target;

  // Remove a piece on double-click
  if (target.classList.contains("chess-piece") && event.detail === 2) {
    target.parentNode.removeChild(target);
    // Update piece inventory
    const pieceType = target.innerText;
    pieceInventory[pieceType]++;
    return;
  }

  // Move a piece
  if (target.classList.contains("chess-piece")) {
    if (selectedPiece) {
      selectedPiece.style.opacity = 1;
    }
    selectedPiece = target;
    selectedPiece.style.opacity = 0.5;
  } else if (target.classList.contains("square")) {
    if (selectedPiece) {
      if (!target.querySelector(".chess-piece")) {
        target.appendChild(selectedPiece);
        selectedPiece.style.opacity = 1;
        selectedPiece = null;
      }
    }
  }
});

// Initialize piece inventory
pieceInventory = {
  pawn: 16,
  knight: 4,
  bishop: 4,
  rook: 4,
  queen: 2,
  king: 2,
};

// Place starting pieces for both sides
// Black side
placePiece("king", 0, 4);
placePiece("queen", 0, 3);
placePiece("rook", 0, 0);
placePiece("rook", 0, 7);
placePiece("knight", 0, 1);
placePiece("knight", 0, 6);
placePiece("bishop", 0, 2);
placePiece("bishop", 0, 5);
for (let col = 0; col < 8; col++) {
  placePiece("pawn", 1, col);
}

// White side
placePiece("king", 7, 4);
placePiece("queen", 7, 3);
placePiece("rook", 7, 0);
placePiece("rook", 7, 7);
placePiece("knight", 7, 1);
placePiece("knight", 7, 6);
placePiece("bishop", 7, 2);
placePiece("bishop", 7, 5);
for (let col = 0; col < 8; col++) {
  placePiece("pawn", 6, col);
}

// Button to show PGN string
const fenButton = document.createElement("button");
fenButton.textContent = "Show FEN";
fenButton.id = "fenButton";
fenButton.addEventListener("click", function () {
  const pgnString = generatePgn();
  alert("PGN String:\n" + pgnString);
});

const refreshButton = document.createElement("button");
refreshButton.textContent = "Refresh";
refreshButton.id = "refButton";

refreshButton.addEventListener("click", function () {
  // Reload the current page
  window.location.reload();
});



document.body.appendChild(fenButton);
document.body.appendChild(refreshButton);

// Function to generate PGN string
function generatePgn() {
  let pgn = "";

  // Add initial position tag
  pgn += "[SetUp \"1\"]\n";
  pgn += "[FEN \"" + generateFen() + "\"]\n\n";

  // Add moves (currently empty for initial position)
  pgn += "1. ";
  pgn += "\n\n";

  return pgn;
}

// Function to generate FEN string
function generateFen() {
  let fen = "";
  for (let row = 0; row < 8; row++) {
    let emptyCount = 0;
    for (let col = 0; col < 8; col++) {
      const piece = squares[row][col].querySelector(".chess-piece");
      if (piece) {
        if (emptyCount > 0) {
          fen += emptyCount;
          emptyCount = 0;
        }
        fen += "1"; // Use "1" instead of the actual piece character
      } else {
        emptyCount++;
      }
    }
    if (emptyCount > 0) {
      fen += emptyCount;
    }
    if (row < 7) {
      fen += "/";
    }
  }
  return fen;
}
