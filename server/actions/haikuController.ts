"use server";

import { ObjectId } from "mongodb";
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

const sharedHaikuLogic = async (formData: any) => {
  await isAuthentic();

  const line1 = formData.get("line1");
  const line2 = formData.get("line2");
  const line3 = formData.get("line3");

  const inputHaiku = { line1, line2, line3 };

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

  return {
    success: true,
    message: "Haiku created",
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
      .sort("asc")
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
    // await haikusCollection.insertOne(inputHaiku);

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
    const user = await isAuthentic();

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
      data: { ...haiku },
    };
  } catch (error) {
    console.log("🚀 ~ getHaikuById ~ error:", error);

    return {
      success: false,
      message: "Please try again",
    };
  }
}
