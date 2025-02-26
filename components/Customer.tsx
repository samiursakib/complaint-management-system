import { Form } from "@remix-run/react";
import { BlockStack, Button, Select, TextField } from "@shopify/polaris";
import { FormEvent, useState } from "react";
import { LoaderData } from "../app/routes/_index";
import { findAllTickets, postTicket } from "../app/services/services";
import toast from "react-hot-toast";

const Customer = ({ user, tickets, users }: LoaderData) => {
  const possibleExecutives = users.filter((u) => u.id !== user.id);
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    executive: possibleExecutives[0].id.toString(),
  });
  const [updatedTickets, setUpdatedTickets] = useState(tickets);

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const refinedFormData = {
      ...formData,
      customer: user.id,
      executive: Number(formData.executive),
    };
    const result = await postTicket(refinedFormData);
    console.log(result);
    if (result.success) {
      toast.success(result.message);
      setFormData({
        subject: "",
        description: "",
        executive: possibleExecutives[0].id.toString(),
      });
      const newTickets = await findAllTickets();
      setUpdatedTickets(newTickets);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Subject"
          name="subject"
          type="text"
          autoComplete="text"
          value={formData.subject}
          onChange={(value) => handleChange("subject", value)}
        />
        <TextField
          label="Description"
          name="description"
          type="text"
          autoComplete="text"
          value={formData.description}
          onChange={(value) => handleChange("description", value)}
        />
        <Select
          label="Executive"
          name="executive"
          value={formData.executive}
          onChange={(value) => {
            handleChange("executive", value);
            console.log(value);
          }}
          options={possibleExecutives.map((u) => ({
            label: u.full_name,
            value: u.id.toString(),
          }))}
        />
        <Button submit>Create</Button>
      </Form>

      <BlockStack>
        {updatedTickets.map((t) => (
          <div key={t.id}>
            <p>{t.subject}</p>
            <p>{t.description}</p>
          </div>
        ))}
      </BlockStack>
    </div>
  );
};

export default Customer;
