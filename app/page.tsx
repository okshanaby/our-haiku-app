import RegisterForm from "@/components/form/register-form";
import { getUserFromCookie } from "@/server/modules/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUserFromCookie();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center">
        {user ? (
          <div>Hello Welcome.</div>
        ) : (
          <div className="">
            <h1 className="text-3xl">
              Don't have an account? <b>Create One</b>
            </h1>
            <RegisterForm />
          </div>
        )}
      </div>
    </div>
  );
}
