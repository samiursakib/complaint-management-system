const DB = require("../database/DB");

class AuthModel {
  login = async (req) => {
    try {
      const { email, password, role } = req.body;
      const result = await DB.query(
        `SELECT * FROM users WHERE email = ? AND password = ? AND role = ?`,
        [email, password, role]
      );
      if (result.length) {
        return result[0];
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

module.exports = new AuthModel();
