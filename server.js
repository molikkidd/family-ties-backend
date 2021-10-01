// Imports
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
require('./config/passport')(passport);
const PORT = process.env.PORT || 8000;

// API
const users = require('./api/users');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Initialize Passport and use config file
app.use(passport.initialize());

// Home route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Family Ties API' });
});

// Routes
app.use('/api/users', users);


app.listen(PORT, () => {
    console.log(`Smooth Sailing 🎧 on port: ${PORT}`);
});

