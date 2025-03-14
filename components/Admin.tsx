import {
  EmptyState,
  Layout,
  LegacyCard,
  Page,
  ResourceList,
} from "@shopify/polaris";
import { Ticket } from "../app/types";
import TicketList from "./TicketList";
import { findAllTickets, markTicket } from "~/services/services";
import { useState } from "react";
import toast from "react-hot-toast";

const Admin = ({ tickets }: { tickets: Ticket[] }) => {
  const [updatedTickets, setUpdatedTickets] = useState<Ticket[]>(tickets);

  const handleMarkTicket = async (ticketId: number, status: string) => {
    const result = await markTicket(ticketId, status);
    if (result.success) {
      toast.success(result.message);
      const newTickets = await findAllTickets();
      setUpdatedTickets(newTickets);
    } else {
      toast.error("Ticket status update failed");
    }
  };

  const emptyStateMarkup = !updatedTickets.length ? (
    <EmptyState
      heading="View all complaints made by customers"
      action={undefined}
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p>
        All customers&apos; complaints about their experience will appear here.
      </p>
    </EmptyState>
  ) : undefined;

  return (
    <div>
      <Page title="Customers' Complaints">
        <TicketList
          list={updatedTickets}
          hideEditButton
          hideDeleteButton
          handleMarkTicket={handleMarkTicket}
          setUpdatedTickets={setUpdatedTickets}
        />
      </Page>
      <Page>
        <Layout>
          <Layout.Section>
            <LegacyCard>
              <ResourceList
                emptyState={emptyStateMarkup}
                items={updatedTickets}
                renderItem={() => null}
                resourceName={{ singular: "ticket", plural: "tickets" }}
              />
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
};

export default Admin;
