'use strict';

const fs = require('fs');

const parseInput = (input) => {
  const lines = input.split('\n');
  const draws = lines[0].split(',').map(parseFloat);

  const games = [];
  let currentGame = [];
  for (let x=2; x<lines.length; x++) {
    const line = lines[x];
    if (line.trim() === '') {
      games.push(currentGame);
      currentGame = [];
    } else {
      currentGame.push(line.trim().split(/\D+/).map(parseFloat));
    }
  }
  return {
    games,
    draws,
  };
};

const findWinner = ({draws, games}) => {
  const gameLength = games[0].length;
  const alreadyDrawn = draws.slice(0, gameLength-1);

  for (let drawPos=gameLength-1; drawPos < draws.length; drawPos++) {
    const draw = draws[drawPos];

    alreadyDrawn.push(draw);
    // console.log("Just draw", draw);
    for (let gamePos=0; gamePos< games.length; gamePos++) {
      const game = games[gamePos];
      const gameResult = processGame(game, alreadyDrawn);
      if (gameResult.won) {
        return {
          game,
          drawValue: draw,
          gameIndex: gamePos,
          drawsToWin: alreadyDrawn,
        };
      }
    }
  }
  throw Error('No winners?');
};

// Check if won
const processGame = (game, draws) => {
  for (let x=0; x<game.length; x++) {
    let notDraw = game[x].some((val) => !draws.includes(val));
    if (notDraw) {
      const columnValues = getColumnValues(game, x);
      notDraw = columnValues.some((val) => !draws.includes(val));
    }
    if (!notDraw) {
      return {
        won: true,
      };
    }
  }

  return {};
};

const getColumnValues = (game, column) => {
  const values = [];
  for (let x=0; x<game.length; x++) {
    values.push(game[x][column]);
  }
  return values;
};

const sumUnmarkedValues = (game, draws) => {
  const gameLength = game.length;
  let sum = 0;
  for (let x=0; x < gameLength; x++) {
    for (let y=0; y < gameLength; y++) {
      const value = game[x][y];
      if (!draws.includes(value)) {
        // console.log("Sum ", value);
        sum += value;
      }
    }
  }
  return sum;
};

describe('day 4', ()=> {
  let sampleInput;
  let fileInput;

  beforeAll(() => {
    fileInput = fs.readFileSync('./src/2021/day4/input.txt', 'utf8');
    sampleInput =fs.readFileSync('./src/2021/day4/sample.txt', 'utf8');
  });


  describe('part 1', ()=> {
    it('sample', () => {
      const {games, draws} = parseInput(sampleInput);
      expect(games.length).toEqual(3);

      const {drawValue, gameIndex, game, drawsToWin} = findWinner({draws, games});
      expect(drawValue).toEqual(24);
      expect(gameIndex).toEqual(2);
      expect(game).toBeTruthy();

      const sum = sumUnmarkedValues(game, drawsToWin);
      expect(sum).toEqual(188);

      expect(sum * drawValue).toEqual(4512);
    });

    it('solution', () => {
      const {games, draws} = parseInput(fileInput);
      expect(games.length).toEqual(100);

      const {drawValue, gameIndex, game, drawsToWin} = findWinner({draws, games});
      expect(drawValue).toEqual(77);
      expect(gameIndex).toEqual(15);
      expect(game).toBeTruthy();

      const sum = sumUnmarkedValues(game, drawsToWin);
      expect(sum).toEqual(784);

      expect(sum * drawValue).toEqual(60368);
    });
  });
});
