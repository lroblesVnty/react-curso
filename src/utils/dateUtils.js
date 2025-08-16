export const splitDateTime = (dateTime) => {
  if (!dateTime) return { date: '', time: '' };

  const [datePart, timePart] = dateTime.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);

  const pad = (n) => n.toString().padStart(2, '0');

  const date = `${pad(dateObj.getDate())}/${pad(dateObj.getMonth() + 1)}/${dateObj.getFullYear()}`;
  const time = `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}:${pad(dateObj.getSeconds())}`;

  return { date, time };
};
