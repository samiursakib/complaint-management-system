import {
  EmptyState,
  Layout,
  LegacyCard,
  Page,
  ResourceList,
} from "@shopify/polaris";
import { Ticket, User } from "../app/types";

const Admin = ({ user, tickets }: { user: User; tickets: Ticket[] }) => {
  const emptyStateMarkup =
    // !appliedFilters.length &&
    !tickets.length ? (
      <EmptyState
        heading="Place complaints to get started"
        action={{
          content: "Create ticket",
          onAction: () => {},
        }}
        image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
      >
        <p>
          All customers&apos; complaints about their experience will appear
          here.
        </p>
      </EmptyState>
    ) : undefined;

  return (
    <div>
      <Page>
        <Layout>
          <Layout.Section>
            <LegacyCard>
              <ResourceList
                emptyState={emptyStateMarkup}
                items={tickets}
                renderItem={() => <></>}
                // filterControl={filterControl}
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
