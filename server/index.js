const express = require("express");
const process = require("process");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use("/auth", require("./routes/auth.js"));
app.use("/users", require("./routes/user.js"));
app.use("/tickets", require("./routes/ticket.js"));

const PORT = process.env.PORT || 4000;

app.get("/ping", async (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
