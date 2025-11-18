import { Player, Move, MatchHistory } from '../types/player';

/**
 * Example player that cycles through rock -> paper -> scissors
 * Predictable but shows stateful behavior
 */
export class CyclePlayer implements Player {
  readonly name = 'Cycle Master';
  readonly description = 'Cycles through rock, paper, scissors in order';

  private moveCount = 0;

  makeMove(_opponentName: string, _history: MatchHistory[]): Move {
    const moves: Move[] = ['rock', 'paper', 'scissors'];
    const move = moves[this.moveCount % 3];
    this.moveCount++;
    return move;
  }
}
