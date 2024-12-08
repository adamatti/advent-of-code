import fs from 'fs';

function findXMAS(grid: string[]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    // Check each potential center position
    for (let row = 1; row < rows - 1; row++) {
        for (let col = 1; col < cols - 1; col++) {
            // Center must be 'A'
            if (grid[row][col] !== 'A') continue;

            // Check both diagonals at once
            if (checkXPattern(grid, row, col)) {
                // Debug output
                console.log(`Found pattern at (${row}, ${col}):`);
                for (let r = row - 1; r <= row + 1; r++) {
                    console.log(grid[r].substring(col - 1, col + 2));
                }
                console.log('---');
                count++;
            }
        }
    }

    return count;
}

function checkXPattern(
    grid: string[],
    centerRow: number,
    centerCol: number,
): boolean {
    const rows = grid.length;
    const cols = grid[0].length;

    // Check bounds for all diagonal positions
    if (
        centerRow - 1 < 0 || centerRow + 1 >= rows ||
        centerCol - 1 < 0 || centerCol + 1 >= cols
    ) {
        return false;
    }

    // Get all four diagonal positions
    const topLeft = grid[centerRow - 1][centerCol - 1];
    const topRight = grid[centerRow - 1][centerCol + 1];
    const bottomLeft = grid[centerRow + 1][centerCol - 1];
    const bottomRight = grid[centerRow + 1][centerCol + 1];

    // Check if we have exactly one 'M' and one 'S' on each diagonal
    const isValidDiag1 = 
        (topLeft === 'M' && bottomRight === 'S') ||
        (topLeft === 'S' && bottomRight === 'M');

    const isValidDiag2 = 
        (topRight === 'M' && bottomLeft === 'S') ||
        (topRight === 'S' && bottomLeft === 'M');

    return isValidDiag1 && isValidDiag2;
}

function part2(input: string): number {
    const grid = input.trim().split('\n');
    return findXMAS(grid);
}

const input = fs.readFileSync('part1.txt', 'utf8');
console.log(part2(input));