import fs from 'fs';

type Operator = '+' | '*' | '||';

interface Equation {
    target: number;
    numbers: number[];
}

function evaluate(numbers: number[], operators: Operator[]): number {
    let result = numbers[0];
    
    for (let i = 0; i < operators.length; i++) {
        const op = operators[i];
        const next = numbers[i + 1];
        
        switch (op) {
            case '+':
                result += next;
                break;
            case '*':
                result *= next;
                break;
            case '||':
                // Convert both numbers to strings and concatenate, then back to number
                result = parseInt(`${result}${next}`);
                break;
        }
    }
    
    return result;
}

function generateOperatorCombinations(length: number): Operator[][] {
    const operators: Operator[] = ['+', '*', '||'];
    const results: Operator[][] = [];
    
    function generate(current: Operator[], remaining: number) {
        if (remaining === 0) {
            results.push([...current]);
            return;
        }
        
        for (const op of operators) {
            generate([...current, op], remaining - 1);
        }
    }
    
    generate([], length);
    return results;
}

function parseInput(input: string): Equation[] {
    return input.trim().split('\n').map(line => {
        const [target, nums] = line.split(': ');
        return {
            target: parseInt(target),
            numbers: nums.split(' ').map(Number)
        };
    });
}

function canBeSolved(equation: Equation): boolean {
    const numOperators = equation.numbers.length - 1;
    const combinations = generateOperatorCombinations(numOperators);
    
    return combinations.some(operators => 
        evaluate(equation.numbers, operators) === equation.target
    );
}

function part2(input: string): number {
    const equations = parseInput(input);
    return equations
        .filter(canBeSolved)
        .reduce((sum, eq) => sum + eq.target, 0);
}

const input = fs.readFileSync('part1.txt', 'utf8');
console.log(part2(input));