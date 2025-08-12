"use client";

import { createHaiku, editHaiku } from "@/server/actions/haikuController";
import { CldUploadWidget } from "next-cloudinary";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type HaikuFormProps = {
  action?: "edit" | "create";
  haiku?: {
    success: boolean;
    message?: string;
    data?: {
      _id: string;
      line1: string;
      line2: string;
      line3: string;
    };
  };
};

const HaikuForm = ({ action = "create", haiku }: HaikuFormProps) => {
  const pageAction = action === "edit" ? editHaiku : createHaiku;
  const [public_id, setPublic_id] = useState("");
  const [signature, setSignature] = useState("");
  const [version, setVersion] = useState("");

  const [formState, formAction] = useActionState(pageAction, {
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
          name="haikuId"
          type="string"
          hidden
          defaultValue={haiku ? haiku.data!._id : ""}
        />

        <Input
          name="line1"
          type="string"
          placeholder="Line #1"
          className={formState.errors?.line1 && "border-red-500"}
          defaultValue={haiku ? haiku.data!.line1 : ""}
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
          defaultValue={haiku ? haiku.data!.line2 : ""}
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
          defaultValue={haiku ? haiku.data!.line3 : ""}
        />

        {formState.errors?.line3 &&
          formState.errors?.line3.map(err => (
            <div className="text-red-500" key={err}>
              <small>{err}</small>
              <br />
            </div>
          ))}
      </div>

      <div className="">
        <Input name="public_id" type="hidden" hidden value={public_id} />
        <Input name="signature" type="hidden" hidden value={signature} />
        <Input name="version" type="hidden" hidden value={version} />

        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-image"
          onQueuesEnd={(_, { widget }) => {
            widget.close();
          }}
          onSuccess={results => {
            // @ts-expect-error: missing types from the package
            setPublic_id(results?.info?.public_id); // @ts-expect-error: missing types from the package
            setVersion(results?.info?.version); // @ts-expect-error: missing types from the package
            setSignature(results?.info?.signature);
          }}
        >
          {({ open }) => {
            return (
              <Button
                type="button"
                className="bg-blue-500"
                onClick={() => open()}
              >
                Upload an Image
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
      <SubmitButton action={action} />
    </form>
  );
};

export default HaikuForm;

function SubmitButton({ action = "create" }: HaikuFormProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {action === "create"
        ? pending
          ? "Creating..."
          : "Create"
        : pending
        ? "Editing..."
        : "Edit"}
    </Button>
  );
}
