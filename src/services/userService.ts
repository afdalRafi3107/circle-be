import { prisma } from "../prisma/prisma";

export async function getUserService(id: number) {
  return await prisma.user.findFirst({
    where: { id },
    select: { id: true, username: true },
  });
}
