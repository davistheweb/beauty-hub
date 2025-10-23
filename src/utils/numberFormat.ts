export default function numberFormat(number: number) {
  if (number === null || number === undefined) return "0.00";

  const formattedNumber = Number(number.toFixed(2)).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedNumber;
}
