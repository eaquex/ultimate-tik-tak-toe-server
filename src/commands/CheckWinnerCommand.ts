import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { ITicTacToeState, Cell } from '../types/ITicTacToeState'
import NextTurnCommand from './NextTurnCommand'

type Payload = {
    index: number
}

const getCoordinates = (idx: number) => {
    const row = Math.floor(idx/9)
    const col = idx-(row*9)

    return {
        col: col+1,
        row: row+1
    }
}

const getSector = (idx: number) => {
    const coords = getCoordinates(idx)
    const row       = Math.floor((coords.row-1)/3)
    const col       = Math.floor((coords.col-1)/3)
    const sector    = (row*3) + col
    
    return {
        col: col+1,
        row: row+1,
        sector: sector
    }
}

const getValueAt = (board: number[], row: number, col: number) => {
    const idx = (row * 3) + col

    return board[idx]
}

const wins = [
    [ { row:0, col:0 },  { row:0, col:1 }, { row:0, col:2 } ],
    [ { row:1, col:0 },  { row:1, col:1 }, { row:1, col:2 } ],
    [ { row:2, col:0 },  { row:2, col:1 }, { row:2, col:2 } ], 

    [ { row:0, col:0 },  { row:1, col:0 }, { row:2, col:0 } ],
    [ { row:0, col:1 },  { row:1, col:1 }, { row:2, col:1 } ],
    [ { row:0, col:2 },  { row:1, col:2 }, { row:2, col:2 } ],

    [ { row:0, col:0 },  { row:1, col:1 }, { row:2, col:2 } ],
    [ { row:0, col:2 },  { row:1, col:1 }, { row:2, col:0 } ]
]

export default class CheckWinnerCommand extends Command<ITicTacToeState, Payload> 
{
    private determineWin(index:number) 
    {
        console.log(getCoordinates(index))
        console.log(getSector(index))
        /*  
        for (let i=0; i<wins.length; i++)
        {
            let hasWinner = true
            const win = wins[i]

            for (let j=1; j < win.length; ++j)
            {
                const prevCell = win[j-1]
                const cell = win[j]
                const prevValue = getValueAt(this.state.board, prevCell.row, prevCell.col)
                const cellValue = getValueAt(this.state.board, cell.row, cell.col)
                
                if (prevValue !== cellValue || prevValue === Cell.Empty)
                {
                    hasWinner = false
                    break
                }
            }

            if (hasWinner)
            {
                return win
            }

        }*/
        return false
    }   

    execute(data: Payload)
    {
        const win = this.determineWin(data.index)

        if (win)
        {
            this.state.winningPlayer = this.state.activePlayer          
        }
        else
        {
            return [
                new NextTurnCommand()
            ]
        }
    }
}