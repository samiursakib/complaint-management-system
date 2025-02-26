const DB = require("../database/DB");

class TicketModel {
  findAll = async () => {
    try {
      const query = `SELECT * FROM tickets ORDER BY created_at DESC`;
      const result = await DB.query(query);
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
      console.log(ticketInsertResult);
      return { success: true, message: "Ticket created successfully" };
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

module.exports = new TicketModel();
