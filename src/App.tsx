import { useState, useEffect } from 'react';
import { Tournament } from './tournament/Tournament';
import { Player, PlayerStats, Match } from './types/player';
import { Leaderboard } from './components/Leaderboard';
import { MatchDisplay } from './components/MatchDisplay';
import { TournamentControls } from './components/TournamentControls';
import { PlayerList } from './components/PlayerList';
import {
  RandomPlayer,
  RockPlayer,
  CyclePlayer,
  CounterPlayer,
  AdaptivePlayer,
} from './players';

/**
 * STUDENTS: Import your player here and add it to the playerList array below!
 * Example:
 * import { MyPlayer } from './players/MyPlayer';
 */

function App() {
  // Initialize players
  const [players] = useState<Player[]>([
    new RandomPlayer(),
    new RockPlayer(),
    new CyclePlayer(),
    new CounterPlayer(),
    new AdaptivePlayer(),
    /**
     * STUDENTS: Add your player instance here!
     * Example:
     * new MyPlayer(),
     */
  ]);

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [leaderboard, setLeaderboard] = useState<PlayerStats[]>([]);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [completedMatches, setCompletedMatches] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);

  // Initialize tournament
  useEffect(() => {
    const newTournament = new Tournament(players);

    // Calculate total matches (n * (n-1) / 2 for round-robin)
    const total = (players.length * (players.length - 1)) / 2;
    setTotalMatches(total);

    // Listen to tournament events
    newTournament.addListener((event) => {
      if (event.type === 'start') {
        setIsRunning(true);
        setCompletedMatches(0);
        if (event.stats) {
          setLeaderboard(Array.from(event.stats.values()));
        }
      } else if (event.type === 'match') {
        if (event.match) {
          setCurrentMatch(event.match);
        }
        if (event.stats) {
          setLeaderboard(
            Array.from(event.stats.values()).sort((a, b) => {
              if (b.points !== a.points) return b.points - a.points;
              if (b.wins !== a.wins) return b.wins - a.wins;
              return a.name.localeCompare(b.name);
            })
          );
        }
        setCompletedMatches((prev) => prev + 1);
      } else if (event.type === 'complete') {
        setIsRunning(false);
        if (event.stats) {
          setLeaderboard(
            Array.from(event.stats.values()).sort((a, b) => {
              if (b.points !== a.points) return b.points - a.points;
              if (b.wins !== a.wins) return b.wins - a.wins;
              return a.name.localeCompare(b.name);
            })
          );
        }
      }
    });

    setTournament(newTournament);
    setLeaderboard(newTournament.getLeaderboard());
  }, [players]);

  const handleStart = () => {
    if (tournament && !isRunning) {
      tournament.runTournament(1500); // 1.5 seconds between matches
    }
  };

  const handleReset = () => {
    if (tournament && !isRunning) {
      tournament.reset();
      setLeaderboard(tournament.getLeaderboard());
      setCurrentMatch(null);
      setCompletedMatches(0);
    }
  };

  return (
    <div className="min-h-screen p-8">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text animate-glow">
            🪨📄✂️ Rock Paper Scissors Tournament
          </h1>
          <p className="text-xl text-gray-300">
            Student AI Battle Arena
          </p>
        </header>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left column - Leaderboard */}
          <div className="lg:col-span-1">
            <Leaderboard stats={leaderboard} />
          </div>

          {/* Middle column - Match display and controls */}
          <div className="lg:col-span-2 space-y-6">
            <MatchDisplay match={currentMatch} isActive={isRunning} />
            <TournamentControls
              isRunning={isRunning}
              onStart={handleStart}
              onReset={handleReset}
              totalMatches={totalMatches}
              completedMatches={completedMatches}
            />
          </div>
        </div>

        {/* Players list */}
        <div className="mb-6">
          <PlayerList players={players} />
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm mt-12">
          <p className="glass rounded-2xl p-4 inline-block">
            Built with React, TypeScript, Vite, and TailwindCSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
