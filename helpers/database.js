const Sequelize = require("sequelize");

const db = new Sequelize("express_ejs-passprt", "root", "", {
  host: "localhost",
  dialect: "mysql",
  // logging: false
});
module.exports = db;
