const sortArray = (array) => {
  const map = new Map();
  let cloneArr = [...array];
  let i = 0;

  while (cloneArr.length) {
    const indexOfMinItem = cloneArr.indexOf(Math.min(...cloneArr));
    map.set(i++, Math.min(...cloneArr));
    cloneArr = cloneArr.slice(0, indexOfMinItem).concat(cloneArr.slice(indexOfMinItem + 1));
  }

  return Array.from(map.values());
}
const array = [2, 11, 37, 28, 47, 34, 43, 9, 13, 38, 18, 6, 0, 0, -13, -9, 28, 11, -16];
console.log(sortArray(array));