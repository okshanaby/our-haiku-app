import { getUserFromCookie } from "@/server/modules/auth";
import Link from "next/link";
import LogOutForm from "../form/logout-form";
import { Button } from "../ui/button";

async function Header() {
  const user = await getUserFromCookie();

  return (
    <header className="bg-gray-100 shadow py-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-end gap-12">

        <Link href="/" className="font-bold text-4xl ">
          OurHaikuApp
        </Link>
        
         <Link href="/dashboard" className="pb-1 underline underline-offset-2">
          Dashboard
        </Link>
        </div>

        <div className="flex gap-2 items-center">
          {user ? (
            <>
              <Button asChild>
                <Link href="/create-haiku">Create Haiku</Link>
              </Button>
              <LogOutForm />
            </>
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
