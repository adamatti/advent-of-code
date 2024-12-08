import fs from 'fs';

function isSafeSequence(levels: number[]): boolean {
    if (levels.length < 2) return true;

    // Check if sequence is increasing or decreasing
    const diff = levels[1] - levels[0];
    const increasing = diff > 0;

    for (let i = 1; i < levels.length; i++) {
        const currDiff = levels[i] - levels[i - 1];

        // Check if difference is between 1 and 3
        if (Math.abs(currDiff) < 1 || Math.abs(currDiff) > 3) {
            return false;
        }

        // Check if direction remains consistent
        if ((increasing && currDiff <= 0) || (!increasing && currDiff >= 0)) {
            return false;
        }
    }

    return true;
}

function isSafeWithDampener(report: string): boolean {
    const numbers = report.split(' ').map(Number);

    // First check if already safe
    if (isSafeSequence(numbers)) {
        return true;
    }

    // Try removing each number one at a time
    for (let i = 0; i < numbers.length; i++) {
        const testSequence = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
        if (isSafeSequence(testSequence)) {
            return true;
        }
    }

    return false;
}

export function part2(input: string): number {
    const reports = input.trim().split('\n');
    return reports.filter(report => isSafeWithDampener(report)).length;
}

const input = fs.readFileSync('part2.txt', 'utf8');
console.log(part2(input));