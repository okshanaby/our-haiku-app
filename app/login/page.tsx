import LoginForm from "@/components/form/login-form";

function LoginPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center">
        {
          <div className="">
            <h1 className="text-3xl">Login with your Email and Password</h1>
            <LoginForm />
          </div>
        }
      </div>
    </div>
  );
}

export default LoginPage;
