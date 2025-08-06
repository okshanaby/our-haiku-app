import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

export const createToken = (payload: { email: string; id: string }) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
