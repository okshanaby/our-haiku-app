"use client";

import { Button } from "@/components/ui/button";
import { deleteHaiku } from "@/server/actions/haikuController";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export default function Haiku({ haiku, user }: { haiku: any; user: any }) {
  if (!haiku.photo) {
    haiku.photo = "samples/canvas";
  }

  return (
    <div className="relative rounded-xl overflow-hidden max-w-[650px] mx-auto mb-7">
      <img src="/aspect-ratio.png" />

      <div className="absolute inset-0 bg-gray-200 grid">
        <span className="loading loading-dots loading-lg m-auto"></span>
      </div>

      <CldImage
        className="absolute inset-0"
        width="650"
        height="300"
        fillBackground
        crop={{ type: "pad", source: true }}
        sizes="650px"
        src={haiku.photo}
        alt="Description of my image"
        overlays={[
          {
            position: {
              x: 34,
              y: 154,
              gravity: "north_west",
            },
            text: {
              color: "black",
              fontFamily: "Source Sans Pro",
              fontSize: 42,
              fontWeight: "bold",
              text: `${haiku.line1}%0A${haiku.line}%0A${haiku.line3}%0A`,
            },
          },
          {
            position: {
              x: 30,
              y: 150,
              gravity: "north_west",
            },
            text: {
              color: "white",
              fontFamily: "Source Sans Pro",
              fontSize: 42,
              fontWeight: "bold",
              text: `${haiku.line1}%0A${haiku.line}%0A${haiku.line3}%0A`,
            },
          },
        ]}
      />

      <div className="absolute bottom-2 right-1 flex">
        {/* @ts-ignore  */}
        {user.id === haiku.author.toString() && (
          <div className="flex items-center gap-2">
            <Button asChild size="sm">
              <Link href={`/edit-haiku/${haiku._id.toString()}`}>Edit</Link>
            </Button>
            <form action={deleteHaiku}>
              <input
                type="hidden"
                name="id"
                defaultValue={haiku._id.toString()}
              />
              <Button
                size="sm"
                className="text-white bg-red-500 hover:bg-red-400"
              >
                Delete
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
