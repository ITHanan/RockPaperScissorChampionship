import { Player, Match, PlayerStats, MatchHistory, MatchResult } from '../types/player';
import { determineWinner, calculatePoints } from '../game/gameLogic';

export type TournamentEventType = 'match' | 'complete' | 'start';

export interface TournamentEvent {
  type: TournamentEventType;
  match?: Match;
  stats?: Map<string, PlayerStats>;
}

export type TournamentListener = (event: TournamentEvent) => void;

/**
 * Manages a round-robin tournament where every player plays every other player
 */
export class Tournament {
  private players: Player[];
  private stats: Map<string, PlayerStats>;
  private matchHistory: Map<string, Map<string, MatchHistory[]>>;
  private matches: Match[];
  private listeners: TournamentListener[];
  private isRunning: boolean;

  constructor(players: Player[]) {
    this.players = players;
    this.stats = new Map();
    this.matchHistory = new Map();
    this.matches = [];
    this.listeners = [];
    this.isRunning = false;

    // Initialize stats for each player
    this.players.forEach(player => {
      this.stats.set(player.name, {
        name: player.name,
        wins: 0,
        losses: 0,
        draws: 0,
        totalMatches: 0,
        points: 0,
      });
      this.matchHistory.set(player.name, new Map());
    });
  }

  /**
   * Add an event listener
   */
  addListener(listener: TournamentListener): void {
    this.listeners.push(listener);
  }

  /**
   * Remove an event listener
   */
  removeListener(listener: TournamentListener): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * Emit an event to all listeners
   */
  private emit(event: TournamentEvent): void {
    this.listeners.forEach(listener => listener(event));
  }

  /**
   * Run the entire tournament
   */
  async runTournament(delayMs: number = 1000): Promise<void> {
    this.isRunning = true;
    this.emit({ type: 'start', stats: this.stats });

    // Round-robin: every player plays every other player
    for (let i = 0; i < this.players.length; i++) {
      for (let j = i + 1; j < this.players.length; j++) {
        if (!this.isRunning) break;

        const player1 = this.players[i];
        const player2 = this.players[j];

        await this.playMatch(player1, player2);

        // Delay between matches for visualization
        if (delayMs > 0) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }
      if (!this.isRunning) break;
    }

    this.isRunning = false;
    this.emit({ type: 'complete', stats: this.stats });
  }

  /**
   * Play a single match between two players
   */
  private async playMatch(player1: Player, player2: Player): Promise<Match> {
    // Get match history
    const p1History = this.getMatchHistory(player1.name, player2.name);
    const p2History = this.getMatchHistory(player2.name, player1.name);

    // Get moves from both players
    const p1Move = player1.makeMove(player2.name, p1History);
    const p2Move = player2.makeMove(player1.name, p2History);

    // Determine winner
    const result = determineWinner(p1Move, p2Move);

    let winner: string | 'draw';
    let p1Result: MatchResult;
    let p2Result: MatchResult;

    if (result === 'draw') {
      winner = 'draw';
      p1Result = 'draw';
      p2Result = 'draw';
    } else if (result === 'win') {
      winner = player1.name;
      p1Result = 'win';
      p2Result = 'lose';
    } else {
      winner = player2.name;
      p1Result = 'lose';
      p2Result = 'win';
    }

    // Create match record
    const match: Match = {
      player1: player1.name,
      player2: player2.name,
      player1Move: p1Move,
      player2Move: p2Move,
      winner,
      timestamp: Date.now(),
    };

    this.matches.push(match);

    // Update stats
    this.updateStats(player1.name, p1Result);
    this.updateStats(player2.name, p2Result);

    // Update match history
    this.addToHistory(player1.name, player2.name, {
      myMove: p1Move,
      opponentMove: p2Move,
      result: p1Result,
    });
    this.addToHistory(player2.name, player1.name, {
      myMove: p2Move,
      opponentMove: p1Move,
      result: p2Result,
    });

    // Notify players of result if they have the callback
    player1.onMatchResult?.(player2.name, p1Move, p2Move, p1Result);
    player2.onMatchResult?.(player1.name, p2Move, p1Move, p2Result);

    // Emit match event
    this.emit({ type: 'match', match, stats: this.stats });

    return match;
  }

  /**
   * Update stats for a player
   */
  private updateStats(playerName: string, result: MatchResult): void {
    const stats = this.stats.get(playerName)!;
    stats.totalMatches++;

    if (result === 'win') {
      stats.wins++;
    } else if (result === 'lose') {
      stats.losses++;
    } else {
      stats.draws++;
    }

    stats.points += calculatePoints(result);
  }

  /**
   * Get match history between two players
   */
  private getMatchHistory(playerName: string, opponentName: string): MatchHistory[] {
    const playerHistory = this.matchHistory.get(playerName);
    if (!playerHistory) return [];
    return playerHistory.get(opponentName) || [];
  }

  /**
   * Add a match to history
   */
  private addToHistory(
    playerName: string,
    opponentName: string,
    history: MatchHistory
  ): void {
    const playerHistory = this.matchHistory.get(playerName)!;
    const opponentHistory = playerHistory.get(opponentName) || [];
    opponentHistory.push(history);
    playerHistory.set(opponentName, opponentHistory);
  }

  /**
   * Get current leaderboard (sorted by points)
   */
  getLeaderboard(): PlayerStats[] {
    return Array.from(this.stats.values()).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.wins !== a.wins) return b.wins - a.wins;
      return a.name.localeCompare(b.name);
    });
  }

  /**
   * Get all matches
   */
  getMatches(): Match[] {
    return [...this.matches];
  }

  /**
   * Stop the tournament
   */
  stop(): void {
    this.isRunning = false;
  }

  /**
   * Reset the tournament
   */
  reset(): void {
    this.stop();
    this.matches = [];
    this.stats.clear();
    this.matchHistory.clear();

    // Re-initialize stats
    this.players.forEach(player => {
      this.stats.set(player.name, {
        name: player.name,
        wins: 0,
        losses: 0,
        draws: 0,
        totalMatches: 0,
        points: 0,
      });
      this.matchHistory.set(player.name, new Map());
    });
  }
}
