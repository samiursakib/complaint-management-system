import { json, type MetaFunction } from "@remix-run/node";
import { Button } from "@shopify/polaris";
import { Route } from "./+types";
import { getSession } from "~/services/session.server";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Complaint Management System" },
    { name: "CMS", content: "Welcome to EFoli!" },
  ];
};

export default function Index() {
  const user = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
