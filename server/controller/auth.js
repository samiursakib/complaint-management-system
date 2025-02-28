const AuthModel = require("../model/auth");

class AuthController {
  login = async (req, res) => {
    try {
      const user = await AuthModel.login(req);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
}

module.exports = new AuthController();
