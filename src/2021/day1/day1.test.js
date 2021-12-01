'use strict';

const fs = require('fs');

// TODO it should be in an external file, but it is here for convenience
const countIncreases = (input) => {
  let result = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      result++;
    }
  }
  return result;
};

const countIncreases2 = (input) => {
  let result = 0;
  for (let i = 3; i < input.length; i++) {
    const previous = input[i - 1] + input[i -2] + input[i - 3];
    const current = input[i] + input[i -1] + input[i - 2];
    if (current > previous) {
      result++;
    }
  }
  return result;
};

describe('day1', ()=> {
  const sampleInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  let fileInput;

  beforeAll(() => {
    const txt = fs.readFileSync('./src/2021/day1/input.txt', 'utf8');
    fileInput= txt.split('\n').map(Number);
  });

  describe('part 1', () => {
    it('sample', ()=> {
      expect(countIncreases(sampleInput)).toEqual(7);
    });

    it('solution ', () => {
      expect(countIncreases(fileInput)).toEqual(1374);
    });
  });

  describe('part 2', () => {
    it('sample', ()=> {
      expect(countIncreases2(sampleInput)).toEqual(5);
    });

    it('solution ', () => {
      expect(countIncreases2(fileInput)).toEqual(1418);
    });
  });
});
