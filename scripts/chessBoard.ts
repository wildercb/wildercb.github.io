
//PieceType relation stored for FEN string generation
type PieceType = "pawn" | "knight" | "bishop" | "rook" | "queen" | "king";


class ChessPiece {
  type: PieceType;
  icon: string;

  constructor(type: PieceType, icon: string) {
    this.type = type;
    this.icon = icon;
  }
}

class Square {
  row: number;
  col: number;
  element: HTMLDivElement;
  piece?: ChessPiece;

  constructor(row: number, col: number, element: HTMLDivElement) {
    this.row = row;
    this.col = col;
    this.element = element;
  }
}

class PieceInventory {
  pawn: number;
  knight: number;
  bishop: number;
  rook: number;
  queen: number;
  king: number;
}
const chessboard = document.getElementById("chessboard") as HTMLDivElement;


const squares: Square[][] = [];

for (let row = 0; row < 8; row++) {
  squares[row] = [];
  for (let col = 0; col < 8; col++) {
    const square = document.createElement("div");
    square.className = `square ${(row + col) % 2 === 0 ? "white" : "black"}`;
    square.dataset.row = row.toString();
    square.dataset.col = col.toString();
    squares[row][col] = { row, col, element: square };
    chessboard.appendChild(square);
  }
}

let selectedPiece: HTMLDivElement | null = null;

//Store the amount of pieces, (Kept for future functionality)
let pieceInventory: PieceInventory = {
    pawn: 0,
    knight: 0,
    bishop: 0,
    rook: 0,
    queen: 0,
    king: 0,
  };

//Store relation between elements https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
const pieces: Record<PieceType, string> = {
  pawn: "♙",
  knight: "♘",
  bishop: "♗",
  rook: "♖",
  queen: "♕",
  king: "♔",
};

//Create pieces so they could be indexed to squares 
function placePiece(pieceType: PieceType, row: number, col: number): void {
  if (pieceInventory[pieceType] > 0) {
    const newPiece = document.createElement("div");
    newPiece.className = "chess-piece";
    newPiece.innerText = pieces[pieceType];
    squares[row][col].element.appendChild(newPiece);
    pieceInventory[pieceType]--;
  }
}

//If user clicks the piece it is selected, if piece is selected and user clicks open square piece moves to square
chessboard.addEventListener("click", function (event) {
  const target = event.target as HTMLDivElement;

  //Remove piece with double click
  if (target.classList.contains("chess-piece") && event.detail === 2) {
    target.parentNode?.removeChild(target);
    const pieceType = target.innerText as PieceType;
    pieceInventory[pieceType]++;
    return;
  }

  //Select piece and move
  if (target.classList.contains("chess-piece")) {
    if (selectedPiece) {
      selectedPiece.style.opacity = "1";
    }
    selectedPiece = target;
    selectedPiece.style.opacity = "0.5";
  } else if (target.classList.contains("square")) {
    if (selectedPiece) {
      const square = squares[parseInt(target.dataset.row || "0")][parseInt(target.dataset.col || "0")];
      if (!square.element.querySelector(".chess-piece")) {
        square.element.appendChild(selectedPiece);
        selectedPiece.style.opacity = "1";
        selectedPiece = null;
      }
    }
  }
});

//Store for piece counts
pieceInventory = {
  pawn: 16,
  knight: 4,
  bishop: 4,
  rook: 4,
  queen: 2,
  king: 2,
};

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

//Button to return fen 
const fenButton = document.querySelector("#fenButton");
if (fenButton) {
  fenButton.addEventListener("click", function () {
    const pgnString = generateFen();
    alert("PGN String:\n" + pgnString);
  });
}

//Button to refresh
const refreshButton = document.querySelector("#refButton");
if (refreshButton){
  refreshButton.addEventListener("click", function () {
    window.location.reload();
  });
}

function BuildFen(): string {
  let pgn = "";
  pgn += "[FEN \"" + BuildFen() + "\"]\n\n";
  return pgn;
}

function generateFen(): string {
    //Just a start for this, doesn't yet implement full logic for FEN string
    let fen = "";
    for (let row = 0; row < 8; row++) {
      let emptyCount = 0;
      for (let col = 0; col < 8; col++) {
        const piece = squares[row][col].element.querySelector(".chess-piece");
        if (piece) {
          if (emptyCount > 0) {
            fen += emptyCount;
            emptyCount = 0;
          }
          fen += "1";
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
  
