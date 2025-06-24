import { Request, Response, NextFunction } from "express";

import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  let token = req.headers["authorization"] || "";

  if (token.split(" ").length > 1) {
    token = token.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ message: "Token required" });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET || "";
  const user = jwt.verify(token, jwtSecret);

  if (!user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  (req as any).user = user;
  // res.json(user);
  // try {
  //   const decode = verifyToken(token) as JwtPayload;
  //   req.user = decode;
  //   next();
  // } catch (error) {
  //   res.status(401).json({ message: "invalid Token" });
  //   return;
  // }
  next();
}
