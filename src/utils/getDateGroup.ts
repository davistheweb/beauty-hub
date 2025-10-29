import { isToday, isYesterday, parseISO } from "date-fns";

export const getDateGroup = (dateString: string) => {
  const date = parseISO(dateString.replace(" ", "T"));

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return "Other days";
};

// export const getDateGroup = (dateString: string) => {
//   const convertedDateString = dateString.replace(" ", "T");

//   const date = new Date(convertedDateString);

//   const now = new Date();

//   const oneDay = 24 * 60 * 60 * 1000;

//   const diff = now.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0);

//   if (diff === 0) return "Today";

//   if (diff === oneDay) return "Yesterday";

//   return "Other days";
// };
