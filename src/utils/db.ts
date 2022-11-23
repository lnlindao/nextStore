import { Pool } from "pg";

let conn: any;

if (!conn) {
  conn = new Pool({
    user: "postgres",
    password: "rbk180592",
    host: "localhost",
    port: 5432,
    database: "storenext",
  });
}

export { conn };
