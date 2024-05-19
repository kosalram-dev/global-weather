export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getUTCHours();
  const mins = date.getUTCMinutes();

  const hour = String(hours).padStart(2, '0');
  const minute = String(mins).padStart(2, '0');
  return `${hour}:${minute}`;
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const utcDay = date.getDate();
  const utcMonth = date.getMonth() + 1;
  const utcYear = date.getFullYear();
  const hours = date.getUTCHours();
  const mins = date.getUTCMinutes();

  const utcDayName = date.toLocaleDateString('en-US', {
    weekday: 'short',
  });

  // Format the date components with leading zeros if needed
  const day = String(utcDay).padStart(2, '0');
  const month = String(utcMonth).padStart(2, '0');
  const hour = String(hours).padStart(2, '0');
  const minute = String(mins).padStart(2, '0');
  const year = utcYear;

  // Return the formatted date string
  return `${utcDayName}, ${day}.${month}.${year}, ${hour}:${minute}`;
};

export const roundOff = (value: number) => value.toFixed(0);
