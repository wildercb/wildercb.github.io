var ChessPiece = /** @class */ (function () {
    function ChessPiece(type, icon) {
        this.type = type;
        this.icon = icon;
    }
    return ChessPiece;
}());
var Square = /** @class */ (function () {
    function Square(row, col, element) {
        this.row = row;
        this.col = col;
        this.element = element;
    }
    return Square;
}());
var PieceInventory = /** @class */ (function () {
    function PieceInventory() {
    }
    return PieceInventory;
}());
var chessboard = document.getElementById("chessboard");
var squares = [];
for (var row = 0; row < 8; row++) {
    squares[row] = [];
    for (var col = 0; col < 8; col++) {
        var square = document.createElement("div");
        square.className = "square ".concat((row + col) % 2 === 0 ? "white" : "black");
        square.dataset.row = row.toString();
        square.dataset.col = col.toString();
        squares[row][col] = { row: row, col: col, element: square };
        chessboard.appendChild(square);
    }
}
var selectedPiece = null;
//Store the amount of pieces, (Kept for future functionality)
var pieceInventory = {
    pawn: 0,
    knight: 0,
    bishop: 0,
    rook: 0,
    queen: 0,
    king: 0,
};
//Store relation between elements https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
var pieces = {
    pawn: "♙",
    knight: "♘",
    bishop: "♗",
    rook: "♖",
    queen: "♕",
    king: "♔",
};
//Create pieces so they could be indexed to squares 
function placePiece(pieceType, row, col) {
    if (pieceInventory[pieceType] > 0) {
        var newPiece = document.createElement("div");
        newPiece.className = "chess-piece";
        newPiece.innerText = pieces[pieceType];
        squares[row][col].element.appendChild(newPiece);
        pieceInventory[pieceType]--;
    }
}
//If user clicks the piece it is selected, if piece is selected and user clicks open square piece moves to square
chessboard.addEventListener("click", function (event) {
    var _a;
    var target = event.target;
    //Remove piece with double click
    if (target.classList.contains("chess-piece") && event.detail === 2) {
        (_a = target.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(target);
        var pieceType = target.innerText;
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
    }
    else if (target.classList.contains("square")) {
        if (selectedPiece) {
            var square = squares[parseInt(target.dataset.row || "0")][parseInt(target.dataset.col || "0")];
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
for (var col = 0; col < 8; col++) {
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
for (var col = 0; col < 8; col++) {
    placePiece("pawn", 6, col);
}
//Button to return fen 
var fenButton = document.querySelector("#fenButton");
if (fenButton) {
    fenButton.addEventListener("click", function () {
        var pgnString = generateFen();
        alert("PGN String:\n" + pgnString);
    });
}
//Button to refresh
var refreshButton = document.querySelector("#refButton");
if (refreshButton) {
    refreshButton.addEventListener("click", function () {
        window.location.reload();
    });
}
function BuildFen() {
    var pgn = "";
    pgn += "[FEN \"" + BuildFen() + "\"]\n\n";
    return pgn;
}
function generateFen() {
    //Just a start for this, doesn't yet implement full logic for FEN string
    var fen = "";
    for (var row = 0; row < 8; row++) {
        var emptyCount = 0;
        for (var col = 0; col < 8; col++) {
            var piece = squares[row][col].element.querySelector(".chess-piece");
            if (piece) {
                if (emptyCount > 0) {
                    fen += emptyCount;
                    emptyCount = 0;
                }
                fen += "1";
            }
            else {
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
