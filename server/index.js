const express = require("express");
const process = require("process");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/auth.js"));
app.use("/user", require("./routes/user.js"));
app.use("/complaint", require("./routes/complaint.js"));

const PORT = process.env.PORT || 4000;

app.get("/ping", async (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
