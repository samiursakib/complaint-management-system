const router = require("express").Router();
const TicketController = require("../controller/ticket");

router.get("/", TicketController.findAll);
router.post("/", TicketController.create);

module.exports = router;
