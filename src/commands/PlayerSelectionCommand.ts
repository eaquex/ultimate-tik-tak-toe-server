import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { ITicTacToeState, Cell } from '../types/ITicTacToeState'
import CheckWinnerCommand from './CheckWinnerCommand'

type Payload = {
    client: Client
    index: number
}

export default class PlayerSelectionCommand extends Command<ITicTacToeState, Payload> 
{
    execute(data: Payload)
    {
        const { client, index } = data

        const clientIndex = this.room.clients.findIndex( c => c.id == client.id)
        const cellValue = clientIndex === 0 ? Cell.X : Cell.O;

        if (clientIndex !== this.room.state.activePlayer)
        {
            return
        }

        this.room.state.board[index] = cellValue
    }
}