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

    return(
        <div className="w-full max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Character Counter</h2>
            <p className="text-sm text-gray-500">
                Target: {minWords} – {maxWords} words {targetReadingTime && `(~${targetReadingTime} min)`}
            </p>

            {/* Top: Text Input */}
            <TextInput onTextChange={handleTextChange} />

            {/* Bottom: Stats Display */}
            <StatsDisplay stats={stats} />
    </div>

    )
}