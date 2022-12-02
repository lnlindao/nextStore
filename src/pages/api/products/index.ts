import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { prisma } from "../_base";
import { Products } from ".prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: Session | null = await getSession({ req });
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const { tamano } = query;
        console.log("query", query?.tamano);

        if (!query?.tamano) {
          console.log("entro sin params");
          const products = await prisma.products.findMany({
            include: {
              variations: {
                select: {
                  quantity: true,
                  variation: true,
                },
              },
              categories: {
                select: {
                  categorie: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          });
          return products?.length
            ? res.status(200).json(products)
            : res.status(400).json("No se encontraron productos");
        }
        if (query?.tamano) {
          console.log("entro con params", query?.tamano);

          const product = await prisma.products.findMany({
            /* where: {
              colors: {
                name: {
                  contains: color,
                  mode: "insensitive",
                },
              },
            },*/
            include: {
              variations: {
                where: {
                  variationName: tamano,
                },
                select: {
                  variationName: true,
                },
              },
              categories: {
                select: {
                  categorie: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          });
          return product
            ? res.status(200).json(product)
            : res.status(400).json("No se encontraron coincidencias");
        }
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
