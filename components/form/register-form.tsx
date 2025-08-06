"use client";

import { registerUser } from "@/server/actions/authController";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const RegisterForm = () => {
  const [formState, formAction] = useActionState(registerUser, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (formState.message && !formState.success) {
      toast.error(formState.message);
    } 
    
    if (formState.success) {
      toast.success(formState.message);
    }
  }, [formState?.message, formState?.success]);

  return (
    <form action={formAction} className="space-y-3 w-[80%] mx-auto mt-6">
      <div className="space-y-1">
        <Input
          autoComplete="email"
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
          autoComplete="new-password"
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

export default RegisterForm;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  );
}
