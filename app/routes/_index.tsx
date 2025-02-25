import { json, type MetaFunction } from "@remix-run/node";
import { Button } from "@shopify/polaris";
import { Route } from "./+types";
import { getSession } from "~/services/session.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const user = useLoaderData();
  console.log(user);
  return (
    <div className="flex h-screen items-center justify-center">
      <Button>Complaint Management System</Button>
    </div>
  );
}

export async function loader({ request }: Route["LoaderArgs"]) {
  const session = await getSession(request);
  const user = session.get("user");
  return json(user);
}
