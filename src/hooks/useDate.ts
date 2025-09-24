export const useDate = () => {
  const date = new Date();
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-GB", {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const customDate = `${day} ${month} ${year} | ${hours}:${minutes} ${ampm} GMT`;
  return { customDate };
};
