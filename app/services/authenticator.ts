import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { User } from "../types";
import { login } from "./services";

export const authenticator = new Authenticator<User>();

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const role = form.get("role") as string;
    return await login(email, password, role);
  }),
  "user-pass"
);
