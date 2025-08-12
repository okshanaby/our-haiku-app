"use client";

import { loginUser } from "@/server/actions/authController";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const LoginForm = () => {
  const [formState, formAction] = useActionState(loginUser, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (formState.message && !formState.success) {
      toast.error(formState.message);
    }

    if (formState.success) {
      toast.success(formState.message);
      redirect("/dashboard");
    }
  }, [formState?.message, formState?.success]);

  return (
    <form action={formAction} className="space-y-3  mx-auto mt-6">
      <div className="space-y-1">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          className={formState.errors?.email && "border-red-500"}
        />

        {formState.errors?.email &&
          formState.errors?.email.map(err => (
            <div className="text-red-500" key={err}>
              <small>{err}</small>
              <br />
            </div>
          ))}
      </div>

      <div className="space-y-1">
        <Input
          name="password"
          type="password"
          placeholder="Password"
          className={formState.errors?.password && "border-red-500"}
        />
        {formState.errors?.password &&
          formState.errors?.password.map(err => (
            <div className="text-red-500" key={err}>
              <small>{err}</small>
              <br />
            </div>
          ))}
      </div>

      <SubmitButton />
    </form>
  );
};

export default LoginForm;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Logging in..." : "Log In"}
    </Button>
  );
}
