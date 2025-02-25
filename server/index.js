const express = require("express");
const DB = require("./DB.js");
const process = require("process");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", require("./routes/user.js"));
app.use("/complaint", require("./routes/complaint.js"));

const PORT = process.env.PORT || 4000;

app.get("/ping", async (req, res) => {
  res.send("pong");
});

app.post("/login", async (req, res) => {
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  const result = await DB.query(query, [req.body.email, req.body.password]);
  if (result.length) {
    return res.json(result[0]);
  }
  return null;
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
