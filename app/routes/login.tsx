import { Button, Card, Divider, Text, TextField } from "@shopify/polaris";
import { useState } from "react";
import type { Route } from "./+types";
import { authenticator } from "../services/authenticator";
import { data, Form, redirect } from "@remix-run/react";
import { getSession, sessionStorage } from "../services/session.server";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <Text variant="headingLg" as="h1">
          Login
        </Text>
        <Divider />
        <Form method="post">
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(email: string) => setEmail(email)}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="password"
            value={password}
            onChange={(email: string) => setPassword(email)}
          />
          <Button submit>Login</Button>
        </Form>
      </Card>
    </div>
  );
}

export async function action({ request }: Route["ActionArgs"]) {
  const user = await authenticator.authenticate("user-pass", request);
  const session = await getSession(request);
  session.set("user", user);
  throw redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function loader({ request }: Route["LoaderArgs"]) {
  const session = await getSession(request);
  const user = session.get("user");
  if (user) {
    return redirect("/");
  }
  return data(null);
}
