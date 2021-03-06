import { Command } from '@colyseus/command'
import ITicTacToeState from '../types/ITicTacToeState'

export default class ResetStateCommand extends Command<ITicTacToeState>
{
    execute()
    {
        this.room.state.activePlayer = 0
        this.room.state.board = []
        this.room.state.sector = []
        this.room.state.currentSector = -1
        this.room.state.sectorLatestWinningPlayer = -1
    }
}