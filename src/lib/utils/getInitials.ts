export const getInitials = (fullName: string, len: number = 3) =>
  fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, len);
