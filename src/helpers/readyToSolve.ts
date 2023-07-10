import isLetter from "./isLetter";

export default function readyToSolve(grid: string[][]) {
    for (let i = 0; i < grid.length; ++i) {
        const row = grid[i];
        if (!row) {
            return false;
        }
        for (let j = 0; j < row.length; ++j) {
            const letter = row[j];
            if (!letter || !isLetter(letter)) {
                return false;
            }
        }
    }
    return true;
}
