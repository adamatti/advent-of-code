import fs from 'fs';

// Read and parse input
function parseInput(input: string): Array<[number, number[]]> {
    return input.trim().split('\n').map(line => {
        const [testValue, numbers] = line.split(': ');
        return [
            parseInt(testValue),
            numbers.split(' ').map(n => parseInt(n))
        ];
    });
}

// Generate all possible operator combinations
function* generateOperators(length: number): Generator<string[]> {
    const operators = ['+', '*'];
    const total = Math.pow(operators.length, length);
    
    for (let i = 0; i < total; i++) {
        const combination: string[] = [];
        let num = i;
        
        for (let j = 0; j < length; j++) {
            combination.push(operators[num % operators.length]);
            num = Math.floor(num / operators.length);
        }
        
        yield combination;
    }
}

// Evaluate expression from left to right
function evaluate(numbers: number[], operators: string[]): number {
    let result = numbers[0];
    
    for (let i = 0; i < operators.length; i++) {
        const nextNum = numbers[i + 1];
        if (operators[i] === '+') {
            result += nextNum;
        } else {
            result *= nextNum;
        }
    }
    
    return result;
}

function part1(input: string): number {
    const equations = parseInput(input);
    let sum = 0;

    for (const [testValue, numbers] of equations) {
        const operatorCount = numbers.length - 1;
        
        // Try all possible operator combinations
        for (const operators of generateOperators(operatorCount)) {
            if (evaluate(numbers, operators) === testValue) {
                sum += testValue;
                break; // Found a valid combination, move to next equation
            }
        }
    }

    return sum;
}

const input = fs.readFileSync('part1.txt', 'utf8');
console.log(part1(input));