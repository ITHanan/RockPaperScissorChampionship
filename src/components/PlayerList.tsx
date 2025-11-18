import { Player } from '../types/player';

interface PlayerListProps {
  players: Player[];
}

export function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="glass rounded-3xl p-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6 text-center bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
        👥 Registered Players ({players.length})
      </h2>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {players.map((player, index) => (
          <div
            key={player.name}
            className="glass-intense rounded-xl p-4 transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">
                  {player.name}
                </h3>
                {player.description && (
                  <p className="text-sm text-gray-300 mt-1">
                    {player.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {players.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No players registered yet
        </div>
      )}
    </div>
  );
}
