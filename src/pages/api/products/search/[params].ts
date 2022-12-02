import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../_base";

export default async function productByColor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        console.log("PRODUCT BY COLOR");
        const { params } = query;
        console.log("params", params);
        const product = await prisma.products.findMany({
          include: {
            stock: {
              include: {
                colors: true,
                where: {
                  name: params,
                },
              },
            },
          },
        });
        console.log("api/products/id", product);
        return product
          ? res.status(200).json(product)
          : res.status(400).json("No se encontraron coincidencias");
      } catch (error) {
        return res.json({ respuesta: error });
      }

    default:
      res.status(404).json("Metodo no disponible");
      break;
  }
}
