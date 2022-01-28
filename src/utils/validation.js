/* Contains functions to validate the inputs */

// Checks whether the passed input is empty or not
const isNotEmpty = (input) => {
  var pattern =/\S+/;
  return pattern.test(input);  // returns a boolean
}

// Checks whether the passed input contains only decimals
const isOnlyNumber = (input) => {
  var pattern = /^\d+$/;
  return pattern.test(input); // returns a boolean
}

// Checks whether the passed input contains only 0s and 1s
const isBinary = (input) => {
  var pattern =/[01]+/;
  return pattern.test(input);  // returns a boolean
}

// Checks whether the passed input has exactly 10 characters
const is10Characters = (input) => {
  return input.length === 10
}

export { isOnlyNumber, isNotEmpty, isBinary, is10Characters };