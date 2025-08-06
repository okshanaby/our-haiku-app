import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

export const createToken = (payload: { email: string; id: string }) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const getUserFromCookie = async () => {
  const token = (await cookies()).get(process.env.APP_NAME!)?.value;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      return decodedToken;
    } catch (error) {
      console.log("🚀 ~ getUserFromCookie ~ error:", error);
      return null;
    }
  }
};
