import fs from 'fs';

export type Position = {
    x: number;
    y: number;
  };
  
  export type Direction = "^" | ">" | "v" | "<";
  
  const DIRECTIONS: Direction[] = ["^", ">", "v", "<"];
  
  export function parseInput(input: string): { map: string[][], startPos: Position, startDir: Direction } {
    const lines = input.split("\n");
    const map = lines.map(line => line.split(""));
    
    // Find starting position
    let startPos: Position = { x: 0, y: 0 };
    let startDir: Direction = "^";
    
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (DIRECTIONS.includes(map[y][x] as Direction)) {
          startPos = { x, y };
          startDir = map[y][x] as Direction;
          // map[y][x] = "."; // Replace direction with empty space
          break;
        }
      }
    }
    
    return { map, startPos, startDir };
  }
  
  export function getNextPosition(pos: Position, dir: Direction): Position {
    switch (dir) {
      case "^": return { x: pos.x, y: pos.y - 1 };
      case ">": return { x: pos.x + 1, y: pos.y };
      case "v": return { x: pos.x, y: pos.y + 1 };
      case "<": return { x: pos.x - 1, y: pos.y };
    }
  }
  
  export function turnRight(dir: Direction): Direction {
    const currentIndex = DIRECTIONS.indexOf(dir);
    return DIRECTIONS[(currentIndex + 1) % 4];
  }
  
  export function isOutOfBounds(pos: Position, map: string[][]): boolean {
    return pos.y < 0 || pos.y >= map.length || pos.x < 0 || pos.x >= map[0].length;
  }
  
  export function hasObstacle(pos: Position, map: string[][]): boolean {
    return ['#', 'O'].includes(map[pos.y][pos.x]);
  }
  
  function part1(input: string): number {
    const { map, startPos, startDir } = parseInput(input);
    const visited = new Set<string>();
    
    let currentPos = startPos;
    let currentDir = startDir;
    
    // Add starting position to visited
    visited.add(`${currentPos.x},${currentPos.y}`);
    
    while (true) {
      // Check position in front
      const nextPos = getNextPosition(currentPos, currentDir);
      
      // Check if out of bounds
      if (isOutOfBounds(nextPos, map)) {
        break;
      }
      
      // Check if obstacle ahead
      if (hasObstacle(nextPos, map)) {
        currentDir = turnRight(currentDir);
        continue;
      }
      
      // Move forward
      currentPos = nextPos;
      visited.add(`${currentPos.x},${currentPos.y}`);
    }
    
    return visited.size;
  }
  
  // const input = fs.readFileSync('part1.txt', 'utf8');
  // console.log(part1(input));