import { PlayerStats } from '../types/player';

interface LeaderboardProps {
  stats: PlayerStats[];
}

export function Leaderboard({ stats }: LeaderboardProps) {
  return (
    <div className="glass rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
      <h2 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        🏆 Leaderboard
      </h2>

      <div className="space-y-3">
        {stats.map((player, index) => (
          <div
            key={player.name}
            className={`glass-intense rounded-2xl p-4 transform hover:scale-105 transition-all duration-300 ${
              index === 0 ? 'ring-2 ring-yellow-400 animate-glow' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`text-3xl font-bold ${
                    index === 0
                      ? 'text-yellow-400'
                      : index === 1
                      ? 'text-gray-300'
                      : index === 2
                      ? 'text-orange-400'
                      : 'text-white'
                  }`}
                >
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{player.name}</h3>
                  <p className="text-sm text-gray-300">
                    {player.wins}W - {player.draws}D - {player.losses}L
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  {player.points}
                </div>
                <div className="text-xs text-gray-400">points</div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mt-3 flex gap-1 h-2 rounded-full overflow-hidden bg-white/10">
              <div
                className="bg-green-500 transition-all duration-500"
                style={{ width: `${(player.wins / player.totalMatches) * 100}%` }}
              />
              <div
                className="bg-yellow-500 transition-all duration-500"
                style={{ width: `${(player.draws / player.totalMatches) * 100}%` }}
              />
              <div
                className="bg-red-500 transition-all duration-500"
                style={{ width: `${(player.losses / player.totalMatches) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {stats.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No players yet. Start the tournament!
        </div>
      )}
    </div>
  );
}
