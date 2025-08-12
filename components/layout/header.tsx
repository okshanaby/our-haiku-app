import { getUserFromCookie } from "@/server/modules/auth";
import Link from "next/link";
import LogOutForm from "../form/logout-form";
import { Button } from "../ui/button";

async function Header() {
  const user = await getUserFromCookie();

  return (
    <header className="bg-gray-100 shadow py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-12 w-full md:w-auto">
          <Link href="/" className="font-bold text-3xl md:text-4xl">
            OurHaikuApp
          </Link>
          <Link
            href="/dashboard"
            className="pb-1 underline underline-offset-2 text-base md:text-lg"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex gap-2 items-center w-full md:w-auto justify-center md:justify-end">
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
