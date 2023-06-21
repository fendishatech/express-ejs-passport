const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameFeild: "username" },
      async (username, password, done) => {
        // match user
        const user = await User.findOne({ where: { username } });

        if (!user) {
          return done(null, false, { message: "That email is not registerd." });
        }
        // match password
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Password or username does not match.",
          });
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    const user = await User.findOne({ where: { username } });
    done(user);
    // User.findById(id, function (err, user) {
    //   done(err, user);
    // });
  });
};
