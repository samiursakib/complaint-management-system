import { Form } from "@remix-run/react";
import {
  EmptyState,
  Layout,
  LegacyCard,
  Page,
  ResourceList,
  Modal,
  BlockStack,
  TextField,
  Select,
  Button,
} from "@shopify/polaris";
import { FormEvent, useState } from "react";
import { LoaderData } from "../app/routes/_index";
import {
  deleteTicket,
  findAllTicketsOfUser,
  upsertTicket,
} from "../app/services/services";
import toast from "react-hot-toast";
import { Ticket } from "~/types";
import { PlusIcon } from "@shopify/polaris-icons";
import TicketList from "./TicketList";

const Customer = ({ user, tickets, users }: LoaderData) => {
  const possibleExecutives = users.filter((u) => u.id !== user.id);
  const [formData, setFormData] = useState<Ticket>({
    id: null,
    subject: "",
    description: "",
    executive: possibleExecutives[0].id,
  });
  const [updatedTickets, setUpdatedTickets] = useState<Ticket[]>(tickets);
  const [createTicketModalActive, setCreateTicketModalActive] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const refinedFormData = {
      ...formData,
      id: formData.id,
      customer: user.id,
      executive: Number(formData.executive),
      isInEditMode,
    };
    const result = await upsertTicket(refinedFormData);
    if (result.success) {
      toast.success(result.message);
      if (isInEditMode) {
        setIsInEditMode(false);
      }
      setCreateTicketModalActive(false);
      const newTickets = await findAllTicketsOfUser(user.id);
      setUpdatedTickets(newTickets);
      setFormData({
        id: null,
        subject: "",
        description: "",
        executive: possibleExecutives[0].id,
      });
    } else {
      toast.error(result.message);
    }
  };

  const emptyStateMarkup = !updatedTickets.length ? (
    <EmptyState
      heading="Place complaints to get started"
      action={{
        content: "Create ticket",
        onAction: () => {
          setCreateTicketModalActive(true);
        },
      }}
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p>You can place complaints about your experience with us.</p>
    </EmptyState>
  ) : undefined;

  const handleEditTicket = (ticket: Ticket) => {
    setCreateTicketModalActive(true);
    setIsInEditMode(true);
    setFormData({
      id: ticket.id,
      subject: ticket.subject,
      description: ticket.description,
      executive: ticket.executive,
    });
  };

  const handleDeleteTicket = async (ticketId: number) => {
    const result = confirm("Are you sure you want to delete this ticket?");
    if (result) {
      const result = await deleteTicket(ticketId);
      if (result.success) {
        toast.success(result.message);
        const newTickets = await findAllTicketsOfUser(user.id);
        setUpdatedTickets(newTickets);
      } else {
        toast.error("Ticket deletion failed");
      }
    }
  };

  return (
    <div>
      <Page
        title="Your Complaints"
        primaryAction={
          <Button
            onClick={() => setCreateTicketModalActive(true)}
            icon={PlusIcon}
          >
            Create
          </Button>
        }
      >
        <TicketList
          list={updatedTickets}
          hideReplyButton
          hideMarkButton
          handleEditTicket={handleEditTicket}
          handleDeleteTicket={handleDeleteTicket}
        />
      </Page>

      <Page>
        <Layout>
          <Layout.Section>
            <LegacyCard>
              <ResourceList
                emptyState={emptyStateMarkup}
                items={updatedTickets}
                renderItem={() => <></>}
                // filterControl={filterControl}
                resourceName={{ singular: "ticket", plural: "tickets" }}
              />
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>

      <Modal
        activator={<></>}
        open={createTicketModalActive}
        onClose={() => {
          setCreateTicketModalActive(false);
          setIsInEditMode(false);
          setFormData({
            id: null,
            subject: "",
            description: "",
            executive: possibleExecutives[0].id,
          });
        }}
        title="Provide necessary details"
        primaryAction={{
          content: isInEditMode ? "Save" : "Create ticket",
          onAction: () =>
            document
              .getElementById("createTicketForm")
              ?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              ),
        }}
      >
        <Modal.Section>
          <Form id="createTicketForm" onSubmit={handleSubmit}>
            <BlockStack gap={"300"}>
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
                value={formData.executive.toString()}
                onChange={(value) => {
                  handleChange("executive", value);
                }}
                options={possibleExecutives.map((u) => ({
                  label: u.full_name,
                  value: u.id.toString(),
                }))}
              />
            </BlockStack>
          </Form>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default Customer;
