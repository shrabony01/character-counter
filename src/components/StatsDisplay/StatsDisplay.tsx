import React from 'react';
import type { StatsDisplayProps } from '../../types';

interface ExtendedStatsDisplayProps extends StatsDisplayProps {
  minWords?: number;
  maxWords?: number;
}

export const StatsDisplay: React.FC<ExtendedStatsDisplayProps> = ({
  stats,
  showReadingTime = true,
  minWords = 25,
  maxWords = 100,
}) => {
  // Format minutes to m:ss (e.g. 0:00)
  const formatTime = (minutes: number): string => {
    const totalSeconds = Math.round(minutes * 60);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isWordCountInvalid =
    stats.wordCount < minWords || (maxWords ? stats.wordCount > maxWords : false);

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      {/* Characters */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Characters</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{stats.characterCount}</p>
      </div>

      {/* Words */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Words</p>
        <p
          className={`text-2xl font-bold mt-1 ${
            isWordCountInvalid ? 'text-red-500' : 'text-gray-800'
          }`}
        >
          {stats.wordCount}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Min: {minWords} | Max: {maxWords}
        </p>
      </div>

      {/* Reading Time */}
      {showReadingTime && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Reading Time</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{formatTime(stats.readingTime)}</p>
        </div>
      )}
    </div>
  );
};