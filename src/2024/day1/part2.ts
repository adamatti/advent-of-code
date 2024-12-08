import fs from 'fs';

function calculateSimilarityScore(input: string): number {
    // Split input into lines and filter out empty lines
    const lines = input.split('\n').filter(line => line.trim());
    
    // Parse the two lists
    const [leftList, rightList] = lines.reduce<[number[], number[]]>(
        ([left, right], line) => {
            const [l, r] = line.split(/\s+/);
            return [
                [...left, parseInt(l)],
                [...right, parseInt(r)]
            ];
        },
        [[], []]
    );
    
    // Calculate similarity score
    return leftList.reduce((total, num) => {
        const countInRight = rightList.filter(r => r === num).length;
        return total + (num * countInRight);
    }, 0);
}

const input = fs.readFileSync('part2.txt', 'utf8');
console.log(calculateSimilarityScore(input));