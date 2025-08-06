import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
  return (
    <header className="bg-gray-100 shadow py-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-4xl ">
          OurHaikuApp
        </Link>

        <Button asChild>
          <Link href="/login" className="">
            Login
          </Link>
        </Button>
      </div>
    </header>
  );
}

export default Header;
