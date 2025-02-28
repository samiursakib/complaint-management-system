import {
  BlockStack,
  Button,
  Card,
  Divider,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import type { Route } from "./+types";
import {
  data,
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
} from "@remix-run/react";
import { getSession, sessionStorage } from "../services/session.server";
import { authenticator } from "~/services/authenticator";
import toast from "react-hot-toast";

type ActionData = {
  success: boolean;
  message: string;
  sessionCookie?: string;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!actionData) return;
    if (actionData.success) {
      toast.success("Login successful", {
        duration: 2000,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setEmail("");
      setPassword("");
      setRole("customer");
      toast.error(actionData.message);
    }
  }, [actionData, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[300px]">
        <Card>
          <div className="mb-4">
            <Text variant="headingLg" as="h1" alignment="center">
              Login
            </Text>
          </div>
          <Divider />
          <div className="mb-4"></div>
          <Form method="post">
            <BlockStack gap="300">
              <TextField
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={setEmail}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                autoComplete="password"
                value={password}
                onChange={setPassword}
              />
              <Select
                label="Role"
                name="role"
                value={role}
                onChange={setRole}
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "Customer", value: "customer" },
                ]}
              />
              <Button submit>Login</Button>
            </BlockStack>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export async function action({ request }: Route["ActionArgs"]) {
  const user = await authenticator.authenticate("user-pass", request);
  const session = await getSession(request);
  if (!user) {
    return json({ success: false, message: "Invalid credentials" });
  }
  session.set("user", user);
  const sessionCookie = await sessionStorage.commitSession(session);
  return json(
    { success: true, message: "Login successful" },
    {
      headers: {
        "Set-Cookie": sessionCookie,
      },
    }
  );
}

export async function loader({ request }: Route["LoaderArgs"]) {
  const session = await getSession(request);
  const user = session.get("user");
  if (user) {
    return redirect("/");
  }
  return data(null);
}
