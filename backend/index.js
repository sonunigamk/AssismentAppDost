import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("you are on home route");
});

app.listen(PORT, console.log(`the server is running on port ${PORT}`));
