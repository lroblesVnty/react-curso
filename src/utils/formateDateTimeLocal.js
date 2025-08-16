//**esto se puede omitir si se usa el datepicker de MUI, ya que el formato se puede manejar con una biblioteca(momentjs)
export const formatDateTimeLocal = (value) => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return null;

  const pad = (num) => String(num).padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
