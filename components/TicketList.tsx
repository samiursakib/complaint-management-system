import {
  Avatar,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
} from "@shopify/polaris";
import { Ticket } from "../app/types";
import { ReturnIcon, EditIcon, DeleteIcon } from "@shopify/polaris-icons";

const TicketList = ({
  list,
  hideReplyButton = false,
  handleEditTicket,
  handleDeleteTicket,
}: {
  list: Ticket[];
  hideReplyButton?: boolean;
  handleEditTicket: (ticket: Ticket) => void;
  handleDeleteTicket: (ticketId: number) => void;
}) => {
  return (
    <BlockStack gap="300">
      {list.map((t: Ticket) => (
        <Card key={t.id}>
          <div className="flex flex-row" style={{ gap: "1rem" }}>
            <div className="h-10 w-10">
              <Avatar
                size="lg"
                // name={user.full_name}
              />
            </div>
            <Box width="100%">
              <p>{t.subject}</p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "gray",
                  marginBottom: "0.8rem",
                }}
              >
                {t.description}
              </p>
              <InlineStack align="end">
                <ButtonGroup>
                  {!hideReplyButton ? (
                    <Button
                      icon={ReturnIcon}
                      onClick={() => {
                        console.log("replying");
                      }}
                    />
                  ) : null}
                  <Button icon={EditIcon} onClick={() => handleEditTicket(t)} />
                  <Button
                    icon={DeleteIcon}
                    onClick={() => handleDeleteTicket(t.id!)}
                  />
                </ButtonGroup>
              </InlineStack>
            </Box>
          </div>
        </Card>
      ))}
    </BlockStack>
  );
};

export default TicketList;
