const express = require("express");
const path = require("path");
const { v4: uuid } = require("uuid");

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
    id: uuid(),
    username: "Todd",
    comment: "lol that is so funny!",
  },
  {
    id: uuid(),
    username: "Skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    id: uuid(),
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    id: uuid(),
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
  const { username, comment } = req.body;
  comments.push({ username, comment });
  res.render("comments/index", { comments });
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
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
