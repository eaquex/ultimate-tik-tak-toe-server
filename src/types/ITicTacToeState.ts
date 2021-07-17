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
    activePlayer: number
    winningPlayer: number
}

export default ITicTacToeState