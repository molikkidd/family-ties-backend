const dotenv = require('dotenv');
dotenv.config();
const {User} = require('./models');
// import secret password for all the clients
const password = process.env.CLIENT_PASSWORD;
// import bcrypt to hash the password
const bcrypt = require('bcrypt');
const faker = require("faker");

async function seedDB() {
    try {
        // combine salt and hash to increase password protection
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt); 
        // empty client array
        let fakerClientsArray = [];
        // set how many clients you want to import 
        for (let i = 0; i < 1000; i++) {
        // create clients 
            let fakeClients = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
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
            // push clients into client array
            fakerClientsArray.push(fakeClients)
        }
        // add clientsArray to db
        // await User.insertMany(fakerClientsArray);
    } catch (err) {
        console.log(err.stack);
    }
}
seedDB();

const showAllUsers = async () => {
    const filteredList = [];
    // grab all the users
    const findUsers = await User.find({});
    // filter thru the Users Array
    
    console.log(findUsers);
} 
showAllUsers();



