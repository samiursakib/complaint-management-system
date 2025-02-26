import { Button } from "@shopify/polaris";
import { User } from "../app/types";

const Admin = ({ user }: { user: User }) => {
  console.log(user);
  return (
    <div>
      <Button>Admin</Button>
    </div>
  );
};

export default Admin;
