const express = require("express");
const expressLayouts = require("express-ejs-layouts");
// ROUTES
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const app = express();

// ROUTES
app.use("/", indexRouter);
app.use("/", usersRouter);

const PORT = 4444;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
