const router = require("express").Router();
const UserController = require("../controller/user");

router.get("/", UserController.findAll);

module.exports = router;
