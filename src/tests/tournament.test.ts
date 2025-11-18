import { describe, it, expect, beforeEach } from 'vitest';
import { Tournament } from '../tournament/Tournament';
import { RockPlayer } from '../players/RockPlayer';
import { RandomPlayer } from '../players/RandomPlayer';
import { Player, Move, MatchHistory } from '../types/player';

// Test player that always plays paper
class PaperPlayer implements Player {
  readonly name = 'Paper Player';
  makeMove(_opponentName: string, _history: MatchHistory[]): Move {
    return 'paper';
  }
}

describe('Tournament', () => {
  let players: Player[];
  let tournament: Tournament;

  beforeEach(() => {
    players = [
      new RockPlayer(),
      new PaperPlayer(),
      new RandomPlayer(),
    ];
    tournament = new Tournament(players);
  });

  it('should initialize with correct number of players', () => {
    const leaderboard = tournament.getLeaderboard();
    expect(leaderboard).toHaveLength(3);
  });

  it('should initialize all players with zero stats', () => {
    const leaderboard = tournament.getLeaderboard();
    leaderboard.forEach(stats => {
      expect(stats.wins).toBe(0);
      expect(stats.losses).toBe(0);
      expect(stats.draws).toBe(0);
      expect(stats.totalMatches).toBe(0);
      expect(stats.points).toBe(0);
    });
  });

  it('should run round-robin tournament', async () => {
    await tournament.runTournament(0); // 0 delay for fast test

    // With 3 players, there should be 3 matches total
    // Player1 vs Player2, Player1 vs Player3, Player2 vs Player3
    const matches = tournament.getMatches();
    expect(matches).toHaveLength(3);
  });

  it('should update stats after tournament', async () => {
    await tournament.runTournament(0);

    const leaderboard = tournament.getLeaderboard();
    leaderboard.forEach(stats => {
      // Each player should have played 2 matches (in a 3-player tournament)
      expect(stats.totalMatches).toBe(2);
      expect(stats.wins + stats.losses + stats.draws).toBe(2);
    });
  });

  it('should correctly determine winner between Rock and Paper', async () => {
    const rockPlayer = new RockPlayer();
    const paperPlayer = new PaperPlayer();
    const smallTournament = new Tournament([rockPlayer, paperPlayer]);

    await smallTournament.runTournament(0);

    const leaderboard = smallTournament.getLeaderboard();
    const paperStats = leaderboard.find(s => s.name === 'Paper Player')!;
    const rockStats = leaderboard.find(s => s.name === 'Rock Solid')!;

    // Paper should beat Rock
    expect(paperStats.wins).toBe(1);
    expect(paperStats.losses).toBe(0);
    expect(rockStats.wins).toBe(0);
    expect(rockStats.losses).toBe(1);
  });

  it('should calculate points correctly', async () => {
    const rockPlayer = new RockPlayer();
    const paperPlayer = new PaperPlayer();
    const smallTournament = new Tournament([rockPlayer, paperPlayer]);

    await smallTournament.runTournament(0);

    const leaderboard = smallTournament.getLeaderboard();
    const paperStats = leaderboard.find(s => s.name === 'Paper Player')!;
    const rockStats = leaderboard.find(s => s.name === 'Rock Solid')!;

    // Win = 3 points, Loss = 0 points
    expect(paperStats.points).toBe(3);
    expect(rockStats.points).toBe(0);
  });

  it('should sort leaderboard by points', async () => {
    await tournament.runTournament(0);

    const leaderboard = tournament.getLeaderboard();

    // Check that leaderboard is sorted by points (descending)
    for (let i = 0; i < leaderboard.length - 1; i++) {
      expect(leaderboard[i].points).toBeGreaterThanOrEqual(leaderboard[i + 1].points);
    }
  });

  it('should emit events during tournament', async () => {
    const events: string[] = [];

    tournament.addListener(event => {
      events.push(event.type);
    });

    await tournament.runTournament(0);

    expect(events).toContain('start');
    expect(events).toContain('match');
    expect(events).toContain('complete');
  });

  it('should reset tournament correctly', async () => {
    await tournament.runTournament(0);

    tournament.reset();

    const leaderboard = tournament.getLeaderboard();
    const matches = tournament.getMatches();

    expect(matches).toHaveLength(0);
    leaderboard.forEach(stats => {
      expect(stats.wins).toBe(0);
      expect(stats.losses).toBe(0);
      expect(stats.draws).toBe(0);
      expect(stats.points).toBe(0);
    });
  });
});
