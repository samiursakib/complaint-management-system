import { json, type MetaFunction } from "@remix-run/node";
import { Route } from "./+types";
import { getSession } from "~/services/session.server";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { Ticket, User } from "~/types";
import Admin from "components/Admin";
import Customer from "components/Customer";
import {
  findAllTickets,
  findAllTicketsOfUser,
  findAllUsers,
} from "~/services/services";

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

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const isAdmin = user.role === "admin";

  return (
    <div>
      {isAdmin ? (
        <Admin user={user} tickets={loaderData.tickets} />
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
  const tickets =
    (user?.role === "admin"
      ? await findAllTickets()
      : await findAllTicketsOfUser(user?.id)) ?? [];
  const users = await findAllUsers();
  return json({ user, tickets, users });
}
