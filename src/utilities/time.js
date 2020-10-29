export function getDayStart(at) {
  const date = new Date(at);
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return start.getTime();
}

export function getWeekStart(at) {
  const date = new Date(at);
  date.setDate(date.getDate() - date.getDay());
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

export function getWeek(at) {
  const dayOptions = {
    day: 'numeric',
    month: 'short',
  };

  const date = new Date(at);
  const dateStr = date.toLocaleString('en-us', dayOptions);

  return `Week of ${dateStr}`;
}

export function getMonth(at) {
  const dayOptions = {
    month: 'long',
    year: 'numeric',
  };

  const date = new Date(at);
  return date.toLocaleString('en-us', dayOptions);
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

export function getMonthsFrom(count, at) {
  const start = new Date(at);
  start.setMonth(start.getMonth() + count);

  return start.getTime();
}
