const DB = require("../database/DB");

class UserModel {
  findAll = async () => {
    try {
      const query = `SELECT * FROM users`;
      const result = await DB.query(query);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

module.exports = new UserModel();
