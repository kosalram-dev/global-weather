export const formatTime = (timestamp: number, timeZone: string) => {
  const date = new Date(timestamp * 1000);
  const formatter = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timeZone,
  });

  return formatter.format(date);
};

export const formatDate = (timestamp: number, timeZone: string) => {
  const date = new Date(timestamp * 1000);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timeZone,
  });

  return formatter.format(date);
};

export const roundOff = (value: number) => value.toFixed(0);
