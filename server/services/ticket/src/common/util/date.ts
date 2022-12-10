export function isToday(date: Date) {
  const today = new Date();
  const isYear = date.getFullYear() === today.getFullYear();
  const isMonth = date.getMonth() === today.getMonth();
  const isDay = date.getDay() === today.getDay();
  return isYear && isMonth && isDay;
}

export function getToday() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDay()}`;
}

export function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return `${tomorrow.getFullYear()}-${
    tomorrow.getMonth() + 1
  }-${tomorrow.getDay()}`;
}
