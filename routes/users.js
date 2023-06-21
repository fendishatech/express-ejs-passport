const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const saltRounds = 10;

function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.render("login");
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, username, password, password2 } = req.body;

  let errors = [];

  // validations
  if (!first_name || !last_name || !username || !password || !password2) {
    errors.push({ msg: "all feilds are required and can not be empty!" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match!" });
  }

  // check password length
  if (password.length < 3) {
    errors.push({ msg: "Password ,ust be at least 3 characters long!" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      first_name,
      last_name,
      username,
      password,
      password2,
    });
  } else {
    const oldUser = await User.findOne({ where: { username } });

    if (oldUser) {
      errors.push({ msg: "Username already exists" });
      res.render("register", {
        errors,
        first_name,
        last_name,
        username,
        password,
        password2,
      });
    } else {
      const user = await User.create({
        first_name,
        last_name,
        username,
        password: hashPassword(password),
        user_role: "admin",
      });

      req.flash("success_msg", "You have registered successfully");
      res.redirect("/login");
    }
  }
});

module.exports = router;
