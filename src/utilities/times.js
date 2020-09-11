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

export function getTime(at) {
  const timeOptions = {
    hour: 'numeric',
    minute: '2-digit',
  };

  const date = new Date(at);
  return date.toLocaleString('en-us', timeOptions);
}
