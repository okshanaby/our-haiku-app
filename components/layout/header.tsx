import { getUserFromCookie } from "@/server/modules/auth";
import Link from "next/link";
import LogOutForm from "../form/logout-form";
import { Button } from "../ui/button";

async function Header() {
  const user = await getUserFromCookie();

  return (
    <header className="bg-gray-100 shadow py-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-4xl ">
          OurHaikuApp
        </Link>

        <div className="flex gap-2 items-center">
          {user ? (
            <LogOutForm />
          ) : (
            <>
              <Button asChild variant="outline">
                <Link href="/" className="">
                  Register
                </Link>
              </Button>
              <Button asChild>
                <Link href="/login" className="">
                  Login
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
