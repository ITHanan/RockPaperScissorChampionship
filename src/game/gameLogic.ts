import { Move, MatchResult } from '../types/player';

/**
 * Determines the result of a Rock, Paper, Scissors match
 * @param move1 - First player's move
 * @param move2 - Second player's move
 * @returns The result from move1's perspective
 */
export function determineWinner(move1: Move, move2: Move): MatchResult {
  if (move1 === move2) {
    return 'draw';
  }

  const winningCombos: Record<Move, Move> = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };

  return winningCombos[move1] === move2 ? 'win' : 'lose';
}

/**
 * Validates if a move is valid
 */
export function isValidMove(move: any): move is Move {
  return move === 'rock' || move === 'paper' || move === 'scissors';
}

/**
 * Gets the emoji representation of a move
 */
export function getMoveEmoji(move: Move): string {
  const emojis: Record<Move, string> = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️',
  };
  return emojis[move];
}

/**
 * Calculates points based on match result
 * Win = 3 points, Draw = 1 point, Loss = 0 points
 */
export function calculatePoints(result: MatchResult): number {
  const points: Record<MatchResult, number> = {
    win: 3,
    draw: 1,
    lose: 0,
  };
  return points[result];
}
