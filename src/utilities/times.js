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
