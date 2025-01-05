import React, { JSX, useState } from "react";
import "./Board.css";
import { Color, Player } from "../../models/Player";
import { generateBoardArray } from "../../utils/board-helper";
import { Piece, PiecePosition } from "../../models/Piece";

const Board: React.FC = () => {
  const player1 = new Player("Alice", Color.White);
  const player2 = new Player("Bob", Color.Black);

  const boardArray: Piece[][] = generateBoardArray(player1, player2);

  const renderSquare = (i: number) => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const color = (x + y) % 2 === 1 ? "black" : "white";
    const className = "square " + color;

    // e.g. A1, B2
    const boardMap = String.fromCharCode(97 + x) + (8 - y);

    // Get piece color based on the player
    const pieceColor = player1.piecePositions.some((piece) => piece.x === x && piece.y === y) ? "white" : "black";

    const pieceType = boardArray[y][x]
    const imagePath = `${process.env.PUBLIC_URL}/images/pieces/${pieceColor}-${pieceType}.png`;

    // On click, highlight the square
    return (
      <div key={i} className={className}>
        <p className="board-map">{boardMap}</p>
        {/* Insert piece image */}
        {pieceType && !pieceType.match("none") && (
          <img src={imagePath} alt={`${pieceColor}-${pieceType}`} />
        )}
      </div>
    );
  };

  // UseState for squares
  const [squares, setSquares] = useState<JSX.Element[][]>(updateSquares());
  function updateSquares() {
    const newSquares: JSX.Element[][] = [];
    for (let i = 0; i < 8; i++) {
      const newRowSquares = [...Array(8)].map((_, j) => renderSquare(i * 8 + j));
      newSquares.push(newRowSquares);
    }
    console.log("Updating squares");
    return newSquares;
  }

  const [currentPlayer, setCurrentPlayer] = useState<Player>(player1.color === Color.White ? player1 : player2);
  function handleSubmitMove() {
    // Get selected piece
    const selectedPiece = document.getElementById("selected-piece") as HTMLInputElement;
    const selectedPieceValue = selectedPiece.value;

    // Get destination
    const destination = document.getElementById("destination") as HTMLInputElement;
    const destinationValue = destination.value;

    // Check if the move is valid
    // If valid, move the piece
    const pieceOwnedByPlayer = PiecePosition.getPlayerByPosition(selectedPieceValue, player1, player2);
    if (currentPlayer !== pieceOwnedByPlayer) {
      console.log("Invalid move: Piece does not belong to player");
      return;
    }

    // Check if destination is valid
    const [x, y] = PiecePosition.fromPosition(destinationValue);
    if (boardArray[y][x] !== Piece.None) {
      console.log("Invalid move: Destination is not empty");
      return;
    }

    // Move piece
    const [selectedX, selectedY] = PiecePosition.fromPosition(selectedPieceValue);
    boardArray[y][x] = boardArray[selectedY][selectedX];
    boardArray[selectedY][selectedX] = Piece.None;

    // Update player data
    const pieceIndex = currentPlayer.piecePositions.findIndex((piece) => piece.x === selectedX && piece.y === selectedY);
    currentPlayer.piecePositions[pieceIndex].x = x;
    currentPlayer.piecePositions[pieceIndex].y = y;

    // Refresh board
    console.log("Move successful");
    setSquares(updateSquares());

    setCurrentPlayer(currentPlayer.username === player1.username ? player2 : player1);
    console.log("Current player turn: ", currentPlayer.username);
  };

  return (
    <>
      <div className="container">
        <div className="board">
          {squares.map((row, i) => (
            <div key={i} className="board-row">
              {row}
            </div>
          ))}
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{player1.username}</td>
                <td>{player1.color}</td>
              </tr>
              <tr>
                <td>{player2.username}</td>
                <td>{player2.color}</td>
              </tr>
            </tbody>
          </table>

          <hr />
          {/* Form to input player move, piece and destination */}
          <form>
            <h2>Player Move</h2>
            {/* Whose player's turn */}
            <p>Current player turn</p>
            <h3><b>{currentPlayer.username}</b></h3>

            {/* Selected Piece */}
            <label htmlFor="selected-piece">Piece to move</label>
            <br />
            <input type="text" name="selected-piece" id="selected-piece" />
            <br />
            <br />

            {/* Destination */}
            <label htmlFor="destination">Destination</label>
            <br />
            <input type="text" name="destination" id="destination" />

            <br />
            <br />
            <input
              type="button"
              value="Submit move"
              onClick={handleSubmitMove}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Board;
