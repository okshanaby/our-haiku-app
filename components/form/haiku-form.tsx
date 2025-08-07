"use client";

import { createHaiku } from "@/server/actions/haikuController";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const HaikuForm = () => {
  const [formState, formAction] = useActionState(createHaiku, {
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
    <form action={formAction} className="space-y-3 mx-auto mt-6">
      <div className="space-y-1">
        <Input
          name="line1"
          type="string"
          placeholder="Line #1"
          className={formState.errors?.line1 && "border-red-500"}
        />

        {formState.errors?.line1 &&
          formState.errors?.line1.map(err => (
            <div className="text-red-500" key={err}>
              <small>{err}</small>
              <br />
            </div>
          ))}
      </div>

      <div className="space-y-1">
        <Input
          name="line2"
          type="string"
          placeholder="Line #2"
          className={formState.errors?.line2 && "border-red-500"}
        />

        {formState.errors?.line2 &&
          formState.errors?.line2.map(err => (
            <div className="text-red-500" key={err}>
              <small>{err}</small>
              <br />
            </div>
          ))}
      </div>

      <div className="space-y-1">
        <Input
          name="line3"
          type="string"
          placeholder="Line #3"
          className={formState.errors?.line3 && "border-red-500"}
        />

        {formState.errors?.line3 &&
          formState.errors?.line3.map(err => (
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

export default HaikuForm;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create"}
    </Button>
  );
}
