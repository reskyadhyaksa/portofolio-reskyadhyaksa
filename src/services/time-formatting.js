import { parse, addHours, format } from 'date-fns';

const convertToWIB = (timeUTC) => {
  if (!timeUTC) return "";
  
  const utcDate = parse(timeUTC, 'HH:mm', new Date());
  const wibDate = addHours(utcDate, 7);
  
  return format(wibDate, 'HH:mm') + " WIB";
};