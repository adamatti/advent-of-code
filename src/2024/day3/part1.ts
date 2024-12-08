import fs from 'fs';

export function part1(input: string): number {
    // Regular expression to match valid mul(X,Y) patterns
    // Matches: mul followed by exactly ( then 1-3 digits, comma, 1-3 digits, and )
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    
    let sum = 0;
    let match;

    // Find all matches in the input string
    while ((match = mulRegex.exec(input)) !== null) {
        const x = parseInt(match[1]);
        const y = parseInt(match[2]);
        sum += x * y;
    }

    return sum;
}

const input = fs.readFileSync('part1.txt', 'utf8');
console.log(part1(input));