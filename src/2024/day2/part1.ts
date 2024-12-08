import * as fs from 'fs';   

function isValidSequence(numbers: number[]): boolean {
    if (numbers.length < 2) return true;

    // Check if sequence is increasing or decreasing based on first two numbers
    const isIncreasing = numbers[1] > numbers[0];
    
    for (let i = 1; i < numbers.length; i++) {
        const diff = numbers[i] - numbers[i - 1];
        
        // For increasing sequence
        if (isIncreasing) {
            if (diff <= 0 || diff > 3) return false;
        }
        // For decreasing sequence
        else {
            if (diff >= 0 || diff < -3) return false;
        }
    }
    
    return true;
}

function part1(input: string): number {
    return input
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.split(' ').map(Number))
        .filter(numbers => isValidSequence(numbers))
        .length;
}


const input = fs.readFileSync('part1.txt', 'utf8');
console.log(part1(input));