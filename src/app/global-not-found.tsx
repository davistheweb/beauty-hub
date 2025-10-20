import Redirect from "@/Redirect";

export default function Notfound() {
  return (
    <html>
      <body>
        <Redirect url="dashboard" />
      </body>
    </html>
  );
}
