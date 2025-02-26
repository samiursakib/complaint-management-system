const mysql = require("mysql2");
const process = require("process");
require("dotenv").config();

class DB {
  constructor() {
    this.db = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE,
    });
    this.init();
  }

  init = async () => {
    try {
      this.db.connect((err) => {
        if (err) {
          throw err;
        }
        console.log("Connected!");
      });
    } catch (err) {
      console.log("connection failed");
    }
  };

  query = async (sql, params) => {
    return new Promise((resolve, reject) => {
      this.db.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

module.exports = new DB();
