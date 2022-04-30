//the output should be true
const roadRegister1 = [
  [false, true, false, false],
  [false, false, true, false],
  [true, false, false, true],
  [false, false, true, false],
];

// the output should be true
const roadRegister2 = [
  [false, true, false, false, false, false, false],
  [true, false, false, false, false, false, false],
  [false, false, false, true, false, false, false],
  [false, false, true, false, false, false, false],
  [false, false, false, false, false, false, true],
  [false, false, false, false, true, false, false],
  [false, false, false, false, false, true, false],
];

// the output should be false
const roadRegister3 = [
  [false, true, false],
  [false, false, false],
  [true, false, false],
];

// the output should be true
const roadRegister4 = [
  [false, true, true],
  [true, false, true],
  [true, true, false],
];

// the output should be false
const roadRegister5 = [
  [false, false, true],
  [true, false, true],
  [true, true, false],
];

const isValidRoadRegister = (roadRegister) => {
  let obj = {};

  for (let i = 0; i < roadRegister.length; i++) {
    for (let j = 0; j < roadRegister[i].length; j++) {
      if (roadRegister[i][j]) {
        obj[i] = obj[i] ? [...obj[i], j] : [j];
      }
    }
  }

  if (!Object.keys(obj).length) {
    return true;
  }

  let count = 0;

  for (let i = 0; i < roadRegister.length; i++) {
    if (!obj[i]) {
      return false;
    }

    for (let key in obj) {
      if (key != i && obj[key].includes(i)) {
        count++;
      }
    }

    if (count !== obj[i].length) {
      return false;
    }

    count = 0;
  }

  return true;
};

console.log(isValidRoadRegister(roadRegister1));
console.log(isValidRoadRegister(roadRegister2));
console.log(isValidRoadRegister(roadRegister3));
console.log(isValidRoadRegister(roadRegister4));
console.log(isValidRoadRegister(roadRegister5));
