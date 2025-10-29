const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");
const authController = require("./controllers/auth.js");

const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("welcome.ejs");
});

app.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

app.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});
app.get("/newPost", (req, res) => {
  res.render("newPost.ejs");
});

app.get("/edit", (req, res) => {
  res.render("edit.ejs");
});

app.use("/auth", authController);
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
