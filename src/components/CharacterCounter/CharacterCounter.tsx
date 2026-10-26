import React,{useState ,useMemo ,useCallback} from "react";
import type { CharacterCounterProps,TextStats } from "../../types";
import { TextInput } from "../TextInput/TextInput";
import { StatsDisplay } from "../StatsDisplay/StatsDisplay";

export const CharacterCounter: React.FC <CharacterCounterProps> = ({
    minWords = 10,
    maxWords = 100,
    targetReadingTime,
}) => {
    const [text,setText] = useState <string> ('');

   const handleTextChange = useCallback((incomingText: string) => {
    setText(incomingText);
    }, []);

    const stats:TextStats=useMemo(() => {
        const trimmed = text.trim();
        if(!trimmed){
            return {characterCount:0,wordCount:0,readingTime:0};
        }

        const words= trimmed.split(/\s+/).filter(Boolean);
        const wordCount = words.length;
        const characterCount = text.length;

        const readingTime = Number((wordCount / 200).toFixed(2));

        return {characterCount,wordCount,readingTime};
    },[text]);

    // Calculate percentage toward maxWords goal (capped at 100%)
  const progressPercent = Math.min(
    100,
    Math.round((stats.wordCount / maxWords) * 100)
  );

  // Status color changes when reaching target or exceeding limit
  const isOverLimit = stats.wordCount > maxWords;
  const isTargetMet = stats.wordCount >= minWords && !isOverLimit;

    return(
        <div className="w-full max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
           <div>
            <h2 className="text-xl font-bold text-gray-800">Character Counter</h2>
            <p className="text-sm text-gray-500">
                Target: {minWords} – {maxWords} words {targetReadingTime && `(~${targetReadingTime} min)`}
            </p>

            {/* Progress Bar Container */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${
              isOverLimit
                ? "bg-red-500"
                : isTargetMet
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-right mt-1 font-medium text-gray-500">
          {stats.wordCount} / {maxWords} words ({progressPercent}%)
        </p>
      </div>



            {/* Top: Text Input */}
            <TextInput onTextChange={handleTextChange} />

            {/* Bottom: Stats Display */}
            <StatsDisplay stats={stats} />
    </div>

    )
}