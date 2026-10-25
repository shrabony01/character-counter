//2.
import React from "react";
import type { StatsDisplayProps } from "../../types";


export const StatsDisplay : React.FC<StatsDisplayProps> =({
    stats,
    showReadingTime=true,
}) =>{

    const formatReadingTime = (minutes:number):string =>{
        if(minutes <= 0) return '0 sec';

        const totalSeconds = Math.round(minutes*60);
        if(totalSeconds < 60) return `${totalSeconds} sec`;
        const mins= Math.floor(totalSeconds/60);
        const secs = totalSeconds % 60;
        return secs > 0 ? `${mins}m ${secs}s` : `${mins}min`;

    };

return(
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {/* box 1 chracters */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="text-xs font-semibold text-gray-500 uppercase">Characters</p>
            <p className="text-2xl font-bold text-gray-800">{stats.characterCount}</p>
        </div>

        {/* Box 2: Words */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <p className="text-xs font-semibold text-gray-500 uppercase">Words</p>
        <p className="text-2xl font-bold text-gray-800">{stats.wordCount}</p>
      </div>

      {/* Box 3: Reading Time */}
      {showReadingTime && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase">Reading Time</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatReadingTime(stats.readingTime)}
          </p>
        </div>
      )}
        </div>
);
};