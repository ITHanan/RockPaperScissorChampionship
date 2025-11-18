import { Player, Move, MatchHistory, MatchResult } from '../types/player';

/**
 * Example player that adapts based on what's working
 * If winning, keeps the strategy; if losing, changes
 */
export class AdaptivePlayer implements Player {
  readonly name = 'Adaptive AI';
  readonly description = 'Adapts strategy based on recent performance';

  private recentResults: MatchResult[] = [];
  private currentStrategy: 'aggressive' | 'defensive' | 'random' = 'random';

  makeMove(_opponentName: string, history: MatchHistory[]): Move {
    // Update strategy based on recent results
    this.updateStrategy();

    if (history.length === 0) {
      return this.getRandomMove();
    }

    const lastOpponentMove = history[history.length - 1].opponentMove;

    switch (this.currentStrategy) {
      case 'aggressive':
        // Try to predict and counter
        return this.getCounter(lastOpponentMove);

      case 'defensive':
        // Assume opponent will counter us, so counter their counter
        const lastMyMove = history[history.length - 1].myMove;
        const expectedCounter = this.getCounter(lastMyMove);
        return this.getCounter(expectedCounter);

      default:
        return this.getRandomMove();
    }
  }

  onMatchResult(
    _opponentName: string,
    _myMove: Move,
    _opponentMove: Move,
    result: MatchResult
  ): void {
    this.recentResults.push(result);

    // Keep only last 5 results
    if (this.recentResults.length > 5) {
      this.recentResults.shift();
    }
  }

  private updateStrategy(): void {
    if (this.recentResults.length < 3) return;

    const wins = this.recentResults.filter(r => r === 'win').length;
    const losses = this.recentResults.filter(r => r === 'lose').length;

    if (wins > losses) {
      // Keep current strategy or go aggressive
      this.currentStrategy = 'aggressive';
    } else if (losses > wins) {
      // Change strategy
      this.currentStrategy = this.currentStrategy === 'defensive' ? 'random' : 'defensive';
    }
  }

  private getRandomMove(): Move {
    const moves: Move[] = ['rock', 'paper', 'scissors'];
    return moves[Math.floor(Math.random() * moves.length)];
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
