require('dotenv').config();
// A passport strategy for authenticating with a JSON Web Token
// This allows to authenticate endpoints using a token
// takes in an object and looks for two keys
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Option 1
// const db = require('../models');
// db.User.findById
const User = require('../models/User');

const options = {};
// key 1
// grab jwt from request, use 
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// JWT_SECRET is inside of our environment. 
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        console.log('jwt payload',jwt_payload, 'done', done);
        // Have a user that we're going to find by the id in the payload
        // When we get a user back, we will check to see if user is in database.
        User.findById(jwt_payload.id)
        .then(user => {
            // jwt_payload is an object literal that contains the decoded JWT payload
            // done is a callback that has an error first as an argument done(error, user, info)
            if (user) {
                // If a user is found, return null (for error) and the user
                return done(null, user=jwt_payload);
            } else {
                // No user was found
                return done(null, false);
            }
        })
        .catch(error => console.log(error));
    }))
}