const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
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
