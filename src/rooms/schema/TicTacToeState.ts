import { Schema, ArraySchema, type } from '@colyseus/schema'
import { Cell, GameState, ITicTacToeState } from '../../types/ITicTacToeState'

export default class TicTacToeSchema extends Schema implements ITicTacToeState
{
    @type('number')
    gameState = GameState.WaitingForPlayers

    @type(['number'])
    board: ArraySchema<Cell>

    @type(['number'])
    boardGeneral: ArraySchema<Cell>    

    @type('number')
    activePlayer = 0

    @type('number')
    winningPlayer = -1

    constructor()
    {
        super()

        this.board = new ArraySchema<Cell>(
            0, 0, 0,   0, 0, 0,   0, 0, 0,
            0, 0, 0,   0, 0, 0,   0, 0, 0,
            0, 0, 0,   0, 0, 0,   0, 0, 0,

            0, 0, 0,   0, 0, 0,   0, 0, 0,
            0, 0, 0,   0, 0, 0,   0, 0, 0,
            0, 0, 0,   0, 0, 0,   0, 0, 0,

            0, 0, 0,   0, 0, 0,   0, 0, 0,
            0, 0, 0,   0, 0, 0,   0, 0, 0,
            0, 0, 0,   0, 0, 0,   0, 0, 0
        )

        this.boardGeneral = new ArraySchema<Cell>(
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        )        

        this.activePlayer  = 0
        this.winningPlayer = -1
    }
}