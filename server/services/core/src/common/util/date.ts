import { BasicDate } from '../type';

export function strToDate({ year, month, day }: BasicDate) {
  return new Date(year, month, day);
}

export function dateToDict(date: Date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay(),
  };
}

export function getToday() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`;
}

export function isToday({ year, month, day }: BasicDate) {
  const today = new Date();
  const isYear = year === today.getFullYear();
  const isMonth = month === today.getMonth();
  const isDay = day === today.getDay();
  return isYear && isMonth && isDay;
}

export function getDate({ year, month, day, hour, minute }) {
  return new Date(year, month, day, hour, minute, 0);
}

export function minusMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() - minutes * 60000);
}

export function dateToCron(date: Date) {
  const minute = date.getMinutes();
  const hour = date.getHours();
  const day = date.getDay();
  const month = date.getMonth();
  return `0 ${minute} ${hour} ${day} ${month} *`;
}
