//first run npm install stockfish then uncomment
/*
import * as Stockfish from 'stockfish';

const fenInput = document.getElementById('fenHolder') as HTMLTextAreaElement;
const outputElement = document.getElementById('stockfishOutput') as HTMLTextAreaElement;

async function analyzeFEN() {
  // Get FEN string from input
  const fenString = fenInput.value.trim();

  // Stockfish engine
  const engine = await Stockfish.Stockfish();
  await engine.setPosition(fenString);

  // Get top 5 best moves and their scores
  const moves = await engine.getBestMoves(5);

  outputElement.innerText = `Stockfish analysis for:\n${fenString}\n\n`;
  for (const move of moves) {
    outputElement.innerText += `${move.san} (${move.score}) -`;
  }

  // Close engine
  await engine.close();
}

const analyzeButton = document.getElementById('analyze');
if (analyzeButton) {
    analyzeButton.addEventListener('click', analyzeFEN);
}
*/