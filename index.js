const express = require("express");
const path = require("path");

// App Configuration
const app = express();
const PORT = 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Fake Database
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

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

// Comment Routes
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  console.log(req.body);
  res.send("works");
});

// Server
app.listen(PORT, () => {
  console.log(`Running application on PORT ${PORT}`);
});

// Route Documentation
// GET /comments - list all comments
// POST /comments - Create a new comment
// GET /comments/:id - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comments/:id - Destroy one comment
