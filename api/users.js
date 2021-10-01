// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;

// Models
const db = require('../models');

// GET api/users/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'User endpoint OK!'});
});
// GET USER PROFILE api/users/profile (Private)
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('====> inside /profile');
    console.log('====> user', req.user);
    const { id, name, email } = req.user; // object with user object inside
    res.json({ user: req.user });
});

// POST api/users/register (Public)
router.post('/register', (req, res) => {
    console.log(`/register route for >>>` ,req.body.email);
    console.log('inside of register');
    console.log(req.body);

    // console.log(db);
    db.User.findOne({ email: req.body.email })
    .then(user => {
        // if email already exits, send a 400 response
        console.log(user);
        if (user) {
            return res.status(400).json({ msg: 'Email already exists' });
        } else {
            // Create a new user
            console.log('else statement');
            const newUser = new db.User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            });
            // Salt and hash the password, then save the user
            bcrypt.genSalt(10, (err, salt) => {
                // if (err) throw Error;

                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    // if (error) throw Error;
                    // Change the password in newUser to the hash
                    newUser.password = hash;
                    newUser.save()
                    .then(createdUser => res.json(createdUser))
                    .catch(err => console.log(err));
                })
            })
        }
    })
})

// POST api/users/login (Public)
router.post('/login', async (req, res) => {
    console.log(`/login route for >>>`,req.body);
    const email = req.body.email;
    const password = req.body.password;

    // Find a user via email
    db.User.findOne({ email })
    .then(user => {
        // If there is not a user
        console.log(user);
        if (!user) {
            res.status(400).json({ msg: 'User not found'});
        } else {
            // A user is found in the database
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                // Check password for a match
                if (isMatch) {
                    console.log(isMatch);
                    // User match, send a JSON Web Token
                    // Create a token payload
                    // user.expiredToken = Date.now();
                    // await user.save();
                    const payload = {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        bio: user.bio
                        // expiredToken: user.expiredToken
                    };
                    // Sign token
                    // 3600 is one hour
                    jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
                        if (error) {
                            res.status(400).json({ msg: 'Session has ended, please log in again.'});
                        }
                        const verifyOptions = {
                            expiresIn:  60,
                        };

                        const  legit = jwt.verify(token, JWT_SECRET, verifyOptions);
                        console.log(legit);
                        console.log({
                            success: true,
                            token: `Bearer ${token}`,
                            userData: legit
                        })
                        res.json({
                            success: true,
                            token: `Bearer ${token}`,
                            userData: legit
                        });
                    });
                } else {
                    return res.status(400).json({ msg: 'Email or Password is incorrect' });
                }
            })
        }
    })
})

// GET api/users/current (Private)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('//////////////// INSIDE OF PROFILE ROUTE ////////////////');
    console.log(req)
    console.log(res.body);
    res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
    });
});
//POST api/users/edit (Private)
router.post('/edit', passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log('you have connected to the edit route on the api', req.body);
    const _id = req.body.id;
    db.User.findOne({ id: _id })
    .then(user => {
        console.log('found User in database', user);
        if (!user) {
            return res.status(400).json({ msg: 'User doesnt exist' });
        } else {
            // Update User Info
            const editData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };

            user.update(editData);

            console.log('Updating User Info', editData,);
     
        }
    })
})
module.exports = router;

