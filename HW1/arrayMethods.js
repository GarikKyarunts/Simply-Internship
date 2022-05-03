const obj = {
  key: 0,
};

Array.prototype.myFind = function (cb, thisArg) {
  if (thisArg) {
    //const cbBounded = cb.bind(thisArg);
    for (let i = 0; i < this.length; i++) {
      if (cb.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  } else {
    for (let i = 0; i < this.length; i++) {
      if (cb(this[i], i, this)) {
        return this[i];
      }
    }
  }
};

Array.prototype.myFindIndex = function (cb, thisArg) {
  if (thisArg) {
    //const cbBounded = cb.bind(thisArg);
    for (let i = 0; i < this.length; i++) {
      if (cb.call(thisArg, this[i], i, this)) {
        return i;
      }
    }
  } else {
    for (let i = 0; i < this.length; i++) {
      if (cb(this[i], i, this)) {
        return i;
      }
    }
  }
};

Array.prototype.myLastIndexOf = function (
  searchElement,
  fromIndex = this.length - 1
) {
  if (fromIndex >= this.length) {
    fromIndex = this.length - 1;
  }

  if (fromIndex < 0) {
    fromIndex = this.length + fromIndex;
  }

  for (let i = fromIndex; i >= 0; i--) {
    if (this[i] === searchElement) {
      return i;
    }
  }
  return -1;
};

Array.prototype.mySome = function (cb, thisArg) {
  if (thisArg) {
    //const cbBounded = cb.bind(thisArg);
    for (let i = 0; i < this.length; i++) {
      if (cb.call(thisArg, this[i], i, this)) {
        return true;
      }
    }
    return false;
  } else {
    for (let i = 0; i < this.length; i++) {
      if (cb(this[i], i, this)) {
        return true;
      }
    }
    return false;
  }
};

Array.prototype.myEvery = function (cb, thisArg) {
  if (thisArg) {
    //const cbBounded = cb.bind(thisArg);
    for (let i = 0; i < this.length; i++) {
      if (!cb.call(thisArg, this[i], i, this)) {
        return false;
      }
    }
    return true;
  } else {
    for (let i = 0; i < this.length; i++) {
      if (!cb(this[i], i, this)) {
        return false;
      }
    }
    return true;
  }
};

Array.prototype.myReduce = function (cb, initialValue = this[0]) {
  if (this.length === 0 && initialValue === this[0]) {
    throw new TypeError("Array is empty and there is no initial value");
  }
  if (initialValue === this[0]) {
    for (let i = 1; i < this.length; i++) {
      initialValue = cb(initialValue, this[i], i, this);
      console.log(initialValue);
    }
    return initialValue;
  } else {
    for (let i = 0; i < this.length; i++) {
      initialValue = cb(initialValue, this[i], i, this);
      console.log(initialValue);
    }
    return initialValue;
  }
};

Array.prototype.myReduceRight = function (
  cb,
  initialValue = this[this.length - 1]
) {
  if (this.length === 0 && initialValue === this[this.length - 1]) {
    throw new TypeError("Array is empty and there is no initial value");
  }
  if (initialValue === this[this.length - 1]) {
    for (let i = this.length - 2; i >= 0; i--) {
      initialValue = cb(initialValue, this[i], i, this);
      //console.log(initialValue);
    }
    return initialValue;
  } else {
    for (let i = this.length - 1; i >= 0; i--) {
      initialValue = cb(initialValue, this[i], i, this);
      //console.log(initialValue);
    }
    return initialValue;
  }
};

Array.prototype.myJoin = function (separator = ",") {
  if (this.length === 0) {
    return "";
  }

  let result = "";

  for (let element of this) {
    if (
      element == undefined ||
      (Array.isArray(element) && element.length === 0)
    ) {
      result += separator;
    } else {
      result += element + separator;
    }
  }

  return result.substring(0, result.length - 1);
};

Array.prototype.myPop = function () {
  if (this.length === 0) {
    return;
  }
  const popped = this[this.length - 1];
  delete this[this.length - 1];
  this.length--;
  return popped;
};

Array.prototype.myUnshift = function (...elements) {
  this.length += elements.length;
  for (let i = this.length - elements.length - 1, j = 1; i >= 0; i--, j++) {
    this[this.length - j] = this[i];
    delete this[i];
  }

  for (let i = 0; i < elements.length; i++) {
    this[i] = elements[i];
  }

  return this.length;
};

let greetings = {
  0: 'Hi',
  1: 'Hello',
  2: 'Howdy',
  length: 3,
  removeLast() {
    return [].pop.call(this);
  },
};

let greting = greetings.removeLast();

console.log(greting);
console.log(greetings);

//console.log(popped1, arr1.length);
// console.log(popped2, arr2);
