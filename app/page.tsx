import RegisterForm from "@/components/form/register-form";
import { getUserFromCookie } from "@/server/modules/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUserFromCookie();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center min-h-">
        {user ? (
          <div className="text-center text-lg">Hello Welcome.</div>
        ) : (
          <div className="w-full max-w-md">
            <h1 className="text-2xl sm:text-3xl text-center mb-6">
              Create an account?
            </h1>
            <RegisterForm />
          </div>
        )}
      </div>
    </div>
  );
}
