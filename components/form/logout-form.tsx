import { logoutUser } from "@/server/actions/authController";
import { Button } from "../ui/button";

const LogOutForm = () => {
  return (
    <form action={logoutUser}>
      <Button variant="outline">Log Out</Button>
    </form>
  );
};

export default LogOutForm;
