import { json, type MetaFunction } from "@remix-run/node";
import { Route } from "./+types";
import { getSession } from "~/services/session.server";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { Ticket, User } from "~/types";
import Admin from "components/Admin";
import Customer from "components/Customer";
import { findAllTickets, findAllUsers } from "~/services/services";

export type LoaderData = {
  user: User;
  tickets: Ticket[];
  users: User[];
};

export const meta: MetaFunction = () => {
  return [
    { title: "Complaint Management System" },
    { name: "CMS", content: "Welcome to EFoli!" },
  ];
};

export default function Index() {
  const loaderData = useLoaderData<LoaderData>();
  const user = loaderData.user;
  const navigate = useNavigate();
  const isAdmin = user.role === "admin";

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isAdmin ? (
        <Admin user={user} />
      ) : (
        <Customer
          user={user}
          users={loaderData.users}
          tickets={loaderData.tickets}
        />
      )}
    </div>
  );
}

export async function loader({ request }: Route["LoaderArgs"]) {
  const session = await getSession(request);
  const user = session.get("user");
  const tickets = await findAllTickets();
  const users = await findAllUsers();
  return json({ user, tickets, users });
}
