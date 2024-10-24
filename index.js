const express = require("express");
const app = express();
const PORT = 4000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Running application on PORT ${PORT}`);
});
