import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/db";

export default async function productId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const text = "SELECT * FROM products WHERE id = $1";
        const values = [query.id];
        const response = await conn.query(text, values);
        if (response.rows.length === 0) {
          return res.status(404).json("No hay coincidencias");
        }
        return res.json(response.rows[0]);
      } catch (error) {
        console.log(req.query);
        return res.json({ respuesta: "id unico" });
      }
    case "DELETE":
      try {
        const text = "DELETE FROM products WHERE id = $1 RETURNING *";
        const values = [query.id];
        const response = await conn.query(text, values);
        console.log(response);
        if (response.rowCount === 0) {
          return res.status(404).json("No hay coincidencias");
        }
        return res.status(200).json(response.rows[0]);
      } catch (error: any) {
        console.log(req.query);
        return res.status(500).json({ error });
      }
    case "PUT":
      try {
        const { name, summary, price, image } = body;
        const text =
          "UPDATE products SET name = $1, summary = $2,price=$3, image=$4  WHERE id = $5 RETURNING *";
        const values = [name, summary, price, image, query.id];
        const response = await conn.query(text, values);
        console.log("put", response);
        if (response.rowCount === 0) {
          return res.status(404).json("No hay coincidencias");
        }
        return res.status(200).json(response.rows[0]);
      } catch (error: any) {
        console.log(req.query);
        return res.status(500).json({ error });
      }
    default:
      res.status(404).json("Metodo no disponible");
      break;
  }
}
