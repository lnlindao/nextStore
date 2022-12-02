import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../_base";

export default async function productId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const { id } = query;

        const product = await prisma.products.findUnique({
          where: {
            id: id,
          },
          include: {
            categories: {
              select: {
                categorie: true,
              },
            },
            variations: {
              select: {
                quantity: true,
                variation: true,
              },
            },
          },
        });
        return product
          ? res.status(200).json(product)
          : res.status(400).json("No se encontraron coincidencias");
      } catch (error) {
        return res.json({ error: error });
      }

    default:
      res.status(404).json("Metodo no disponible");
      break;
  }
}
