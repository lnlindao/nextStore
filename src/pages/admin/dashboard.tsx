import { useSession } from "next-auth/react";
import React from "react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  return <div>Pagina protegida</div>;
}
