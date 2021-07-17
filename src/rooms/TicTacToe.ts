import { Client, Room } from 'colyseus'
import { Dispatcher } from '@colyseus/command'
import { Message } from '../types/Messages'
import TicTacToeSchema from './schema/TicTacToeState'
import PlayerSelectionCommand from '../commands/PlayerSelectionCommand'
import { GameState } from '../types/ITicTacToeState'
import CheckWinnerCommand from '../commands/CheckWinnerCommand'

export default class TicTacToe extends Room<TicTacToeSchema>
{
    private dispacher = new Dispatcher(this)

    onCreate() 
    {
        this.maxClients = 2
        this.setState(new TicTacToeSchema())

        this.onMessage(Message.PlayerSelection, (client, message: { index: number}) => {
            this.dispacher.dispatch(new PlayerSelectionCommand(), {
                client,
                index: message.index
            })

            this.dispacher.dispatch(new CheckWinnerCommand(), {
                index: message.index
            })            
        })
    }

    onJoin(client: Client)
    {
        const idx = this.clients.findIndex(c => c.sessionId === client.sessionId)

        client.send(Message.PlayerIndex, { playerIndex: idx })

        if (this.clients.length >= 2)
        {
            this.state.gameState = GameState.Playing
        }
    }
}