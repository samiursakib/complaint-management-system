import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { User } from "../types";
import login from "./login";

export const authenticator = new Authenticator<User>();

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    return await login(email, password);
  }),
  "user-pass"
);
