interface TournamentControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onReset: () => void;
  totalMatches: number;
  completedMatches: number;
}

export function TournamentControls({
  isRunning,
  onStart,
  onReset,
  totalMatches,
  completedMatches,
}: TournamentControlsProps) {
  const progress = totalMatches > 0 ? (completedMatches / totalMatches) * 100 : 0;

  return (
    <div className="glass rounded-3xl p-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
        🎮 Tournament Controls
      </h2>

      <div className="space-y-4">
        {/* Progress bar */}
        {totalMatches > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Progress</span>
              <span>
                {completedMatches} / {totalMatches}
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onStart}
            disabled={isRunning}
            className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
              isRunning
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'glass-intense text-white hover:ring-2 hover:ring-green-400'
            }`}
          >
            {isRunning ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⚡</span>
                Running...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                ▶️ Start Tournament
              </span>
            )}
          </button>

          <button
            onClick={onReset}
            disabled={isRunning}
            className={`px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
              isRunning
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'glass-intense text-white hover:ring-2 hover:ring-red-400'
            }`}
          >
            🔄 Reset
          </button>
        </div>

        {/* Status message */}
        <div className="text-center text-sm text-gray-300 pt-2">
          {isRunning
            ? 'Tournament in progress...'
            : completedMatches === totalMatches && totalMatches > 0
            ? '✅ Tournament completed!'
            : 'Ready to start'}
        </div>
      </div>
    </div>
  );
}
