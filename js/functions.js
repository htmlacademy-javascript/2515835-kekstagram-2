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

function isMeetingWithinWorkday(workStart, workEnd, meetingStart, meetingDuration) {
  function timeToMinutes(timeStr) {
    const parts = timeStr.split(':');
    if (parts.length !== 2) {
      throw new Error('Неверный формат времени');
    }
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    if (
      isNaN(hours) || isNaN(minutes) ||
      hours < 0 || hours > 23 ||
      minutes < 0 || minutes > 59
    ) {
      throw new Error('Неверное значение часов или минут');
    }
    return hours * 60 + minutes;
  }

  const workStartMin = timeToMinutes(workStart);
  const workEndMin = timeToMinutes(workEnd);
  const meetingStartMin = timeToMinutes(meetingStart);
  const meetingEndMin = meetingStartMin + meetingDuration;

  return meetingStartMin >= workStartMin && meetingEndMin <= workEndMin;
}
// eslint-disable-next-line no-console
console.log(isMeetingWithinWorkday('08:00', '17:30', '14:00', 90));

