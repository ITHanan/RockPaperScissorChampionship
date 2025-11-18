import { Player, Move, MatchHistory } from '../types/player';

/**
 * Example player that analyzes opponent's most common move and counters it
 * Shows more advanced strategy with pattern analysis
 */
export class CounterPlayer implements Player {
  readonly name = 'Counter Strike';
  readonly description = 'Analyzes and counters opponent\'s most common move';

  makeMove(_opponentName: string, history: MatchHistory[]): Move {
    // If no history, play randomly
    if (history.length === 0) {
      const moves: Move[] = ['rock', 'paper', 'scissors'];
      return moves[Math.floor(Math.random() * moves.length)];
    }

    // Count opponent's moves
    const moveCounts: Record<Move, number> = {
      rock: 0,
      paper: 0,
      scissors: 0,
    };

    history.forEach(match => {
      moveCounts[match.opponentMove]++;
    });

    // Find most common move
    let mostCommonMove: Move = 'rock';
    let maxCount = 0;

    (Object.keys(moveCounts) as Move[]).forEach(move => {
      if (moveCounts[move] > maxCount) {
        maxCount = moveCounts[move];
        mostCommonMove = move;
      }
    });

    // Return the counter to their most common move
    return this.getCounter(mostCommonMove);
  }

  private getCounter(move: Move): Move {
    const counters: Record<Move, Move> = {
      rock: 'paper',
      paper: 'scissors',
      scissors: 'rock',
    };
    return counters[move];
  }
}
