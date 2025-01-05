import { Player } from "./Player"

export enum Piece {
    King = "king",
    Queen = "queen",
    Bishop = "bishop",
    Knight = "knight",
    Rook = "rook",
    Pawn = "pawn",
    None = "none"
}

// Store piece type and position
export class PiecePosition {
    x: number
    y: number
    piece: Piece

    constructor(x: number, y: number, piece: Piece) {
        this.x = x
        this.y = y
        this.piece = piece
    }

    // Validate position string
    static validatePosition(position: string): boolean {
        const isValidPositionLength = position.length === 2
        const isLowercaseLetter = position.charCodeAt(0) >= 97
        const isValidColumn = position.charCodeAt(0) <= 104
        const isValidRow = parseInt(position[1]) >= 1
        const isRowWithinBounds = parseInt(position[1]) <= 8
        return isValidPositionLength && isLowercaseLetter && isValidColumn && isValidRow && isRowWithinBounds
    }

    // Convert position string to x, y
    // E.g. A1 => 0, 0
    static fromPosition(position: string): number[] {
        if (!PiecePosition.validatePosition(position)) {
            throw new Error("Invalid position")
        }
        const x = position.charCodeAt(0) - 97 // a = 0, b = 1, c = 2, ...
        const y = 8 - parseInt(position[1]) // 1 = 7, 2 = 6, 3 = 5, ...
        return [x, y]
    }

    static getPlayerByPosition(position: string, player1: Player, player2: Player): Player {
        const [x, y] = PiecePosition.fromPosition(position)
        for (const piecePosition of player1.piecePositions) {
            if (piecePosition.x === x && piecePosition.y === y) {
                return player1
            }
        }
        for (const piecePosition of player2.piecePositions) {
            if (piecePosition.x === x && piecePosition.y === y) {
                return player2
            }
        }
        throw new Error("No player found")
    }

    // Convert x, y to position string
    // E.g. 0, 0 => A1
    toPosition(x: number, y: number): string {
        return String.fromCharCode(x + 97) + (y + 1)
    }
}