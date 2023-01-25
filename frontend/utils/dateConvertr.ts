import { DateData } from './dataInterfaces/generalInterfaces';

export const dateConvertr = (datestr: string): DateData => {
  const curdate = new Date(datestr + 'Z');
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return {
    day: days[curdate.getUTCDay()],
    date: curdate.getUTCDate(),
    month: months[curdate.getUTCMonth()],
    year: curdate.getUTCFullYear(),
    time:
      curdate.getUTCHours() +
      ':' +
      (curdate.getUTCMinutes() < 10 ? '0' : '') +
      curdate.getUTCMinutes(),
  };
};
