import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const isAuthentic = async () => {
  const user = await getUserFromCookie();

  if (!user) {
    redirect("/login");
  } else {
    return user
  }
};

// export const validateUserInput = (
//   schema: ZodObject<{}, $strip>,
//   inputObject: any
// ) => {
//   const results = schema.safeParse(inputObject);

//   if (!results.success) {
//     const errors: Record<string, string[]> = {};

//     results.error.issues.forEach(err => {
//       const field = String(err.path[0]);
//       if (!errors[field]) {
//         errors[field] = [];
//       }
//       errors[field].push(err.message);
//     });

//     return { success: false, errors, message: "Invalid inputs" };
//   }
// };
