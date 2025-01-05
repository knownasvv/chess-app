import { Player } from "./src/models/Player"
import { Color } from "./src/models/Player"
import { Piece } from "./src/models/Piece"

// HELPERS
// Translate players board to 2D array
function generateBoardArray(player1: Player, player2: Player): Piece[][] {
    const boardArray: Piece[][] = []
    for (let i = 0; i < 8; i++) {
        boardArray.push(new Array(8).fill(null))
    }

    // Place pieces on board
    for (const piecePosition of player1.piecePositions) {
        boardArray[piecePosition.y][piecePosition.x] = piecePosition.piece
    }
    for (const piecePosition of player2.piecePositions) {
        boardArray[piecePosition.y][piecePosition.x] = piecePosition.piece
    }
    return boardArray
}

// Print to readable board
// Give each column space 10 characters wide
// E.g. 
/**
 *   |  a       | b          | c          | d       | e    | f      | g      | h    |
 * 8 | Rook     | Knight     | Bishop     | Queen   | King | Bishop | Knight | Rook | 8
 */
function printBoard(boardArray: Piece[][]) {
    const columnLabels = "abcdefgh"
    console.log(" ".repeat(3) + columnLabels.split("").map((column) => " " + column.padEnd(9)).join("|"))
    console.log("  " + "-".repeat(90))
    for (let i = 0; i < 8; i++) {
        console.log((8 - i) + " |" + boardArray[i].map((piece) => piece ? " " + piece.toString().padEnd(9) : " ".repeat(10)).join("|") + " | " + (8 - i))
        console.log("  " + "-".repeat(90))
    }
    console.log(" ".repeat(3) + columnLabels.split("").map((column) => " " + column.padEnd(9)).join("|"))
}

// MAIN 
let player1 = new Player("Alice", Color.White)
let player2 = new Player("Bob", Color.Black)

printBoard(generateBoardArray(player1, player2))