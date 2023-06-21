const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
// ROUTES
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const migrate_tables = require("./helpers/migrate_models");

// APP
const app = express();

// MIDDLEWARES
app.use(expressLayouts);
app.use(express.static("public"));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.set("layout", "layout");
app.use(express.urlencoded({ extended: false }));
// session
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);
// connect flash
app.use(flash());
// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// ROUTES
app.use("/", indexRouter);
app.use("/", usersRouter);

// DEV
// MIGRATE MODELS
// migrate_tables();

// SERVER
const PORT = 4444;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
