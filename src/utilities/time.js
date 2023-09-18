export function getDayStart(at) {
  const date = new Date(at);
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return start.getTime();
}

export function getWeekStart(at, offset = 0) {
  const date = new Date(at);
  date.setDate(date.getDate() - date.getDay() + offset * 7);
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return start.getTime();
}

export function getMonthStart(at, offset = 0) {
  const date = new Date(at);
  const start = new Date(date.getFullYear(), date.getMonth() + offset);
  return start.getTime();
}

export function getYearStart(at, offset = 0) {
  const date = new Date(at);
  const start = new Date(date.getFullYear() + offset, 0);
  return start.getTime();
}

export function getDate(at) {
  const dayOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const date = new Date(at);
  return date.toLocaleString('en-us', dayOptions);
}

export function getWeek(at, prefix = 'Week of ') {
  const dayOptions = {
    day: 'numeric',
    month: 'short',
  };

  const date = new Date(at);
  const dateStr = date.toLocaleString('en-us', dayOptions);

  return `${prefix}${dateStr}`;
}

export function getMonth(at, useShort) {
  const dayOptions = {
    month: useShort ? 'short' : 'long',
    year: 'numeric',
  };

  const date = new Date(at);
  return date.toLocaleString('en-us', dayOptions);
}

export function getYear(at) {
  const date = new Date(at);
  return `${date.getFullYear()}`;
}

export function getTime(at) {
  const timeOptions = {
    hour: 'numeric',
    minute: '2-digit',
  };

  const date = new Date(at);
  return date.toLocaleString('en-us', timeOptions);
}

export function getDays(count) {
  const oneDay = 1000 * 60 * 60 * 24;
  return count * oneDay;
}

export function inSameMonth(at0, at1) {
  const date0 = new Date(at0);
  const date1 = new Date(at1);

  return (date0.getMonth() === date1.getMonth());
}
