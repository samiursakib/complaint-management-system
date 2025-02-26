const UserModel = require("../model/user");

class UserController {
  findAll = async (req, res) => {
    try {
      const data = await UserModel.findAll();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = new UserController();
