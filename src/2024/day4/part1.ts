import fs from 'fs';

const DIRECTIONS = [
    [-1, -1], [-1, 0], [-1, 1],  // Up-left, Up, Up-right
    [0, -1],           [0, 1],   // Left, Right
    [1, -1],  [1, 0],  [1, 1]    // Down-left, Down, Down-right
  ];
  
  function findXMAS(grid: string[]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
  
    // Check each starting position
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Try each direction from this position
        for (const [dx, dy] of DIRECTIONS) {
          if (checkWord(grid, row, col, dx, dy)) {
            count++;
          }
        }
      }
    }
  
    return count;
  }
  
  function checkWord(
    grid: string[],
    startRow: number,
    startCol: number,
    dx: number,
    dy: number
  ): boolean {
    const word = "XMAS";
    const rows = grid.length;
    const cols = grid[0].length;
  
    // Check if the word would go out of bounds
    if (
      startRow + dx * 3 < 0 || startRow + dx * 3 >= rows ||
      startCol + dy * 3 < 0 || startCol + dy * 3 >= cols
    ) {
      return false;
    }
  
    // Check each character of XMAS
    for (let i = 0; i < word.length; i++) {
      const currentRow = startRow + dx * i;
      const currentCol = startCol + dy * i;
      if (grid[currentRow][currentCol] !== word[i]) {
        return false;
      }
    }
  
    return true;
  }
  
  function part1(input: string): number {
    const grid = input.trim().split('\n');
    return findXMAS(grid);
  }
  
  const input = fs.readFileSync('part1.txt', 'utf8');
  console.log(part1(input));