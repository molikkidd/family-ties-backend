const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bioSchema = new Schema ({ 
    profileImage: {
        type: String,
    }, 
    city: {
        type: String,
        required:true 
    },
    state:{
        type: String,
        required:true 
    },
    zipcode: {
        type: Number,
        required:true 
    },
    birthday: {
        type: Date,
        required:true 
    },
    country: {
        type: String,
        required:true 
    },
    occupation: {
        type: String,
        required:true,
    },
    mobile: {
        type: Number,
        required:true,
    },
    homePhone: {
        type: Number,
        required:true,
    }
});

const Bio = mongoose.model('Bio', bioSchema);
module.exports = Bio;