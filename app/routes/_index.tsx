import type { MetaFunction } from "@remix-run/node";
import { Button } from "@shopify/polaris";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button>Complaint Management System</Button>
    </div>
  );
}
