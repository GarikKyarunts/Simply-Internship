// the output should be true
const grid1 = [
  [".", ".", ".", "1", "4", ".", ".", "2", "."],
  [".", ".", "6", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", "1", ".", ".", ".", ".", ".", "."],
  [".", "6", "7", ".", ".", ".", ".", ".", "9"],
  [".", ".", ".", ".", ".", ".", "8", "1", "."],
  [".", "3", ".", ".", ".", ".", ".", ".", "6"],
  [".", ".", ".", ".", ".", "7", ".", ".", "."],
  [".", ".", ".", "5", ".", ".", ".", "7", "."],
];

// the output should be false
const grid2 = [
  [".", ".", ".", ".", "2", ".", ".", "9", "."],
  [".", ".", ".", ".", "6", ".", ".", ".", "."],
  ["7", "1", ".", ".", "7", "5", ".", ".", "."],
  [".", "7", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", "8", "3", ".", ".", "."],
  [".", ".", "8", ".", ".", "7", ".", "6", "."],
  [".", ".", ".", ".", ".", "2", ".", ".", "."],
  [".", "1", ".", "2", ".", ".", ".", ".", "."],
  [".", "2", ".", ".", "3", ".", ".", ".", "."],
];

const createSubgrids = (grid) => {
  const subgrids = [];
  let subgridRow = [];
  let subgrid = [];

  for (let p = 0; p < 3; p++) {
    for (let k = 0; k < 3; k++) {
      for (let i = p * 3; i < p * 3 + 3; i++) {
        for (let j = k * 3; j < k * 3 + 3; j++) {
          subgridRow.push(grid[i][j]);
        }
        subgrid.push(subgridRow);
        subgridRow = [];
      }
      subgrids.push(subgrid);
      subgrid = [];
    }
  }
  return subgrids;
};

const isValidRow = (row) => {
  const s = new Set();
  const filledRow = [];

  for (let i = 0; i < row.length; i++) {
    if (row[i] !== ".") {
      filledRow.push(row[i]);
      s.add(row[i]);
    }
  }

  if (s.size !== filledRow.length) {
    return false;
  }

  return true;
};

const isValidColumn = (column) => {
  const s = new Set();
  const filledRow = [];

  for (let i = 0; i < column.length; i++) {
    if (column[i] !== ".") {
      filledRow.push(column[i]);
      s.add(column[i]);
    }
  }

  if (s.size !== filledRow.length) {
    return false;
  }

  return true;
};

const isValidSubgrid = (subgrid) => {
  const s = new Set();
  const filledSubgrid = [];

  subgrid.forEach((row) => {
    row.forEach((item) => {
      if (item !== ".") {
        filledSubgrid.push(item);
        s.add(item);
      }
    });
  });

  if (s.size !== filledSubgrid.length) {
    return false;
  }

  return true;
};

const solution = (grid) => {
  let column = [];

  for (let i = 0; i < grid.length; i++) {
    if (!isValidRow(grid[i])) {
      return false;
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      column.push(grid[j][i]);
    }
    if (!isValidColumn(column)) {
      return false;
    }

    column = [];
  }

  const subgrids = createSubgrids(grid);

  for (let i = 0; i < subgrids.length; i++) {
    if (!isValidSubgrid(subgrids[i])) {
      return false;
    }
  }

  return true;
};

console.log(solution(grid1));
