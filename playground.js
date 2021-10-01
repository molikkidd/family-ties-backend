const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const {User} = require('./models');
const {Bio} = require('./models');
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;


// (async function addBioToUser(id) {
//     try {
//         // find customer first
//         let findUser = await User.findById(id);
//         // create cards object
//         let addBio = await Bio.create({
//             city: "alunta",
//             state:"GB",
//             zipcode: 34004,
//             country: "WAK",
//             birthday: 7081900,
//             occupation: "Business Engineer",
//             mobile: 3244566779,
//             homePhone: 2324457898,
//             })
//             // saves information to the database
//             // findUser.save();
//             // // push card to creditCards Array
//             // findUser.bio.push(addBio);
//             console.log('found the USER', findUser);
//     } catch (error) {
//             console.log('this is an error from adding new bio', error)
//     }
// }("6154be36ebd1a5e94629bc2c"));
// ("6154b0ba3a25bedd2f3ee2a8")

/* mySeedScript.js */

// require the necessary libraries
// const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const faker = require("faker");

// function randomIntFromInterval(min, max) { // min and max included
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }

async function seedDB() {
    // Connection URL
    
    // Mongoose connection object
    const client = MongoClient(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
    
    try {
        
        await client.connect();
        console.log("Connected correctly to server");
        
        const collection = client.db("familyTies").collection("familyTiesBackend");
        console.log('collection',collection)
        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        // collection.drop();
        
        // make a bunch of time series data
        let fakerClientsArray = [];
        
        for (let i = 0; i < 10; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const email = faker.internet.email();
            const password = faker.internet.password();
            
            let fakeClients = {
                firstName: firstName ,
                lastName: lastName,
                email: email,
                password: password,
                bio: [
                    {
                        profileImage: faker.image.imageUrl(),
                        city: faker.address.city(),
                        state: faker.address.state(),
                        zipcode: faker.address.zipCode(),
                        birthday: faker.date.past(),
                        country: faker.address.country(),
                        occupation: faker.name.jobTitle(),
                        mobile: faker.phone.phoneNumber(),
                        homePhone:faker.phone.phoneNumber() 
                    }
                ],
            };
            fakerClientsArray.push(fakeClients)
            console.log(fakerClientsArray);
        }
        // User.collection.insertMany(fakerClientsArray);
        
        console.log("Database seeded! :)");
        // client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();
(async function findAllUsers(id) {
        try {
            // find customer first
            let findUser = await User.findById(id);
            // // push card to creditCards Array
                console.log('found this user', findUser);
        } catch (error) {
                console.log('error findn a user', error)
        }
}());

// "6156745de23e35088babed63"




