const matrix1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

const matrix3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const matrix2 = [
  [1, 2, 3],
  [4, 5, []],
  [7, 8, 9],
  [null, 11, 12],
  [13, 14, NaN],
];

const calculateRotationsCount = (degree) => {
  while (degree < 0) {
    degree += 360;
  }

  return (degree % 360) / 90;
};

const rotateBy90Degrees = (matrix) => {
  const result = [];
  let tempRow = [];

  for (let j = 0; j < matrix[0].length; j++) {
    for (let i = matrix.length - 1; i >= 0; i--) {
      tempRow.push(matrix[i][j]);
    }
    result.push(tempRow);
    tempRow = [];
  }

  return result;
};

const rotate = (matrix, degree) => {
  let result = matrix;
  const rotationsCount = calculateRotationsCount(degree);

  for (let timesToRotate = 0; timesToRotate < rotationsCount; timesToRotate++) {
    result = rotateBy90Degrees(result);
  }

  return result;
};

// 2. Rotate all matrix elements except the diagonals

const rotateBy90DegreesWithoutDiagonal = (matrix) => {
  const result = [];
  let tempRow = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i === j || i + j === matrix.length - 1) {
        tempRow.push(matrix[i][j]);
      } else {
        tempRow.push(matrix[matrix.length - j - 1][i]);
      }
    }
    if (i % 2) {
      tempRow;
    }
    result.push(tempRow);
    tempRow = [];
  }

  return result;
};

const rotateWithoutDiagonal = (matrix, degree) => {
  let result = matrix;
  const rotationsCount = calculateRotationsCount(degree);

  for (let timesToRotate = 0; timesToRotate < rotationsCount; timesToRotate++) {
    result = rotateBy90DegreesWithoutDiagonal(result);
  }
  return result;
};

console.log(rotateWithoutDiagonal(matrix1, 180));
