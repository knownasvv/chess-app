import { Piece } from "./Piece"
import { PiecePosition } from "./Piece"

export enum Color {
    White = "white",
    Black = "black"
}

// Store player color, pieces detail (location, alive/dead)
export class Player {
    username: string
    color: Color
    piecePositions: PiecePosition[]

    constructor(username: string, color: Color) {
        this.username = username
        this.color = color
        this.piecePositions = Player.generateStartingPiecePositions(color)
    }

    private static generateStartingPiecePositions(color: Color): PiecePosition[] {
        const row = color === Color.White ? 0 : 7
        const pawnRow = color === Color.White ? 1 : 6
        const piecePositions: PiecePosition[] = []
        for (let i = 0; i < 8; i++) {
            piecePositions.push(new PiecePosition(i, pawnRow, Piece.Pawn))
        }
        piecePositions.push(new PiecePosition(0, row, Piece.Rook))
        piecePositions.push(new PiecePosition(1, row, Piece.Knight))
        piecePositions.push(new PiecePosition(2, row, Piece.Bishop))
        piecePositions.push(new PiecePosition(3, row, Piece.Queen))
        piecePositions.push(new PiecePosition(4, row, Piece.King))
        piecePositions.push(new PiecePosition(5, row, Piece.Bishop))
        piecePositions.push(new PiecePosition(6, row, Piece.Knight))
        piecePositions.push(new PiecePosition(7, row, Piece.Rook))
        return piecePositions
    }
}