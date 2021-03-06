import { Schema, ArraySchema, type } from '@colyseus/schema'
import { Cell, GameState, ITicTacToeState } from '../../types/ITicTacToeState'

export default class TicTacToeSchema extends Schema implements ITicTacToeState
{
    @type('number')
    gameState = GameState.WaitingForPlayers

    @type(['number'])
    board: ArraySchema<Cell>

    @type(['number'])
    sector: ArraySchema<Cell>    

    @type('number')
    activePlayer = 0

    @type('number')
    currentSector = -1    

    @type('number')
    sectorLatestWinningPlayer = -1

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

        this.sector = new ArraySchema<Cell>(
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        )        

        this.activePlayer  = 0
        this.currentSector = -1
        this.sectorLatestWinningPlayer = -1
        this.winningPlayer = -1
    }
}