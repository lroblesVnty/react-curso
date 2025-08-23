//**esto se puede omitir si se usa el datepicker de MUI, ya que el formato se puede manejar con una biblioteca(momentjs)
export const formatDateLocal = (value) => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return null;

  const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '-');

  return formattedDate;
};
