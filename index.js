// Required dependencies
const express = require("express");
const path = require("path");
const { v4: uuid } = require("uuid"); // For generating unique IDs
const methodOverride = require("method-override");

// App Configuration - Initialize express and set port
const app = express();
const PORT = 4000;

// Middleware Configuration
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(methodOverride("_method"));

// View Engine Setup - Configure EJS templating
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Mock Database - Array to store comments
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

// Basic Routes
app.get("/", (req, res) => {
  res.render("home"); // Render home page
});

// Comment Routes
// Display all comments
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

// Show form to create new comment
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

// Create new comment
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() }); // Add new comment with unique ID
  res.render("comments/index", { comments });
});

// Show single comment details
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

// Show edit form for specific comment
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

// Update specific comment
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

// Server Configuration
app.listen(PORT, () => {
  console.log(`Running application on PORT https://localhost:${PORT}`);
});

// API Routes Documentation
// GET /comments - list all comments
// POST /comments - Create a new comment
// GET /comments/:id - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comments/:id - Destroy one comment
