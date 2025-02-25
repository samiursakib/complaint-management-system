const express = require("express");
const DB = require("./DB.js");
const process = require("process");

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/ping", async (req, res) => {
  const result = await DB.query("SELECT 1 + 1 AS solution");
  console.log(result);
  res.send("pong");
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
