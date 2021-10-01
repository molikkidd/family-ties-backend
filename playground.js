const dotenv = require('dotenv');
dotenv.config();
const {User} = require('./models');
const password = process.env.CLIENT_PASSWORD;
const bcrypt = require('bcrypt');
const faker = require("faker");

console.log('process', process.env)
/* mySeedScript.js */
async function seedDB() {
    try {
        
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        console.log("Connected correctly to server");
        
        // make a bunch of time series data
        let fakerClientsArray = [];
        
        for (let i = 0; i < 10; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const email = faker.internet.email();
            const password = CLIENT_PASSWORD;
            
            let fakeClients = {
                firstName: firstName ,
                lastName: lastName,
                email: email,
                password: hash,
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
        }
        console.log(fakerClientsArray);
        User.insertMany(fakerClientsArray);
        console.log("Database seeded! :)");
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




