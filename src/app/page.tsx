import Redirect from "@/Redirect";
import Dashboard from "./dashboard/page";

export default function page() {
  return (
    <>
      <Redirect url="dashboard" />
      <Dashboard />
    </>
  );
}
