const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// reference models
const Users = require('../models/Users');

// local strategy - login local
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await Users.findOne({
                    where: { email,active: 1 }
                })
                // validation password
                if (!user.checkPassword(password)) {
                    return done(null, false, {
                        message: 'Password Incorrect'
                    })
                }
                // email and passsword correct
                return done(null, user);

            } catch (error) {
                // user no exist
                return done(null, false, {
                    message: 'This account does not exist'
                });
            }
        }
    )
);

// serialize user
passport.serializeUser((user, callback) => {
    callback(null, user);
});

// deserialize user
passport.deserializeUser((user, callback) => {
    callback(null, user);
});

module.exports = passport;