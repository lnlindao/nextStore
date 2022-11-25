import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { prisma } from "../_base";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: Session | null = await getSession({ req });
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const products = await prisma.products.findMany();
        console.log("products", products);
        return products?.length
          ? res.status(200).json(products)
          : res.status(400).json("No se encontraron productos");
      } catch (error) {
        return res.status(400).json({ error });
      }

    case "POST":
      break;

    case "PUT":
      return res.json({ respuesta: "actualizar producto" });

    case "DELETE":
      return res.json({ respuesta: "eliminar producto" });

    default:
      return res.status(405).json({ respuesta: "Metodo no disponible" });
  }
}
