const TicketModel = require("../model/ticket");

class TicketController {
  findAll = async (req, res) => {
    try {
      const data = await TicketModel.findAll();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  findAllByCustomer = async (req, res) => {
    try {
      const data = await TicketModel.findAllByCustomer(req.query.customerId);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  create = async (req, res) => {
    try {
      const data = await TicketModel.create(req);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  update = async (req, res) => {
    try {
      const data = await TicketModel.update(req);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  delete = async (req, res) => {
    try {
      const data = await TicketModel.delete(req);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = new TicketController();
