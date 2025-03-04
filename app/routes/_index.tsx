import { json, redirect, type MetaFunction } from "@remix-run/node";
import { Route } from "./+types";
import { getSession, sessionStorage } from "~/services/session.server";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { Ticket, User } from "~/types";
import Admin from "components/Admin";
import Customer from "components/Customer";
import {
  findAllTickets,
  findAllTicketsOfUser,
  findAllUsers,
} from "~/services/services";
import { Toaster } from "react-hot-toast";
import { Badge, Button, Card, Page } from "@shopify/polaris";
import { ExitIcon, ProfileIcon } from "@shopify/polaris-icons";

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

  useEffect(() => {
    document.body.style.background = "white";
  }, []);

  if (!user) return null;

  const isAdmin = user.role === "admin";

  console.log(user);

  return (
    <>
      <Toaster />
      <Page>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Button variant="plain" icon={ProfileIcon} />
              <span className="text-lg font-semibold">{user.full_name}</span>
              {isAdmin ? <Badge>Admin</Badge> : null}
            </div>
            <Form method="post">
              <Button submit tone="critical" icon={ExitIcon}>
                Signout
              </Button>
            </Form>
          </div>
        </Card>
      </Page>
      {isAdmin ? (
        <Admin tickets={loaderData.tickets} />
      ) : (
        <Customer
          user={user}
          users={loaderData.users}
          tickets={loaderData.tickets}
        />
      )}
    </>
  );
}

export async function action({ request }: Route["ActionArgs"]) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
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
