import jwt from "jsonwebtoken";
export const signToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "2d" });
};

// export const verifyToken = (token: string) => {
//   return jwt.verify(token, process.env.JWT_SECRET!);
// };
