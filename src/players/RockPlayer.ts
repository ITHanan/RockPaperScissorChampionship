import { Player, Move, MatchHistory } from '../types/player';

/**
 * Example player that always plays rock
 * Simple but predictable strategy
 */
export class RockPlayer implements Player {
  readonly name = 'Rock Solid';
  readonly description = 'Always plays rock - the classic strategy';

  makeMove(_opponentName: string, _history: MatchHistory[]): Move {
    return 'rock';
  }
}
