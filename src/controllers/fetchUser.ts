import { Response, Request } from "express";
import { getUserService } from "../services/userService";

export async function GetUSer(req: Request, res: Response) {
  const userId = (req as any).user;
  const user = await getUserService(userId.id);
  res.status(200).json({
    message: "User Check is sukses",
    data: { user },
  });
}
