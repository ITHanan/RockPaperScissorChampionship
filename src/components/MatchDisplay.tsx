import { Match } from '../types/player';
import { getMoveEmoji } from '../game/gameLogic';

interface MatchDisplayProps {
  match: Match | null;
  isActive: boolean;
}

export function MatchDisplay({ match, isActive }: MatchDisplayProps) {
  if (!match) {
    return (
      <div className="glass rounded-3xl p-8 shadow-2xl text-center">
        <div className="text-gray-400 text-lg">
          Waiting for tournament to start...
        </div>
      </div>
    );
  }

  const isDraw = match.winner === 'draw';
  const player1Won = match.winner === match.player1;

  return (
    <div
      className={`glass rounded-3xl p-8 shadow-2xl transform transition-all duration-500 ${
        isActive ? 'scale-105 animate-glow' : 'scale-100'
      }`}
    >
      <h2 className="text-2xl font-bold text-white mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        ⚔️ Live Match
      </h2>

      <div className="flex items-center justify-between gap-8">
        {/* Player 1 */}
        <div
          className={`flex-1 glass-intense rounded-2xl p-6 transform transition-all duration-500 ${
            player1Won && !isDraw ? 'ring-2 ring-green-400 scale-110' : ''
          }`}
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4 truncate">
              {match.player1}
            </h3>
            <div className="text-7xl mb-2 animate-float">{getMoveEmoji(match.player1Move)}</div>
            <div className="text-lg text-gray-300 capitalize">{match.player1Move}</div>
            {player1Won && !isDraw && (
              <div className="mt-2 text-green-400 font-bold">WINNER! 🎉</div>
            )}
          </div>
        </div>

        {/* VS */}
        <div className="text-center flex-shrink-0">
          <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            VS
          </div>
          {isDraw && (
            <div className="mt-2 text-yellow-400 font-bold text-sm">DRAW!</div>
          )}
        </div>

        {/* Player 2 */}
        <div
          className={`flex-1 glass-intense rounded-2xl p-6 transform transition-all duration-500 ${
            !player1Won && !isDraw ? 'ring-2 ring-green-400 scale-110' : ''
          }`}
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4 truncate">
              {match.player2}
            </h3>
            <div className="text-7xl mb-2 animate-float" style={{ animationDelay: '0.5s' }}>
              {getMoveEmoji(match.player2Move)}
            </div>
            <div className="text-lg text-gray-300 capitalize">{match.player2Move}</div>
            {!player1Won && !isDraw && (
              <div className="mt-2 text-green-400 font-bold">WINNER! 🎉</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
