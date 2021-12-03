'use strict';

const fs = require('fs');

const binaryStringToDecimal = (binaryString) => {
  const binary = parseInt(binaryString, 2);
  const decimal = parseInt(binary.toString(10), 10);
  return decimal;
};

const countAtPosition = (input, position, value) => {
  return input.filter( (line) => {
    const valueAtPosition = line[position];
    return valueAtPosition == value;
  }).length;
};

const processOxygenGeneratorRating = (gammaRate, input) => {
  let remaining = input;

  for (let x=0; x < input[0].length; x++) {
    remaining = remaining.filter((line) => {
      let valueToFind;
      if (x==0) {
        valueToFind = gammaRate.binaryString[x];
      } else {
        valueToFind = (countAtPosition(remaining, x, '1') >= (remaining.length) / 2) ? '1' : '0';
      }

      return line[x] === valueToFind;
    });
    if (remaining.length === 1) {
      break;
    }
  }

  const binaryString = remaining[0];
  const decimal = binaryStringToDecimal(binaryString);
  return {
    binaryString,
    decimal,
  };
};

// FIXME merge with processOxygenGeneratorRating
const processCo2ScrubberRating = (epsilonRate, input) => {
  let remaining = input;

  for (let x=0; x < input[0].length; x++) {
    remaining = remaining.filter((line) => {
      let valueToFind;
      if (x==0) {
        valueToFind = epsilonRate.binaryString[x];
      } else {
        valueToFind = (countAtPosition(remaining, x, '1') >= (remaining.length) / 2) ? '0' : '1';
      }

      return line[x] === valueToFind;
    });
    if (remaining.length === 1) {
      break;
    }
  }

  const binaryString = remaining[0];
  const decimal = binaryStringToDecimal(binaryString);
  return {
    binaryString,
    decimal,
  };
};

const processEpsilonRate = (gammaRate) => {
  const input = gammaRate.binaryString;
  const array = new Array(gammaRate.binaryString.length).fill(0);

  for (let x=0; x<input.length; x++) {
    array[x] = (input[x] === '1' ? '0' : '1');
  }

  const binaryString = array.join('');
  const decimal = binaryStringToDecimal(binaryString);

  // console.log('EpsilonRate binary: ', binaryString);
  return {
    binaryString,
    decimal,
  };
};

const processGammaRate = (input, listLength) => {
  const length = input[0].length;
  const array = new Array(length).fill(0);

  for (let x=0; x<input.length; x++) {
    const value = input[x];
    array[x] = value > (listLength / 2) ? 1 : 0;
  }

  const binaryString = array.join('');
  const decimal = binaryStringToDecimal(binaryString);

  // console.log('GammaRate binary: ', binaryString);
  return {
    binaryString,
    decimal,
  };
};

const process = (input) => {
  const array = new Array(input[0].length).fill(0);

  input.forEach((line) => {
    for (let index=0; index<line.length; index++) {
      const value = parseInt(line[index]);
      if (value === 1) {
        array[index]++;
      }
    };
  });

  const gammaRate = processGammaRate(array, input.length);
  const epsilonRate = processEpsilonRate(gammaRate);
  const oxygenGeneratorRating = processOxygenGeneratorRating(gammaRate, input);
  const co2ScrubberRating = processCo2ScrubberRating(epsilonRate, input);

  return {
    gammaRate: gammaRate.decimal,
    epsilonRate: epsilonRate.decimal,
    result: gammaRate.decimal * epsilonRate.decimal,
    oxygenGeneratorRating: oxygenGeneratorRating.decimal,
    co2ScrubberRating: co2ScrubberRating.decimal,
    lifeSupportRating: oxygenGeneratorRating.decimal * co2ScrubberRating.decimal,
  };
};

describe('day3', ()=>{
  const sampleInput = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
  ];

  let fileInput;

  beforeAll(() => {
    const txt = fs.readFileSync('./src/2021/day3/input.txt', 'utf8');
    fileInput= txt.split('\n');
  });


  describe('part 1', ()=> {
    it('sample', ()=> {
      expect(process(sampleInput)).toStrictEqual({
        gammaRate: 22,
        epsilonRate: 9,
        result: 198,
        oxygenGeneratorRating: 23,
        co2ScrubberRating: 10,
        lifeSupportRating: 230,
      });
    });

    it('solution', ()=> {
      expect(process(fileInput)).toStrictEqual({
        gammaRate: 2987,
        epsilonRate: 1108,
        result: 3309596,
        oxygenGeneratorRating: 2815,
        co2ScrubberRating: 1059,
        lifeSupportRating: 2981085,
      });
    });
  });
});
