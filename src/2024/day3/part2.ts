import fs from 'fs';


function part2(input: string): number {
    let sum = 0;
    let isEnabled = true; // Start with multiplications enabled

    const regex = /(?<cmd>(mul|do|don't))\(((?<v1>(\d+)),(?<v2>(\d+)))?\)/g;
    let match;
    while ((match = regex.exec(input)) !== null) {
        const { cmd, v1, v2 } = match.groups;
        if (cmd === 'mul' && isEnabled) {
            sum += parseInt(v1) * parseInt(v2);
        }
        if (cmd === 'do') {
            isEnabled = true;
        }
        if (cmd === "don't") {
            isEnabled = false;
        }
    }
    return sum;
}

const input = fs.readFileSync('part2.txt', 'utf8');
console.log(part2(input));