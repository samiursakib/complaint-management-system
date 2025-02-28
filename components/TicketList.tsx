import {
  ActionList,
  Avatar,
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  Popover,
  Text,
  TextField,
} from "@shopify/polaris";
import { Ticket } from "../app/types";
import {
  ReturnIcon,
  EditIcon,
  DeleteIcon,
  CheckIcon,
} from "@shopify/polaris-icons";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { findAllTickets, replyTicket } from "../app/services/services";
import toast from "react-hot-toast";
import moment from "moment";

const TicketItem = ({
  t,
  hideReplyButton,
  hideEditButton,
  hideDeleteButton,
  hideMarkButton,
  handleEditTicket,
  handleDeleteTicket,
  handleMarkTicket,
  setUpdatedTickets,
}: {
  t: Ticket;
  hideReplyButton?: boolean;
  hideEditButton?: boolean;
  hideDeleteButton?: boolean;
  hideMarkButton?: boolean;
  handleEditTicket?: (t: Ticket) => void;
  handleDeleteTicket?: (id: number) => void;
  handleMarkTicket?: (id: number, status: string) => void;
  setUpdatedTickets: Dispatch<SetStateAction<Ticket[]>>;
}) => {
  const [isActionListActive, setIsActionListActive] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [feedback, setFeedback] = useState("");

  const toggleActionListActive = useCallback(
    () => setIsActionListActive((isActionListActive) => !isActionListActive),
    []
  );

  const handleReply = async (ticketId: number) => {
    if (feedback === "") {
      setIsReplying(false);
      return;
    }
    const payload = {
      ticketId,
      feedback,
    };
    const result = await replyTicket(payload);
    if (result.success) {
      toast.success(result.message);
      setIsReplying(false);
      setFeedback("");
      const newTickets = await findAllTickets();
      setUpdatedTickets(newTickets);
    } else {
      toast.error("Sending reply failed");
    }
  };

  return (
    <Card key={t.id}>
      <div className="flex flex-row" style={{ gap: "1rem" }}>
        <div className="h-10 w-10">
          <Avatar
            size="lg"
            // name={user.full_name}
          />
        </div>
        <Box width="100%">
          <InlineStack>
            <Text as="h3" fontWeight="semibold">
              {t.full_name ?? "You"}
            </Text>
            <>
              <span style={{ margin: "0 0.5rem" }}>-</span>
              <Text as="span" tone="subdued">
                {moment(t.created_at).fromNow()}
              </Text>
            </>
          </InlineStack>
          <div style={{ display: "flex", gap: "0.8rem" }}>
            <span>{t.subject}</span>
            <Badge
              size="small"
              progress={t.status === "Open" ? "incomplete" : "complete"}
              tone={
                t.status === "Open"
                  ? "attention"
                  : t.status === "Resolved"
                  ? "success"
                  : "info"
              }
            >
              {t.status}
            </Badge>
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "gray",
              marginBottom: "0.8rem",
            }}
          >
            {t.description}
          </div>
          {!isReplying && t.feedback ? (
            <div style={{ display: "flex", gap: "1rem" }}>
              <div className="h-10 w-10">
                <Avatar size="sm" />
              </div>
              <div style={{ fontSize: "0.8rem", color: "gray" }}>
                {t.feedback}
              </div>
            </div>
          ) : null}
          {isReplying ? (
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ flexGrow: 1 }}>
                <TextField
                  label="Reply"
                  labelHidden
                  placeholder="Reply"
                  name="subject"
                  type="text"
                  autoComplete="text"
                  value={feedback}
                  onChange={(value) => setFeedback(value)}
                />
              </div>
              <Button icon={CheckIcon} onClick={() => handleReply?.(t.id!)} />
              <Button
                icon={DeleteIcon}
                onClick={() => {
                  setIsReplying(false);
                  setFeedback("");
                }}
              />
            </div>
          ) : null}
          <InlineStack align="end">
            <ButtonGroup>
              {!hideReplyButton ? (
                <Button icon={ReturnIcon} onClick={() => setIsReplying(true)} />
              ) : null}
              {!hideEditButton ? (
                <Button icon={EditIcon} onClick={() => handleEditTicket?.(t)} />
              ) : null}
              {!hideDeleteButton ? (
                <Button
                  icon={DeleteIcon}
                  onClick={() => handleDeleteTicket?.(t.id!)}
                />
              ) : null}
              {!hideMarkButton ? (
                <Popover
                  active={isActionListActive}
                  activator={
                    <Button disclosure onClick={toggleActionListActive}>
                      Mark as
                    </Button>
                  }
                  autofocusTarget="first-node"
                  onClose={toggleActionListActive}
                >
                  <ActionList
                    actionRole="menuitem"
                    items={[
                      {
                        content: "Resolved",
                        onAction: () => handleMarkTicket?.(t.id!, "Resolved"),
                      },
                      {
                        content: "Closed",
                        onAction: () => handleMarkTicket?.(t.id!, "Closed"),
                      },
                    ]}
                  />
                </Popover>
              ) : null}
            </ButtonGroup>
          </InlineStack>
        </Box>
      </div>
    </Card>
  );
};

const TicketList = ({
  list,
  hideReplyButton = false,
  hideEditButton = false,
  hideDeleteButton = false,
  hideMarkButton = false,
  handleEditTicket,
  handleDeleteTicket,
  handleMarkTicket,
  setUpdatedTickets,
}: {
  list: Ticket[];
  hideReplyButton?: boolean;
  hideEditButton?: boolean;
  hideDeleteButton?: boolean;
  hideMarkButton?: boolean;
  handleMarkTicket?: (id: number, status: string) => void;
  handleEditTicket?: (ticket: Ticket) => void;
  handleDeleteTicket?: (ticketId: number) => void;
  setUpdatedTickets?: Dispatch<SetStateAction<Ticket[]>>;
}) => {
  return (
    <BlockStack gap="300">
      {list.map((t: Ticket) => (
        <TicketItem
          key={t.id}
          t={t}
          hideReplyButton={hideReplyButton}
          hideEditButton={hideEditButton}
          hideDeleteButton={hideDeleteButton}
          hideMarkButton={hideMarkButton}
          handleEditTicket={handleEditTicket}
          handleDeleteTicket={handleDeleteTicket}
          handleMarkTicket={handleMarkTicket}
          setUpdatedTickets={setUpdatedTickets!}
        />
      ))}
    </BlockStack>
  );
};

export default TicketList;
