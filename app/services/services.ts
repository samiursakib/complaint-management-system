import { Ticket } from "~/types";

const backendUrl = "http://localhost:8080";

export const login = async (email: string, password: string, role: string) => {
  try {
    const response = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const findAllTickets = async () => {
  try {
    const response = await fetch(`${backendUrl}/tickets`);
    if (!response.ok) {
      throw new Error("Failed to fetch tickets");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const findAllTicketsOfUser = async (userId: number) => {
  try {
    const response = await fetch(
      `${backendUrl}/tickets/tickets-by-customer?customerId=${userId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch tickets");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const findAllUsers = async () => {
  try {
    const response = await fetch(`${backendUrl}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const upsertTicket = async (
  formData: Ticket & { isInEditMode: boolean }
) => {
  try {
    const response = await fetch(
      `${backendUrl}/tickets${formData.isInEditMode ? `/${formData.id}` : ""}`,
      {
        method: formData.isInEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Ticket ${formData.isInEditMode ? "update" : "creation"} failed`
      );
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const deleteTicket = async (ticketId: number) => {
  try {
    const response = await fetch(`${backendUrl}/tickets/${ticketId}`, {
      method: "DELETE",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Ticket deletion failed");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};
