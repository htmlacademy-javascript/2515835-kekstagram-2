function isLengthValid(inputString, maxLen) {
  return inputString.length <= maxLen;
}
const stringToCheck = 'Привет, мир!';
const maxLength = 15;

if (isLengthValid(stringToCheck, maxLength)) {
  // console.log('Строка допустима.');//
} else {
  // console.log('Строка слишком длинная.');//
}
