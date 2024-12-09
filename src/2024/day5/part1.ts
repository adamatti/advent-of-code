import fs from 'fs';

type Rule = {
    before: number;
    after: number;
  };
  
  function parseInput(input: string): {rules: Rule[], updates: number[][]} {
    const [rulesSection, updatesSection] = input.trim().split('\n\n');
    
    // Parse rules
    const rules = rulesSection.split('\n').map(line => {
      const [before, after] = line.split('|').map(Number);
      return { before, after };
    });
    
    // Parse updates
    const updates = updatesSection.split('\n').map(line => 
      line.split(',').map(Number)
    );
    
    return { rules, updates };
  }
  
  function isValidOrder(update: number[], rules: Rule[]): boolean {
    // Filter rules that only contain numbers present in this update
    const applicableRules = rules.filter(rule => 
      update.includes(rule.before) && update.includes(rule.after)
    );
    
    // Check each applicable rule
    for (const rule of applicableRules) {
      const beforeIndex = update.indexOf(rule.before);
      const afterIndex = update.indexOf(rule.after);
      
      if (beforeIndex > afterIndex) {
        return false;
      }
    }
    
    return true;
  }
  
  function getMiddleNumber(update: number[]): number {
    const middleIndex = Math.floor(update.length / 2);
    return update[middleIndex];
  }
  
  export function part1(input: string): number {
    const { rules, updates } = parseInput(input);
    
    const validUpdates = updates.filter(update => isValidOrder(update, rules));
    const middleNumbers = validUpdates.map(getMiddleNumber);
    
    return middleNumbers.reduce((sum, num) => sum + num, 0);
  }

  const input = fs.readFileSync('part1.txt', 'utf8');
  console.log(part1(input));