import { Piece } from "../models/Piece"
import { Player } from "../models/Player"

export function generateBoardArray(player1: Player, player2: Player): Piece[][] {
    const boardArray: Piece[][] = []
    for (let i = 0; i < 8; i++) {
        boardArray.push(new Array(8).fill(Piece.None))
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