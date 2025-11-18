/**
 * Represents a move in Rock, Paper, Scissors
 */
export type Move = 'rock' | 'paper' | 'scissors';

/**
 * Result of a single match
 */
export type MatchResult = 'win' | 'lose' | 'draw';

/**
 * Interface that all student players must implement
 * Students will create a class that implements this interface
 */
export interface Player {
  /**
   * Unique name for the player (student's name or chosen player name)
   */
  readonly name: string;

  /**
   * Optional description or strategy hint
   */
  readonly description?: string;

  /**
   * Make a move in the game
   * @param opponentName - The name of the opponent
   * @param history - Array of previous matches against this opponent
   * @returns The chosen move: 'rock', 'paper', or 'scissors'
   */
  makeMove(
    opponentName: string,
    history: MatchHistory[]
  ): Move;

  /**
   * Optional: Called after each match to inform the player of the result
   * Useful for players that want to learn or adapt
   */
  onMatchResult?(
    opponentName: string,
    myMove: Move,
    opponentMove: Move,
    result: MatchResult
  ): void;
}

/**
 * Record of a single match between two players
 */
export interface MatchHistory {
  myMove: Move;
  opponentMove: Move;
  result: MatchResult;
}

/**
 * Stats for a player in the tournament
 */
export interface PlayerStats {
  name: string;
  wins: number;
  losses: number;
  draws: number;
  totalMatches: number;
  points: number; // 3 for win, 1 for draw, 0 for loss
}

/**
 * Represents a match between two players
 */
export interface Match {
  player1: string;
  player2: string;
  player1Move: Move;
  player2Move: Move;
  winner: string | 'draw';
  timestamp: number;
}
