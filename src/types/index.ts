//defining the types first for the components

export interface TextStats {
    characterCount:number;
    wordCount:number;
    readingTime: number;
}

export interface TextInputProps{
    onTextChange: (text:string) => void;
    placeholder? : string;
    initialValue? : string
}

export interface StatsDisplayProps{
    stats:TextStats;
    showReadingTime? : boolean;
}
export interface CharacterCounterProps{
    minWords?: number;
    maxWords?: number;
    targetReadingTime?: number;
}