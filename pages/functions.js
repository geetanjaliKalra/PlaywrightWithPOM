// function add(a, b) {
//   console.log("Normal function");
//   return a + b;
// }

const add = (a, b) => {
  console.log("other way of writting Normal function");
  return a + b;
};

console.log(add(3, 4));

const noArgFunc = (a) => console.log(a);
const noArgFunc1 = () => console.log("Hello");
noArgFunc("hello");
noArgFunc1();

function callingFunc(callbackfunc, param) {
  const returnedValue = abc(param);
  console.log(returnedValue);
}

function abc(param) {
  console.log("Parameter from callback function is", param);
  return "hello from callback function";
}

callingFunc(abc, "geetu");

function multiply(num1, num2, result) {
  const res = num1 * num2;
  result(res);
}

const displayResult = (value) => console.log("The result is ", value);

multiply(4, 5, displayResult);

function checkEvenOdd(value) {
  if (value % 2 == 0) console.log("even");
  else console.log("odd");
}

multiply(3, 5, checkEvenOdd);

function convertToUpperCase(str) {
  return str.toUpperCase();
}

function findLength(str) {
  return str.length;
}

function reverseString(str) {
  const stringArray = str.split("");
  stringArray.reverse();
  return stringArray.join("");
}
function stringOperation(string1, stringFunc) {
  const output = stringFunc(string1);
  console.log(output);
}

stringOperation("geetanjali", convertToUpperCase);
stringOperation("geetanjali", findLength);
// reverseString(abc);
stringOperation("geetanjali", reverseString);

function filterArray(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}
function isEven(num) {
  return num % 2 === 0;
}

const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = filterArray(numbers, isEven);
console.log(evenNumbers);

const square = (num) => {
  return num * num;
};

// const result = square(5);
// console.log(result);

function capitalize(str) {
  const firstIndex = str.substring(0, 1);
  const remainingString = str.substring(1, str.length);
  const capitalizedString = firstIndex.toUpperCase() + remainingString;
  return capitalizedString;
}

function operations(para, opFunction) {
  console.log(opFunction(para));
}

operations(5, square);
operations("geetanjali", capitalize);
