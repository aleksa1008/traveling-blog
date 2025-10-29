const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user.js")

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs")
})

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs")
})

router.get("/sign-out", (req, res) => {
   req.session.destroy(); res.redirect("/") 
})

router.post("/sign-up", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser) return res.send("Username already taken.")
    if (req.body.password !== req.body.confPassword) return res.send("Passwords must match")

    const hashed = bcrypt.hashSync(req.body.password, 10)
    await User.create({ username: req.body.username, password: hashed })
    res.redirect("/auth/sign-in")
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
})

router.post("/sign-in", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user || !bcrypt.compareSync(req.body.password, user.password))
      return res.send("Login failed. Please try again.")

    req.session.user = { username: user.username, _id: user._id }
    res.redirect(`/auth/${user.username}/mainPage`)
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
})

router.get("/newPost", (req, res) => {
  if (!req.session.user) return res.redirect("/auth/sign-in")
  res.render("newPost.ejs", { user: req.session.user })
})

router.post("/newPost", async (req, res) => {
  if (!req.session.user) return res.redirect("/auth/sign-in")
  try {
    const user = await User.findById(req.session.user._id)
    user.destinations.push({
      title: req.body.title,
      description: req.body.description,
      picture: req.body.picture || ""
    })
    await user.save()
    res.redirect(`/auth/${req.session.user.username}/mainPage`)
  } catch (err) {
    console.log(err)
    res.send("Error creating post")
  }
})

router.get("/:username/mainPage", async (req, res) => {
  if (!req.session.user) return res.redirect("/auth/sign-in");

  try {
    const allUsers = await User.find({});

    const allPosts = allUsers.flatMap(user =>
      user.destinations.map(dest => ({
        id: dest._id,
        title: dest.title,
        description: dest.description,
        picture: dest.picture,
        username: user.username,
      }))
    );

    allPosts.reverse();

    res.render("mainPage.ejs", {
      user: req.session.user,
      users: allUsers,
      posts: allPosts,
    });
  } catch (err) {
    console.log(err);
    res.render("mainPage.ejs", {
      user: req.session.user,
      users: [],
      posts: [],
    });
  }
});

router.get("/:username/edit/:postId", async (req, res) => {
  if (!req.session.user) return res.redirect("/auth/sign-in")
  try {
    const user = await User.findById(req.session.user._id)
    const post = user.destinations.id(req.params.postId)
    if (!post) return res.send("Post not found")
    res.render("editPost.ejs", { user: req.session.user, post })
  } catch (err) {
    console.log(err)
    res.send("Error loading edit form")
  }
})

router.post("/:username/edit/:postId", async (req, res) => {
  if (!req.session.user) return res.redirect("/auth/sign-in")
  try {
    const user = await User.findById(req.session.user._id)
    const post = user.destinations.id(req.params.postId)
    if (!post) return res.send("Post not found")

    post.title = req.body.title
    post.description = req.body.description
    post.picture = req.body.picture || post.picture
    await user.save()
    res.redirect(`/auth/${req.session.user.username}/mainPage`)
  } catch (err) {
    console.log(err)
    res.send("Error updating post")
  }
})

router.delete("/:username/delete/:postId", async (req, res) => {
  if (!req.session.user) return res.redirect("/auth/sign-in")
  if (req.params.username !== req.session.user.username) {
    return res.redirect(`/auth/${req.session.user.username}/mainPage`)
  }

  try {
    const currentUser = await User.findById(req.session.user._id)
    const post = currentUser.destinations.id(req.params.postId)
    if (!post) return res.send("Post not found")

    post.deleteOne()
    await currentUser.save()
    res.redirect(`/auth/${req.session.user.username}/mainPage`)
  } catch (error) {
    console.log(error)
    res.send("Error deleting post")
  }
})

module.exports = router