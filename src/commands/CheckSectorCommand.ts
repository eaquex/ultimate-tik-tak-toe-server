import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { ITicTacToeState, Cell } from '../types/ITicTacToeState'

type Payload = {
    client: Client,
    index: number
}

const getCoordinates = (idx: number) => {
    const row = Math.floor(idx/9)
    const col = idx-(row*9)

    return {
        col: col,
        row: row
    }
}

const getSector = (idx: number) => {
    const coords    = getCoordinates(idx)
    const row       = Math.floor((coords.row)/3)
    const col       = Math.floor((coords.col)/3)
    const sector    = (row*3) + col
    
    return sector
}

const getNextSector = (sectors: number[], idx: number) => {
    const coords    = getCoordinates(idx)
    const col = coords.col % 3
    const row = coords.row % 3
    const sector = (row*3) + col

    if (sectors[sector] === 0)
    {
        return sector
    }
    else
    {
        return -1
    }
}

const getOffset = (sector: number) => {
    let ox = sector % 3
    let oy = Math.floor(sector/3)

    return {
        col: ox*3,
        row: oy*3
    }
}

const getValueAt = (board: number[], row: number, col: number) => {
    const idx = (row * 9) + col

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

export default class CheckSectorCommand extends Command<ITicTacToeState, Payload> 
{
    private determineSectorWin(index:number) 
    {
        const coords = getCoordinates(index)
        const sector = getSector(index)
        const offset = getOffset(sector)
        const next = getNextSector(this.state.sector, index)

        console.log(`coords: ${coords.col}, ${coords.row} | sector: ${sector} | offset: ${offset.col}, ${offset.row} | next: ${next}`)

        // If sector is taken, return true
        if (this.state.sector[sector] !== 0)
        {
            return true
        }

        // Check sector win state
        for (let i=0; i<wins.length; i++)
        {
            let isTaken = true
            const win = wins[i]

            for (let j=1; j < win.length; ++j)
            {
                const prevCell = win[j-1]
                const cell = win[j]
                const prevValue = getValueAt(this.state.board, prevCell.row + offset.row, prevCell.col + offset.col)
                const cellValue = getValueAt(this.state.board, cell.row + offset.row, cell.col + offset.col)
                
                if (prevValue !== cellValue || prevValue === Cell.Empty)
                {
                    isTaken = false
                    break
                }
            }

            if (isTaken)
            {
                return true
            }

        }
        return false
    }   

    execute(data: Payload)
    {
        const { client, index } = data   
        const clientIndex = this.room.clients.findIndex( c => c.id == client.id)
        const cellValue = clientIndex === 0 ? Cell.X : Cell.O;

        // Skip is not player turn
        if (clientIndex !== this.room.state.activePlayer)
        {
            return
        }

        const sector = getSector(data.index)
        const isTaken = this.determineSectorWin(data.index)
        const next = getNextSector(this.state.sector, index)
        
        this.state.currentSector = next

        if (isTaken)
        {
            // Save taken value
            this.state.sector[sector] = cellValue            
        }
    }
}