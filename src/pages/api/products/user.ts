import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { prisma } from "../_base";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const session: Session | null = await getSession({ req });
  const { method, body } = req;

  if (method === "GET") {
    const users = await prisma.products.findMany({
      include: {
        stock: true,
      },
    });
    console.log("products", users);
    return res.json(users);
  } else {
  }
}
