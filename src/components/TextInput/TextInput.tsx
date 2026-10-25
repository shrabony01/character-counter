import React, {useState, ChangeEvent } from "react";
import type { TextInputProps } from "../../types";

export const TextInput: React.FC<TextInputProps> = ({
    onTextChange,
    placeholder ="start typing...",
    initialValue="",    
}) =>{
    const[text,setText]=useState<string>(initialValue);

    const handleChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        const nextText=e.target.value;
        setText(nextText);
        onTextChange(nextText);
    };

    return(
        <div className="w-full">
            <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
                value={text}
                onChange={handleChange}
                rows={6}
            />
        </div>
    );
};