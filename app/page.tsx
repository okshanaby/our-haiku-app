import RegisterForm from "@/components/form/register-form";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center">
        <div className="">
          <h1 className="text-3xl">
            Don't have an account? <b>Create One</b>
          </h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
