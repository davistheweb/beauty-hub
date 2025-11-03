export default function maskMail(email: string): string {
  const [local, domain] = email.split("@");

  if (local.length <= 4) {
    return local[0] + "**@" + domain;
  }

  const start = local.slice(0, 4);
  const end = local.slice(-3);

  return `${start}****${end}@${domain}`;
}
