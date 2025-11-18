import { describe, it, expect } from 'vitest';
import { determineWinner, isValidMove, calculatePoints } from '../game/gameLogic';

describe('Game Logic', () => {
  describe('determineWinner', () => {
    it('should return draw for identical moves', () => {
      expect(determineWinner('rock', 'rock')).toBe('draw');
      expect(determineWinner('paper', 'paper')).toBe('draw');
      expect(determineWinner('scissors', 'scissors')).toBe('draw');
    });

    it('should return win when rock beats scissors', () => {
      expect(determineWinner('rock', 'scissors')).toBe('win');
    });

    it('should return lose when rock loses to paper', () => {
      expect(determineWinner('rock', 'paper')).toBe('lose');
    });

    it('should return win when paper beats rock', () => {
      expect(determineWinner('paper', 'rock')).toBe('win');
    });

    it('should return lose when paper loses to scissors', () => {
      expect(determineWinner('paper', 'scissors')).toBe('lose');
    });

    it('should return win when scissors beats paper', () => {
      expect(determineWinner('scissors', 'paper')).toBe('win');
    });

    it('should return lose when scissors loses to rock', () => {
      expect(determineWinner('scissors', 'rock')).toBe('lose');
    });
  });

  describe('isValidMove', () => {
    it('should return true for valid moves', () => {
      expect(isValidMove('rock')).toBe(true);
      expect(isValidMove('paper')).toBe(true);
      expect(isValidMove('scissors')).toBe(true);
    });

    it('should return false for invalid moves', () => {
      expect(isValidMove('invalid')).toBe(false);
      expect(isValidMove('')).toBe(false);
      expect(isValidMove(null)).toBe(false);
      expect(isValidMove(undefined)).toBe(false);
      expect(isValidMove(123)).toBe(false);
    });
  });

  describe('calculatePoints', () => {
    it('should return 3 points for a win', () => {
      expect(calculatePoints('win')).toBe(3);
    });

    it('should return 1 point for a draw', () => {
      expect(calculatePoints('draw')).toBe(1);
    });

    it('should return 0 points for a loss', () => {
      expect(calculatePoints('lose')).toBe(0);
    });
  });
});
