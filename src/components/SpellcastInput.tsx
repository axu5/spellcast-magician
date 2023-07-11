"use client";

import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import readyToSolve from "@/helpers/readyToSolve";
import { Switch } from "./ui/switch";
import Board, { ValidWordType } from "@/solver/board";
import { tileProperties } from "@/solver/tileProperties";
import { Button } from "./ui/button";
import Grid from "./Grid";
import isLetter from "@/helpers/isLetter";

const width = 5;
const height = 5;

const SpellcastInput = () => {
    const clearGrid = () => {
        const rows = [];
        for (let i = 0; i < height; ++i) {
            rows.push(Array.from(Array(width), () => ""));
        }
        return rows;
    };
    // In the format
    // dl-Y-X or tl-Y-X
    const [specialLetter, setSpecialLetter] = useState<string>("");
    const [twoTimesLocation, setTwoTimesLocation] =
        useState<string>("");
    const [arrowWrapAround, setArrowWrapAround] = useState(false);
    const [grid, setGrid] = useState(clearGrid);
    const [board, setBoard] = useState(new Board());
    const [bestWords, setBestWords] = useState<ValidWordType[]>([]);
    const [selectedWord, setSelectedWord] =
        useState<ValidWordType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const load = async () => {
            await board.load();
            setIsLoading(false);
        };
        load();
    }, [board]);

    const solve = useCallback(
        (board: Board) => {
            if (!readyToSolve(grid)) {
                return;
            }

            // Solve !!!!
            const gridStr = grid.reduce(
                (a, c) => a + c.reduce((_a, _c) => _a + _c, ""),
                ""
            );
            board.setLetters(gridStr);

            for (let i = 0; i < gridStr.length; ++i) {
                const letter = gridStr[i]!;
                if (letter === letter.toUpperCase()) {
                    board.enableTileProperties(
                        (i / width) | 0,
                        i % width,
                        tileProperties.Gem
                    );
                }
            }

            const specialData = specialLetter.split(/-/g);
            const doubleWordData = twoTimesLocation.split(/-/g);

            if (specialData.length === 3) {
                board.enableTileProperties(
                    parseInt(specialData[1]!) as number,
                    parseInt(specialData[2]!) as number,
                    specialData[0] === "dl"
                        ? tileProperties.DoubleLetter
                        : tileProperties.TripleLetter
                );
            }

            if (doubleWordData.length === 2) {
                board.enableTileProperties(
                    parseInt(doubleWordData[0]!) as number,
                    parseInt(doubleWordData[1]!) as number,
                    tileProperties.DoubleWord
                );
            }

            board.findValidWords();

            setBestWords(board.validWordsSet.toArray().slice(0, 25));
            setSelectedWord(board.validWordsSet.get(0));
        },
        [grid, specialLetter, twoTimesLocation]
    );

    useEffect(() => {
        solve(board);
    }, [solve, board]);

    return (
        <div className='flex flex-col'>
            <Grid
                grid={grid}
                setGrid={setGrid}
                selectedWord={selectedWord}
                arrowWrapAround={arrowWrapAround}
                width={width}
                height={height}
                twoTimesLocation={twoTimesLocation}
                setTwoTimesLocation={setTwoTimesLocation}
                specialLetter={specialLetter}
                setSpecialLetter={setSpecialLetter}
            />
            <div className='flex text-center my-5'>
                <Switch
                    className='mr-2'
                    checked={arrowWrapAround}
                    onCheckedChange={setArrowWrapAround}
                />
                Arrow wrap around
            </div>
            <div className='flex flex-col'>
                <Button
                    className='my-2'
                    variant='outline'
                    disabled={specialLetter === ""}
                    onClick={() => setSpecialLetter("")}>
                    Clear Special letter
                </Button>
                <Button
                    className='my-2'
                    variant='outline'
                    disabled={twoTimesLocation === ""}
                    onClick={() => setTwoTimesLocation("")}>
                    Clear 2x word
                </Button>
                <Button
                    className='my-2'
                    variant='destructive'
                    disabled={
                        !grid.some(row =>
                            row.some(ch => isLetter(ch))
                        )
                    }
                    onClick={() => {
                        setGrid(clearGrid);
                        setSpecialLetter("");
                        setTwoTimesLocation("");
                        setSelectedWord(null);
                        setBestWords([]);
                        setBoard(oldBoard => {
                            oldBoard.reset();
                            return oldBoard;
                        });
                        const firstInput =
                            document.getElementById("0-0");
                        firstInput?.focus();
                    }}>
                    Clear board
                </Button>
            </div>
            <div>
                {isLoading && <div>Loading...</div>}
                {!isLoading &&
                    bestWords.map((validWordType, i) => {
                        const { points, word } = validWordType;
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    setSelectedWord(validWordType);
                                }}
                                className={cn(
                                    "flex p-2 rounded-sm flex-row hover:underline hover:cursor-pointer hover:bg-zinc-200",
                                    {
                                        underline:
                                            word ===
                                            selectedWord?.word,
                                        "bg-zinc-200":
                                            word ===
                                            selectedWord?.word,
                                    }
                                )}>
                                <span className='font-mono mr-2'>
                                    {points}
                                </span>
                                <p>{word.text}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default SpellcastInput;
