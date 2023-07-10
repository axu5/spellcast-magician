"use client";

import { FC, useState } from "react";
import { Button } from "./ui/button";

interface WordDisplayProps {
    words: { points: number; word: string }[];
}

const WordDisplay: FC<WordDisplayProps> = ({ words }) => {
    const [upperBoundary, setUpperBoundary] = useState(50);
    return (
        <div className='w-[25%] mx-auto'>
            {words.slice(0, upperBoundary).map(word => {
                return (
                    <div
                        key={word.word}
                        className='flex p-2 rounded-sm flex-row hover:underline hover:cursor-pointer hover:bg-zinc-200'>
                        <span className='font-mono mr-2'>
                            {word.points}
                        </span>
                        <p>{word.word}</p>
                    </div>
                );
            })}

            <Button
                variant='outline'
                onClick={() => setUpperBoundary(l => l + 50)}>
                Load More...
            </Button>
        </div>
    );
};

export default WordDisplay;
