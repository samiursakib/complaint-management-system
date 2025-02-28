const router = require("express").Router();
const TicketController = require("../controller/ticket");

router.get("/", TicketController.findAll);
router.get("/tickets-by-customer", TicketController.findAllByCustomer);
router.post("/", TicketController.create);
router.put("/:id", TicketController.update);
router.patch("/:id", TicketController.statusUpdate);
router.delete("/:id", TicketController.delete);
router.post("/feedback", TicketController.postFeedback);

module.exports = router;
