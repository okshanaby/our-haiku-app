"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { getCollection } from "../lib/db";
import { isAuthentic } from "../modules/auth";
import { haikuFormSchema } from "../modules/validations";

type Response = {
  success?: boolean;
  status?: number;
  message?: string;
  errors?: {
    line1?: string[];
    line2?: string[];
    line3?: string[];
  };
};

export const createHaiku = async (
  prevState: any,
  formData: any
): Promise<Response> => {
  try {
    const user = await isAuthentic();

    const line1 = formData.get("line1");
    const line2 = formData.get("line2");
    const line3 = formData.get("line3");

    let authorId;
    // Ensure user is not a string and has id
    if (typeof user !== "string" && "id" in user) {
      authorId = user.id;
    } else {
      authorId = undefined;
      throw new Error("Invalid user payload");
    }

    const inputHaiku = {
      line1,
      line2,
      line3,
      author: ObjectId.createFromHexString(authorId),
    };

    // validate user inputs
    const results = haikuFormSchema.safeParse(inputHaiku);

    if (!results.success) {
      const errors: Record<string, string[]> = {};

      results.error.issues.forEach(err => {
        const field = String(err.path[0]);
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(err.message);
      });

      return { success: false, errors, message: "Invalid inputs" };
    }

    // save to db
    const haikusCollection = await getCollection("haikus");
    await haikusCollection.insertOne(inputHaiku);

    return {
      success: true,
      message: "Haiku created",
    };

    // await sharedHaikuLogic(formData)
  } catch (error) {
    console.log("🚀 ~ createHaiku ~ error:", error);

    return {
      success: false,
      message: "Please try again",
    };
  }
};

export async function getHaikus() {
  try {
    const user = await isAuthentic();

    // save to db
    const haikusCollection = await getCollection("haikus");
    const haikus = await haikusCollection // @ts-ignore
      .find({ author: ObjectId.createFromHexString(user.id) })
      .sort({ _id: -1 }) // Sort by newest first
      .toArray();

    return {
      success: true,
      data: haikus,
    };
  } catch (error) {
    console.log("🚀 ~ getHaikus ~ error:", error);

    return {
      success: false,
      message: "Please try again",
      data: [],
    };
  }
}

export const editHaiku = async (
  prevState: any,
  formData: any
): Promise<Response> => {
  try {
    const user = await isAuthentic();

    let haikuId = formData.get("haikuId") ?? "";
    const line1 = formData.get("line1");
    const line2 = formData.get("line2");
    const line3 = formData.get("line3");

    let authorId;
    // Ensure user is not a string and has id
    if (typeof user !== "string" && "id" in user) {
      authorId = user.id;
    } else {
      authorId = undefined;
      throw new Error("Invalid user payload");
    }

    const inputHaiku = {
      line1,
      line2,
      line3,
      author: ObjectId.createFromHexString(authorId),
    };

    // validate user inputs
    const results = haikuFormSchema.safeParse(inputHaiku);

    if (!results.success) {
      const errors: Record<string, string[]> = {};

      results.error.issues.forEach(err => {
        const field = String(err.path[0]);
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(err.message);
      });

      return { success: false, errors, message: "Invalid inputs" };
    }

    // check for the haiku
    const haikusCollection = await getCollection("haikus");
    const haikuInQuestion = await haikusCollection // @ts-ignore
      .findOne({ _id: ObjectId.createFromHexString(haikuId) });

    if (!haikuInQuestion) {
      return {
        success: false,
        message: "Haiku not found",
      };
    }

    // make sure you are the author of this post
    if (haikuInQuestion.author.toString() !== user.id) {
      return {
        success: false,
        message: "Can't edit, you are not the author",
      };
    }

    // update haiku
    await haikusCollection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(haikuId) },
      { $set: inputHaiku }
    );

    return {
      success: true,
      message: "Haiku edited",
    };
  } catch (error) {
    console.log("🚀 ~ editHaiku ~ error:", error);

    return {
      success: false,
      message: "Please try again",
    };
  }
};

export async function getHaikuById(id: string) {
  try {
    await isAuthentic();

    // check if haiku exist
    const haikusCollection = await getCollection("haikus");
    const haiku = await haikusCollection // @ts-ignore
      .findOne({ _id: ObjectId.createFromHexString(id) });

    haiku._id = haiku._id.toString();
    haiku.author = haiku.author.toString();

    if (!haiku) {
      return {
        success: false,
        message: "Haiku not found",
      };
    }

    return {
      success: true,
      data: haiku,
    };
  } catch (error) {
    console.log("🚀 ~ getHaikuById ~ error:", error);

    return {
      success: false,
      message: "Please try again",
    };
  }
}

export const deleteHaiku = async (formData: any) => {
  try {
    const id = formData.get("id");
    const user = await isAuthentic();

    // check for the haiku
    const haikusCollection = await getCollection("haikus");
    const haikuInQuestion = await haikusCollection // @ts-ignore
      .findOne({ _id: ObjectId.createFromHexString(id) });

    if (!haikuInQuestion) {
      redirect("/dashboard");
    }

    let authorId;
    // Ensure user is not a string and has id
    if (typeof user !== "string" && "id" in user) {
      authorId = user.id;
    } else {
      authorId = undefined;
      throw new Error("Invalid user payload");
    }

    // make sure you are the author of this post
    if (haikuInQuestion.author.toString() !== user.id) {
      redirect("/dashboard");
    }

    // update haiku
    await haikusCollection.deleteOne({ _id: ObjectId.createFromHexString(id) });

    redirect("/dashboard");
  } catch (error) {
    console.log("🚀 ~ deleteHaiku ~ error:", error);

    redirect("/dashboard");
  }
};
