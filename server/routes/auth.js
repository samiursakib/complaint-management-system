const router = require("express").Router();
const AuthController = require("../controller/auth");

router.post("/login", AuthController.login);

module.exports = router;
