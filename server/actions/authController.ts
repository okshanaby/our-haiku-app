"use server";

import { cookies } from "next/headers";
import { getCollection } from "../lib/db";
import { comparePassword, createToken, hashPassword } from "../modules/auth";
import { userRegistrationFormSchema } from "../modules/validations";

type Response = {
  success?: boolean;
  status?: number;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export const registerUser = async (
  prevState: any,
  formData: any
): Promise<Response> => {
  const email = formData.get("email");
  const password = formData.get("password");

  const inputUser = { email, password };

  try {
    // validate user inputs
    const results = userRegistrationFormSchema.safeParse(inputUser);

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

    // check user if exist
    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ email: inputUser.email });

    if (user) {
      return {
        success: false,
        message: "User already exist! Please login",
      };
    }

    // hash password
    inputUser.password = await hashPassword(inputUser.password);

    // store new user to db
    const newUser = await usersCollection.insertOne(inputUser);
    const userId = newUser.insertedId.toString();

    // create token
    const token = createToken({ email: inputUser.email, id: userId });

    // login the user with a cookie
    (await cookies()).set(process.env.APP_NAME!, token, {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), //  7 day from now
      secure: true,
    });

    return {
      success: true,
      message: "User created",
    };
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);

    return {
      success: false,
      message: "Please try again",
    };
  }
};

export const logoutUser = async () => {
  (await cookies()).delete(process.env.APP_NAME!);

  // return {
  //   success: true,
  //   message: "Logged out successfully",
  // };
};

export const loginUser = async (
  prevState: any,
  formData: any
): Promise<Response> => {
  const email = formData.get("email");
  const password = formData.get("password");

  const inputUser = { email, password };

  try {
    // validate user inputs
    const results = userRegistrationFormSchema.safeParse(inputUser);

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

    // check user if exist
    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ email: inputUser.email });

    if (!user) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    // compare password
    const passwordMatched = await comparePassword(
      inputUser.password,
      user.password
    );

    if (!passwordMatched) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }
    const userId = user._id.toString();

    // create token
    const token = createToken({ email: inputUser.email, id: userId });

    // login the user with a cookie
    (await cookies()).set(process.env.APP_NAME!, token, {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), //  7 day from now
      secure: true,
    });

    return {
      success: true,
      message: "Welcome Back",
    };
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);

    return {
      success: false,
      message: "Please try again",
    };
  }
};
