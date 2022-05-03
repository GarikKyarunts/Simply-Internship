const solution = (chessPlayers, finishedMatches) => {
  if (finishedMatches.length > (chessPlayers / 2) * (chessPlayers - 1)) {
    throw new RangeError("Invalid input in finished matches!");
  }
  const matchesToPlay = [];
  const map = new Map();

  for (let i = 0; i < chessPlayers; i++) {
    map.set(i, []);
  }

  finishedMatches.forEach((game) => {
    if (
      !Array.isArray(game) ||
      game.length !== 2 ||
      0 > game[0] ||
      game[0] > chessPlayers - 1 ||
      0 > game[1] ||
      game[1] > chessPlayers - 1
    ) {
      throw new RangeError("Invalid input!");
    }
    map.set(game[0], [...map.get(game[0]), game[1]]);
    map.set(game[1], [...map.get(game[1]), game[0]]);
  });

  let arr = [];

  map.forEach((value, key) => {
    for (let i = 0; i < chessPlayers; i++) {
      if (i !== key && !value.includes(i)) {
        arr.push(key, i);
        map.set(key, [...map.get(key), i]);
        map.set(i, [...map.get(i), key]);
        arr.sort((a, b) => a - b);
        matchesToPlay.push(arr);
        arr = [];
      }
    }
  });

  return matchesToPlay;
};

const chessPlayers = 4;
const finishedMatches = [[0, 1], [1, 2], [2, 0]];

console.log(solution(chessPlayers, finishedMatches));
