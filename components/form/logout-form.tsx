import { logoutUser } from "@/server/actions/authController";
import { Button } from "../ui/button";

const LogOutForm = () => {
  return (
    <form action={logoutUser}>
      <Button variant="outline" className="border-red-300 hover:border-red-200 text-red-500 hover:text-red-500">Log Out</Button>
    </form>
  );
};

export default LogOutForm;
