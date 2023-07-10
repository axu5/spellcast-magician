import isLetter from "./isLetter";

export default function readyToSolve(grid: string[][]) {
    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid[i].length; ++j) {
            if (!isLetter(grid[i][j])) {
                return false;
            }
        }
    }
    return true;
}
