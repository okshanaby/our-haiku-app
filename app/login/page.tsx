import LoginForm from "@/components/form/login-form";

function LoginPage() {
  return (
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-center min-h-">
        <div className="w-full max-w-md">
            <h1 className="text-3xl text-center">Login with your Email and Password</h1>
            <LoginForm />
          </div>
        
      </div>
    </div>
  );
}

export default LoginPage;
