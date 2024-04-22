/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(number) {
    this.result += number;
  }

  subtract(number) {
    this.result -= number;
  }

  multiply(number) {
    this.result *= number;
  }

  divide(number) {
    if (number === 0) {
      throw new Error("Cannot divide by zero");
    }
    this.result /= number;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(expression) {
    const operators = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
    };

    let result = 0;
    let operator = "+";
    let currentNumber = 0;

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (/\d/.test(char)) {
        currentNumber = currentNumber * 10 + parseInt(char);
      } else if (operators[char]) {
        result = operators[operator](result, currentNumber);
        operator = char;
        currentNumber = 0;
      } else if (char === "(") {
        const endIndex = findMatchingParenthesisIndex(expression, i);
        const subExpression = expression.substring(i + 1, endIndex);
        const subResult = this.calculate(subExpression);
        result = operators[operator](result, subResult);
        i = endIndex;
        operator = "+";
        currentNumber = 0;
      }
    }

    result = operators[operator](result, currentNumber);
    return result;
  }
}

function findMatchingParenthesisIndex(expression, startIndex) {
  let count = 0;
  for (let i = startIndex + 1; i < expression.length; i++) {
    if (expression[i] === "(") {
      count++;
    } else if (expression[i] === ")") {
      if (count === 0) {
        return i;
      }
      count--;
    }
  }
  throw new Error("Mismatched parentheses");
}

module.exports = Calculator;

module.exports = Calculator;
