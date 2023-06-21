const router = require("express").Router();

router.get("", (req, res) => {
  res.render("welcome");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { user: { name: "Kidus" } });
});
module.exports = router;
