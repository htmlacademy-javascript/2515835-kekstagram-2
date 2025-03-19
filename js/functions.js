function isLengthValid(inputString, maxLength) {
  return inputString.length <= maxLength;
}
const stringToCheck = "Привет, мир!";
const maxLength = 15;

if (isLengthValid(stringToCheck, maxLength)) {
  console.log("Строка допустима.");
} else {
  console.log("Строка слишком длинная.");
}
