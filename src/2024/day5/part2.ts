import fs from 'fs';

type Rule = [number, number]; // [before, after]
type Sequence = number[];

function buildGraph(rules: Rule[]): Map<number, Set<number>> {
    const graph = new Map<number, Set<number>>();
    
    for (const [before, after] of rules) {
        if (!graph.has(before)) graph.set(before, new Set());
        if (!graph.has(after)) graph.set(after, new Set());
        graph.get(before)!.add(after);
    }
    
    return graph;
}

function isValidSequence(sequence: Sequence, graph: Map<number, Set<number>>): boolean {
    for (let i = 0; i < sequence.length; i++) {
        for (let j = i + 1; j < sequence.length; j++) {
            const before = sequence[i];
            const after = sequence[j];
            // If there's a rule saying after should come before before, sequence is invalid
            if (graph.get(after)?.has(before)) {
                return false;
            }
        }
    }
    return true;
}

function topologicalSort(sequence: Sequence, graph: Map<number, Set<number>>): Sequence {
    const nodes = new Set(sequence);
    const result: number[] = [];
    
    while (nodes.size > 0) {
        // Find a node with no incoming edges from remaining nodes
        const node = Array.from(nodes).find(n => 
            Array.from(nodes).every(other => !graph.get(other)?.has(n))
        );
        
        if (node === undefined) {
            throw new Error("Cycle detected in graph");
        }
        
        result.push(node);
        nodes.delete(node);
    }
    
    return result;
}

function part2(input: string): number {
    // Parse input
    const [rulesStr, sequencesStr] = input.trim().split('\n\n');
    
    // Parse rules
    const rules: Rule[] = rulesStr.split('\n').map(line => {
        const [before, after] = line.split('|').map(Number);
        return [before, after];
    });
    
    // Parse sequences
    const sequences: Sequence[] = sequencesStr.split('\n').map(line => 
        line.split(',').map(Number)
    );
    
    // Build dependency graph
    const graph = buildGraph(rules);
    
    // Find invalid sequences and reorder them
    const invalidSequences = sequences.filter(seq => !isValidSequence(seq, graph));
    const reorderedSequences = invalidSequences.map(seq => topologicalSort(seq, graph));
    
    // Get middle numbers and sum them
    return reorderedSequences.reduce((sum, seq) => {
        const middle = Math.floor(seq.length / 2);
        return sum + seq[middle];
    }, 0);
}

const input = fs.readFileSync('part1.txt', 'utf8');
console.log(part2(input));