"use client";

import { FC } from "react";

import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "./ui/context-menu";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { produce } from "immer";

interface SpellcastInputLetterProps {
    i: number;
    j: number;
    highlight: boolean;
    highlightStrength: number;
    twoTimesLocation: string;
    setTwoTimesLocation: (...args: any[]) => any;
    specialLetter: string;
    setSpecialLetter: (...args: any[]) => any;
    cellValue: string;
    onKeyDownInput: (x: number, y: number) => any;
    grid: string[][];
    setGrid: (...args: any[]) => any;
}

const SpellcastInputLetter: FC<SpellcastInputLetterProps> = ({
    i,
    j,
    highlight,
    highlightStrength,
    twoTimesLocation,
    setTwoTimesLocation,
    specialLetter,
    setSpecialLetter,
    cellValue,
    onKeyDownInput,
    grid,
    setGrid,
}) => {
    const isGem = cellValue === cellValue.toUpperCase();
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Input
                    id={`${i}-${j}`}
                    onKeyDown={onKeyDownInput(i, j)}
                    onChange={() => {}}
                    value={cellValue}
                    className={cn(
                        "w-10 h-10 m-1 border-2 border-black",
                        {
                            "bg-slate-200":
                                highlight && highlightStrength == 0,
                            "bg-slate-300":
                                highlight && highlightStrength == 1,
                            "bg-slate-400":
                                highlight && highlightStrength == 2,
                            "bg-slate-500":
                                highlight && highlightStrength == 3,
                            "bg-slate-600":
                                highlight && highlightStrength == 4,
                            "bg-slate-700":
                                highlight && highlightStrength == 5,
                            "bg-slate-800":
                                highlight && highlightStrength == 6,
                            "bg-slate-900":
                                highlight && highlightStrength >= 7,
                            "bg-purple-200":
                                twoTimesLocation === `${i}-${j}`,
                            "border-red-500":
                                specialLetter === `dl-${i}-${j}`,
                            "border-blue-500":
                                specialLetter === `tl-${i}-${j}`,
                        }
                    )}
                    autoFocus={i === 0 && j === 0}
                    autoComplete='off'
                />
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuRadioGroup
                    value={specialLetter}
                    onValueChange={v =>
                        setSpecialLetter((last: string) => {
                            return last === v ? `` : v;
                        })
                    }>
                    <ContextMenuRadioItem value={`dl-${i}-${j}`}>
                        Double Letter
                    </ContextMenuRadioItem>
                    <ContextMenuRadioItem value={`tl-${i}-${j}`}>
                        Triple Letter
                    </ContextMenuRadioItem>
                </ContextMenuRadioGroup>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem
                    className='ContextMenuCheckboxItem'
                    checked={twoTimesLocation === `${i}-${j}`}
                    onCheckedChange={() =>
                        setTwoTimesLocation((last: string) => {
                            return last === `${i}-${j}`
                                ? ``
                                : `${i}-${j}`;
                        })
                    }>
                    2x Word
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem
                    className='ContextMenuCheckboxItem'
                    checked={isGem}
                    onCheckedChange={() => {
                        const newGrid = produce(grid, gridCopy => {
                            const row = gridCopy[i];
                            if (!row) {
                                return gridCopy;
                            }
                            row[j] = isGem
                                ? cellValue.toLowerCase()
                                : cellValue.toUpperCase();
                            return gridCopy;
                        });
                        setGrid(newGrid);
                    }}>
                    Gem
                </ContextMenuCheckboxItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default SpellcastInputLetter;
