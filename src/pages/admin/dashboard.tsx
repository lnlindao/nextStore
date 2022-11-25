import { useSession } from "next-auth/react";

import React from "react";
import LayoutAdmin from "src/components/admin/Layout";

export default function AdminDashboard() {
  const { data: session } = useSession();
  console.log("session", session);
  //const session = await getSession({ req });

  return (
    <LayoutAdmin>
      <section>
        {session && session.user?.role === "admin"
          ? "Bienvenido"
          : "Inicie sesion"}
      </section>
    </LayoutAdmin>
  );
}
