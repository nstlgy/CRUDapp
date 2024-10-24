const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");

// views folder and ejs setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Our fake database:
let comments = [
  {
    username: "Todd",
    comment: "lol that is so funny!",
  },
  {
    username: "Skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    username: "onlysayswoof",
    comment: "woof woof woof",
  },
];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/index", (req, res) => {
  res.render("index", { comments });
});

app.listen(PORT, () => {
  console.log(`Running application on PORT ${PORT}`);
});
