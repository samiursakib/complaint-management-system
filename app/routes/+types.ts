import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export type Route = {
  LoaderArgs: LoaderFunctionArgs;
  ActionArgs: ActionFunctionArgs;
};
