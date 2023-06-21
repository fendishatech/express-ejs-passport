const User = require("../models/user.model");

// DEV
const migrate_tables = async () => {
  try {
    await User.sync();

    console.log("Table Migrated Successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

module.exports = migrate_tables;
