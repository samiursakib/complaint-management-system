const DB = require("../database/DB");

class TicketModel {
  findAll = async () => {
    try {
      const query = `
        SELECT
          t.id,
          t.subject,
          t.description,
          t.status,
          t.customer,
          t.executive,
          t.feedback,
          CONVERT_TZ(t.created_at, 'UTC', '+06:00') AS created_at,
          u.full_name
        FROM tickets t
        JOIN users u
        ON t.customer = u.id
        ORDER BY created_at DESC
      `;
      const result = await DB.query(query);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  findAllByCustomer = async (id) => {
    try {
      const query = `
        SELECT
          t.id,
          t.subject,
          t.description,
          t.status,
          t.customer,
          t.executive,
          t.feedback,
          CONVERT_TZ(t.created_at, 'UTC', '+06:00') AS created_at
        FROM tickets t
        WHERE customer = ?
        ORDER BY created_at DESC
      `;
      const result = await DB.query(query, [id]);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  create = async (req) => {
    try {
      const { subject, description, customer, executive } = req.body;
      const ticketInsertQuery = `
        INSERT INTO tickets (
          subject,
          description,
          customer,
          executive
        ) VALUES (?, ?, ?, ?)`;
      const ticketInsertResult = await DB.query(ticketInsertQuery, [
        subject,
        description,
        customer,
        executive,
      ]);
      if (ticketInsertResult.affectedRows === 0) {
        return { success: false, message: "Ticket creation failed" };
      }
      return { success: true, message: "Ticket created successfully" };
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  update = async (req) => {
    try {
      const { id } = req.params;
      const { subject, description, executive } = req.body;
      const ticketUpdateQuery = `
        UPDATE tickets
        SET
          subject = ?,
          description = ?,
          executive = ?
        WHERE id = ?`;
      const ticketUpdateResult = await DB.query(ticketUpdateQuery, [
        subject,
        description,
        executive,
        id,
      ]);
      if (ticketUpdateResult.affectedRows === 0) {
        return { success: false, message: "Ticket update failed" };
      }
      return { success: true, message: "Ticket updated successfully" };
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  delete = async (req) => {
    try {
      const { id } = req.params;
      const ticketDeleteQuery = `DELETE FROM tickets WHERE id = ?`;
      const ticketDeleteResult = await DB.query(ticketDeleteQuery, [id]);
      if (ticketDeleteResult.affectedRows === 0) {
        return { success: false, message: "Ticket deletion failed" };
      }
      return { success: true, message: "Ticket deleted successfully" };
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  statusUpdate = async (req) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log(id, status);

      const ticketStatusUpdateQuery = `UPDATE tickets SET status = ? WHERE id = ?`;
      const ticketStatusUpdateResult = await DB.query(ticketStatusUpdateQuery, [
        status,
        id,
      ]);
      if (ticketStatusUpdateResult.affectedRows === 0) {
        return { success: false, message: "Ticket status update failed" };
      }
      return { success: true, message: "Ticket status updated successfully" };
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  postFeedback = async (req) => {
    try {
      const { ticketId, feedback } = req.body;
      const ticketFeedbackUpdateQuery = `UPDATE tickets SET feedback = ? WHERE id = ?`;
      const ticketFeedbackUpdateResult = await DB.query(
        ticketFeedbackUpdateQuery,
        [feedback, ticketId]
      );
      if (ticketFeedbackUpdateResult.affectedRows === 0) {
        return { success: false, message: "Feedback sending failed" };
      }
      return { success: true, message: "Feedback sent successfully" };
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

module.exports = new TicketModel();
