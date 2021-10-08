require('dotenv').config();
const mongoose = require('mongoose');
// const { MONGO_URI } = require('../config/keys');
// Mongo connection
let connectionString;

if(process.env.NODE_ENV === 'production') {
    connectionString = process.env.DB_URL
} else {
    connectionString = process.env.MONGO_URI
}
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});
// Mongoose connection object
const db = mongoose.connection;

// Set up an event listener that will fire once the connection opens for the DB
// Log to the terminal what host and port we are on.
db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database error\n ${error}`);
});

module.exports.User = require('./User');
module.exports.Bio = require('./Bio');
// module.export.Player = require('./Player');