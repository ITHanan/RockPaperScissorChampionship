import { describe, it, expect } from 'vitest';
import { Player, Move } from '../types/player';
import { isValidMove } from '../game/gameLogic';
import {
  RandomPlayer,
  RockPlayer,
  CyclePlayer,
  CounterPlayer,
  AdaptivePlayer
} from '../players';

/**
 * Generic test suite that validates any Player implementation
 * This ensures all players follow the interface correctly
 */
function testPlayerImplementation(player: Player) {
  describe(`${player.name} - Player Interface Compliance`, () => {
    it('should have a name', () => {
      expect(player.name).toBeDefined();
      expect(typeof player.name).toBe('string');
      expect(player.name.length).toBeGreaterThan(0);
    });

    it('should have a makeMove method', () => {
      expect(player.makeMove).toBeDefined();
      expect(typeof player.makeMove).toBe('function');
    });

    it('should return valid moves', () => {
      const move = player.makeMove('Opponent', []);
      expect(isValidMove(move)).toBe(true);
    });

    it('should handle empty history', () => {
      const move = player.makeMove('Opponent', []);
      expect(isValidMove(move)).toBe(true);
    });

    it('should handle history with previous matches', () => {
      const history = [
        { myMove: 'rock' as Move, opponentMove: 'scissors' as Move, result: 'win' as const },
        { myMove: 'paper' as Move, opponentMove: 'rock' as Move, result: 'win' as const },
      ];
      const move = player.makeMove('Opponent', history);
      expect(isValidMove(move)).toBe(true);
    });

    it('should consistently return valid moves over multiple calls', () => {
      for (let i = 0; i < 10; i++) {
        const move = player.makeMove('Opponent', []);
        expect(isValidMove(move)).toBe(true);
      }
    });
  });
}

// Test all example players
describe('Player Implementations', () => {
  testPlayerImplementation(new RandomPlayer());
  testPlayerImplementation(new RockPlayer());
  testPlayerImplementation(new CyclePlayer());
  testPlayerImplementation(new CounterPlayer());
  testPlayerImplementation(new AdaptivePlayer());
});

// Specific behavior tests
describe('Specific Player Behaviors', () => {
  describe('RockPlayer', () => {
    it('should always return rock', () => {
      const player = new RockPlayer();
      for (let i = 0; i < 10; i++) {
        expect(player.makeMove('Opponent', [])).toBe('rock');
      }
    });
  });

  describe('CyclePlayer', () => {
    it('should cycle through rock, paper, scissors', () => {
      const player = new CyclePlayer();
      expect(player.makeMove('Opponent', [])).toBe('rock');
      expect(player.makeMove('Opponent', [])).toBe('paper');
      expect(player.makeMove('Opponent', [])).toBe('scissors');
      expect(player.makeMove('Opponent', [])).toBe('rock');
    });
  });

  describe('CounterPlayer', () => {
    it('should counter the most common opponent move', () => {
      const player = new CounterPlayer();
      const history = [
        { myMove: 'rock' as Move, opponentMove: 'rock' as Move, result: 'draw' as const },
        { myMove: 'paper' as Move, opponentMove: 'rock' as Move, result: 'win' as const },
        { myMove: 'scissors' as Move, opponentMove: 'rock' as Move, result: 'lose' as const },
      ];
      // Opponent mostly plays rock, so counter with paper
      expect(player.makeMove('Opponent', history)).toBe('paper');
    });
  });
});
