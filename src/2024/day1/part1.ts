import fs from 'fs';

function calculateTotalDistance(input: string): number {
    // Split input into lines and filter out empty lines
    const lines = input.trim().split('\n');
    
    // Create two arrays to store left and right numbers
    const leftList: number[] = [];
    const rightList: number[] = [];
    
    // Parse input into two separate lists
    lines.forEach(line => {
        const [left, right] = line.trim().split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    });
    
    // Sort both lists in ascending order
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);
    
    // Calculate total distance
    let totalDistance = 0;
    for (let i = 0; i < leftList.length; i++) {
        const distance = Math.abs(leftList[i] - rightList[i]);
        totalDistance += distance;
    }
    
    return totalDistance;
}

const input = fs.readFileSync('part1.txt', 'utf8');
console.log(calculateTotalDistance(input));
