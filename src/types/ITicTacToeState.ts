export enum Cell 
{
    Empty,
    X,
    O
}

export enum GameState 
{
    WaitingForPlayers,
    Playing,
    Finished,
    Idle
}

export interface ITicTacToeState 
{
    gameState: GameState
    board: Cell[]
    sector: Cell[]
    activePlayer: number
    winningPlayer: number
    currentSector: number
    sectorLatestWinningPlayer: number
}

export default ITicTacToeState