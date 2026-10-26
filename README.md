# React Character Counter (lab-9.2)

This is a character and word counter app built with React, TypeScript, and Tailwind CSS. It updates character count, word count, and estimated reading time live as you type, and shows a progress bar toward a target word count.

## Features

- Real-time character and word counting
- Estimated reading time (calculated based on an average of 200 words per minute)
- Visual progress bar that fills up as you reach your target words and turns red if you go over the limit
- Written in TypeScript with custom types for safety
- Styled using Tailwind CSS

## Component Structure

- **`App`**: Mounts the app and sets the target props.
- **`CharacterCounter` (Parent)**: Holds the `text` state and calculates the stats (`characterCount`, `wordCount`, `readingTime`) using `useMemo`.
- **`TextInput` (Child)**: The textarea where the user types. Sends the updated string back up to `CharacterCounter` using the `onTextChange` callback prop.
- **`StatsDisplay` (Child)**: Pure display component that receives `stats` as props and renders the numbers in 3 boxes.


## Questions & Answers

### 1. How did you handle state updates when the text changed?
I lifted the main `text` state up to the parent component (`CharacterCounter`). When a user types inside `TextInput`, an `onChange` event fires and triggers an `onTextChange` callback function passed down as a prop. This updates the `text` state in the parent, which recalculates the stats and automatically passes the new values down to `StatsDisplay`.

### 2. What considerations did you make when calculating reading time?
I based the reading time on an average reading speed of 200 words per minute. If the input is empty or just spaces, it immediately returns 0 so it doesn't show weird numbers. I also made sure to convert the minutes into seconds or format it cleanly so it makes sense to the user rather than showing long decimal numbers.

### 3. How did you ensure the UI remained responsive during rapid text input?
I wrapped the stats calculation in React's `useMemo` hook so it only recalculates when the actual `text` changes, avoiding unnecessary work. I also used `useCallback` for the text change handler to keep component re-renders predictable and smooth while typing quickly.

### 4. What challenges did you face when implementing the statistics calculations?
The main challenge was accurately counting words. Using a simple `.split(' ')` counted extra words when multiple spaces, tabs, or new lines were typed. To fix this, I trimmed the text first and used a regular expression (`/\s+/`) with `.filter(Boolean)` so empty spaces don't get counted as words.