import { ValidWordType } from "@/solver/board";
import { FC, KeyboardEvent } from "react";
import SpellcastInputLetter from "./SpellcastInputLetter";
import isLetter from "@/helpers/isLetter";
import { produce } from "immer";

interface GridProps {
    grid: string[][];
    setGrid: (...args: any[]) => any;
    selectedWord: ValidWordType | null;
    arrowWrapAround: boolean;
    width: number;
    height: number;
    twoTimesLocation: string;
    setTwoTimesLocation: (...args: any[]) => any;
    specialLetter: string;
    setSpecialLetter: (...args: any[]) => any;
}

const Grid: FC<GridProps> = ({
    grid,
    setGrid,
    selectedWord,
    arrowWrapAround,
    width,
    height,
    twoTimesLocation,
    setTwoTimesLocation,
    specialLetter,
    setSpecialLetter,
}) => {
    function onKeyDownInput(i: number, j: number) {
        const nextJ = (j + 1) % width;
        const nextI = (i + (nextJ === 0 ? 1 : 0)) % height;

        const prevJ = j === 0 ? width - 1 : j - 1;
        const prevI = j === 0 ? (i === 0 ? height - 1 : i - 1) : i;

        const downJ = j;
        const downI = (i + 1) % height;

        const upJ = j;
        const upI = i === 0 ? height - 1 : i - 1;

        const rightJ = (j + 1) % width;
        const rightI = i;

        const leftJ = j - 1 === -1 ? width - 1 : j - 1;
        const leftI = i;

        return async (event: KeyboardEvent<HTMLInputElement>) => {
            const prevElement = document.getElementById(
                `${prevI}-${prevJ}`
            );
            // const thisElement = document.getElementById(`${i}-${j}`);
            const nextElement = document.getElementById(
                `${nextI}-${nextJ}`
            );
            const downElement = document.getElementById(
                `${downI}-${downJ}`
            );
            const upElement = document.getElementById(
                `${upI}-${upJ}`
            );
            const rightElement = document.getElementById(
                `${rightI}-${rightJ}`
            );
            const leftElement = document.getElementById(
                `${leftI}-${leftJ}`
            );

            const { key, shiftKey } = event;

            if (key === "ArrowUp") {
                upElement?.focus();
            } else if (key === "ArrowRight") {
                if (arrowWrapAround) {
                    nextElement?.focus();
                } else {
                    rightElement?.focus();
                }
            } else if (key === "ArrowDown") {
                downElement?.focus();
            } else if (key === "ArrowLeft") {
                if (arrowWrapAround) {
                    prevElement?.focus();
                } else {
                    leftElement?.focus();
                }
            } else if (key === "Tab") {
                if (shiftKey) {
                    prevElement?.focus();
                } else {
                    nextElement?.focus();
                }
                return;
            }

            if (!isLetter(key)) {
                return;
            }

            const newGrid = produce(grid, gridCopy => {
                const row = gridCopy[i];
                if (!row) {
                    return gridCopy;
                }
                row[j] = key;
                return gridCopy;
            });
            setGrid(newGrid);

            nextElement?.focus();
        };
    }
    const tiles = selectedWord?.word.tiles.toArray() ?? [];
    return (
        <div className='flex flex-col'>
            {grid.map((row, i) => {
                return (
                    <div className='flex flex-row' key={i}>
                        {row.map((col, j) => {
                            let highlightStrength = 0;
                            let highlight = false;
                            if (selectedWord) {
                                for (
                                    let k = 0;
                                    k < tiles.length;
                                    ++k
                                ) {
                                    const tile = tiles[k]!;
                                    if (
                                        tile.x === i &&
                                        tile.y === j
                                    ) {
                                        highlight = true;
                                        highlightStrength = k;
                                        continue;
                                    }
                                }
                            }

                            return (
                                <SpellcastInputLetter
                                    key={`${i}-${j}`}
                                    i={i}
                                    j={j}
                                    cellValue={col}
                                    onKeyDownInput={onKeyDownInput}
                                    highlight={highlight}
                                    highlightStrength={
                                        highlightStrength
                                    }
                                    twoTimesLocation={
                                        twoTimesLocation
                                    }
                                    setTwoTimesLocation={
                                        setTwoTimesLocation
                                    }
                                    specialLetter={specialLetter}
                                    setSpecialLetter={
                                        setSpecialLetter
                                    }
                                    grid={grid}
                                    setGrid={setGrid}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Grid;
