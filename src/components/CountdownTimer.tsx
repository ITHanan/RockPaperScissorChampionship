import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetTime: Date;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function CountdownTimer({ targetTime }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(targetTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  function calculateTimeRemaining(target: Date): TimeRemaining {
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, isExpired: false };
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (timeRemaining.isExpired) {
    return (
      <div className="glass rounded-3xl p-8 text-center">
        <div className="text-2xl font-semibold text-green-400 mb-2">
          🎮 Tournament Ready!
        </div>
        <p className="text-gray-300">
          Enter the password to begin
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-8 text-center">
      <div className="text-2xl font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-6">
        ⏰ Tournament Starts In
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur opacity-50"></div>
            <div className="relative glass rounded-2xl p-6 min-w-[100px]">
              <div className="text-5xl font-bold text-transparent bg-gradient-to-br from-purple-300 to-pink-300 bg-clip-text">
                {formatNumber(timeRemaining.hours)}
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-400 mt-2 font-medium">HOURS</div>
        </div>

        {/* Separator */}
        <div className="flex items-center text-4xl font-bold text-purple-400 pb-8">
          :
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur opacity-50"></div>
            <div className="relative glass rounded-2xl p-6 min-w-[100px]">
              <div className="text-5xl font-bold text-transparent bg-gradient-to-br from-blue-300 to-purple-300 bg-clip-text">
                {formatNumber(timeRemaining.minutes)}
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-400 mt-2 font-medium">MINUTES</div>
        </div>

        {/* Separator */}
        <div className="flex items-center text-4xl font-bold text-purple-400 pb-8">
          :
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-blue-500 rounded-2xl blur opacity-50"></div>
            <div className="relative glass rounded-2xl p-6 min-w-[100px]">
              <div className="text-5xl font-bold text-transparent bg-gradient-to-br from-pink-300 to-blue-300 bg-clip-text">
                {formatNumber(timeRemaining.seconds)}
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-400 mt-2 font-medium">SECONDS</div>
        </div>
      </div>

      <div className="text-gray-400 text-sm">
        Scheduled for {targetTime.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  );
}
