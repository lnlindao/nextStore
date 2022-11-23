import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../utils/db";

type Data = {
  hora: string;
};

export default async function test(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await conn.query("SELECT NOW()");
  return res.json({ hora: response.rows[0].now });
}
