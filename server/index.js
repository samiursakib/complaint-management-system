import express from "express";

const app = express();

const PORT = import.meta.env?.PORT || 4000;

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
