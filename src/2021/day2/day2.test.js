'use strict';

const fs = require('fs');

const processMovement = (input) => {
  const pos = {x: 0, y: 0};

  const map = {
    forward: (val) => pos.x+=val,
    up: (val) => pos.y-=val,
    down: (val) => pos.y+=val,
  };

  input.forEach((command) => {
    const [direction, valueString] = command.split(' ');
    const value = parseInt(valueString);
    map[direction](value);
  });
  return pos.x * pos.y;
};

const processMovement2 = (input) => {
  const pos = {x: 0, y: 0, aim: 0};

  const map = {
    forward: (val) => {
      pos.x+=val;
      pos.y+= (pos.aim * val);
    },
    up: (val) => pos.aim-=val,
    down: (val) => pos.aim+=val,
  };

  input.forEach((command) => {
    const [direction, valueString] = command.split(' ');
    const value = parseInt(valueString);
    map[direction](value);
  });
  return pos.x * pos.y;
};

describe('day2', () => {
  const sampleInput = [
    'forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2',
  ];

  let fileInput;

  beforeAll(() => {
    const txt = fs.readFileSync('./src/2021/day2/input.txt', 'utf8');
    fileInput= txt.split('\n');
  });

  describe('part1', ()=> {
    it('sample', () => {
      expect(processMovement(sampleInput)).toEqual(150);
    });

    it('solution', () => {
      expect(processMovement(fileInput)).toEqual(1989014);
    });
  });

  describe('part2', ()=> {
    it('sample', () => {
      expect(processMovement2(sampleInput)).toEqual(900);
    });

    it('solution', () => {
      expect(processMovement2(fileInput)).toEqual(2006917119);
    });
  });
});
