const router = require("express").Router();

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

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  let errors = [];

  // validations
  if (!name || !email || !password || !password2) {
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
      name,
      email,
      password,
      password2,
    });
  } else {
    res.render("dashboard", { user: { name: "Kidus" } });
  }
});

module.exports = router;
