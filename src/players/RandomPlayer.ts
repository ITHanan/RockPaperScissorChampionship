import { Player, Move, MatchHistory } from '../types/player';

/**
 * Example player that makes random moves
 * This is a simple baseline strategy
 */
export class RandomPlayer implements Player {
  readonly name = 'Random Bot';
  readonly description = 'Makes completely random moves';

  makeMove(_opponentName: string, _history: MatchHistory[]): Move {
    const moves: Move[] = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  }
}
