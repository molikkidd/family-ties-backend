# family-ties-backend

# `Family-Ties Backend`

It is an Express authentication based application using Passport + Flash messages + custom middleware

## What it includes

* Mongoose User model / migration
* Settings for MongoDB
* Passport and passport-jwt for authentication
* Sessions to keep user logged in between pages
* Flash messages for errors and successes
* Passwords that are hashed with BCrypt
* REACT JS FrameWork

### User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| firstName | String | Must be provided |
| lastName | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |
| bio | String | An Array of items|
| albums | String | An Array of objects |
| timesLoggedIn | Number | An Array of items|
| date | Date | An Array of objects |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Bio Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| profileImage | String | Must be provided |
| city | String | Must be provided |
| state | String | Must be provided |
| zipcode | String | Must be provided |
| birthday | String | Must be provided |
| country | String | Must be provided |
| occupation | String | Must be provided |
| mobile | String | Must be provided |
| homePhone | String | Must be provided |
| userId | String | foreignKey from user |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Auth Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home page |
| GET | /api/users/profile | users.js | Profile Page |
| POST | /api/users/register | users.js | Signup User |
| POST | /api/users/login | users.js | Login user |
| GET | /api/users/current | users.js | Inside Profile |
| POST | /api/users/edit | users.js | Handle Edit Data |

## `1` Fork & Clone Project & Install Dependencies

`1` The first thing that we are going to do is `fork` and `clone`

`2` Now we are going to install the current dependencies that are listed inside of `package.json`, They will be used for `authentication`. Those are the following packages:

```text
npm install axios bcrypt bcryptjs cors dotenv express json-web-token mongoose passport passport-jwt 

```

- [axios](https://github.com/axios/axios):
  Promise based HTTP client for the browser and node.js 
-  [bcryptjs](https://www.npmjs.com/package/bcryptjs): 
  A library to help you hash passwords. ([wikipedia](https://en.wikipedia.org/wiki/Bcryptjs)) 
  Blowfish has a 64-bit block size and a variable key length from 32 bits up to 448 bits.
- [dotenv](https://github.com/motdotla/dotenv):
  Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
- [express](https://github.com/expressjs/express):
  ExpressJS is a web application framework that provides you with a simple API to build websites, web apps and back ends.
- [json-web-token](https://github.com/joaquimserafim/   json-web-token): They are little packages of data that can be stored on the client, and used to verify a valid session
- [mongoose](https://github.com/brianc/node-postgres):
  It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB- [passport](https://www.passportjs.org/docs/): 
  Passport is authentication middleware for Node.js. It is designed to do one thing authenticate requests. There are over 500+ strategies used to authenticate a user; however, we will be using one - *passport-local* Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests
- [passport-jwt](http://www.passportjs.org/packages/passport-jwt/):  
  The authentication strategy authenticates users using a username and password. The strategy requires a json web token that holds the header, payload and signature of the strategy

`3` Make a commit

```text
git add .
git commit -m "Install dependencies for project"
```

## `2` Create config folder, passport.js file and `.env`

passport.js will store the logic for our authentication of the users data, (password), by using a json web token.

`1` Create .env file to store your JWT_SECRET=...

```env
  JWT_SECRET=entersecretpasswordhere
```

Update your passport.js with the following code

`2` Update **`config.json`** file with the following:

```js
require('dotenv').config();
// A passport strategy for authenticating with a JSON Web Token
// This allows to authenticate endpoints using a token
// takes in an object and looks for two keys
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;
module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        console.log('jwt payload',jwt_payload, 'done', done);
        User.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                return done(null, user=jwt_payload);
            } else {
                return done(null, false);
            }
        })
        .catch(error => console.log(error));
    }))
}
```

`2` Create database `family-ties`

```text
use FAMILY_TIES
```

## `3` Analyze File Structure

```text
├── api
│   └── users.js
├── config
│   └── passport.js
├── models
│   └── Bio.js
│   └── Index.js
│   └── User.js
├── node_modules
│   └── ...
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── seedDb.js
├── server.js
```

- `api`: The folder where all of your controllers ( routes ) will go to control the logic of your app.
- `config`: Where you need to configure your project to interact with your postgres database and passport localStrategy.
- `models`: The folder where all the models will be stored that will interact with the database.
- `node_modules`: The folder that is generated by **npm** that stores the source code for all dependencies installed.
- `public`: is to have those views that would be publicly accessible in the application. ex. `style.css`
- `test`: The folder where all your test that you make will be stored. ex. `auth.test.js`
- `views`: The folder where all the app's templates will be stored for displaying pages to the user. ex. `login.ejs`
- `.gitignore`: A hidden file that will hide and prevent any files with to NOT get pushed to Github.
- `package-lock.json`: is automatically generated for any operations where npm modifies either the `node_modules` tree, or `package.json`.
- `package.json`: The settings file that stores scripts and list of dependencies that are used inside your app.
- `README.md`: The main markdown file that written to explain the details your app.
- `server.js`: The main file that controls the entire application.

## `4` Create `user` Model & Add Validations

`1` Create a collection in your db to add your models 

```text
use family-ties
db.createCollection("family-ties-backend")
```

`2` Create models folder and add `User`and `Bio` models

```text
User Model:
 firstName:string,lastName:string,email:string,password:string,bio:[], albums: [{albumName: string}, albumsPics:[]], timesLoggedIn: Integer, date: Date

Bio Model:
profileImage: string,city:string, state:string,zipcode:Integer,birthday:Integer,country:string, occupation:string, mobile:Number, homePhone:Number
```

`3` Add **validations** for `User` model

Validations are used as constraints for a column in a table that requires an entry in the database to follow various rules set in order for that data to be entered into the database.
Add following to models/user.js
Repeat for Bio Model

```js
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    bio: [],
    albums: [
        {
            albumName: {type: String, required: true},
            albumPics: []
        }
    ],
    timesLoggedIn: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
const User = mongoose.model('User', userSchema);
module.exports = User;
```

`4` Make a *commit* message
```text
git add .
git commit -m "add: User models and validations"
```

## `5` Create `server.js` file for the apps main endpoints for the clients to connect to. 

`1` Import the required dependicies, express as the server, cors will assist with cross origin resource sharing between browsers and application and passport with authenticate the users data 

```js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
require('./config/passport')(passport);
const PORT = process.env.PORT || 8000;
```

Then connect your `users.js` file to the main server
while telling the app to use following dependencies.

Add the following code to the server file below

```js
const users = require('./api/users');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
```

Add your home/index route to the api and set the port

```js
// Home route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Family Ties API' });
});
app.use('/api/users', users);
app.listen(PORT, () => {
    console.log(`Smooth Sailing 🎧 on port: ${PORT}`);
});
```

## `6` Create `users.js` file and endpoints for the `User` Model to Hash Password, Etc.

`1` Create `api` folder Import `express`, `bcryptjs` and other auth dependencies to the top the users.js file.

```js

require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('json-web-token');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;
```

`2` Create a route to signUp/register the User and hash **password** inside `User` model 

Inside of the users.js, add the following code to hash password

```js
router.post('/register', (req, res) => {
    db.User.findOne({ email: req.body.email })
    .then(user => {
        // if email already exits, send a 400 response
        if (user) {
            return res.status(400).json({ msg: 'Email already exists' });
        } else {
            // Create a new user
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
```

## `7` Create login route for the `User`

```js
router.post('/login', async (req, res) => {
    console.log(`/login route for >>>`,req.body);
    const email = req.body.email;
    const password = req.body.password;
}
```

`1` Within the login route, add the logic for login. Find the user in the database by its email. Then Check if the password is `validPassword()` by comparing the password entered with the hashed password

```js
 // Check the password on Log-In and compare it to the hashed password in the DB
db.User.findOne({ email })
.then(user => {
    // If there is not a user
    console.log(user);
    if (!user) {
        res.status(400).json({ msg: 'User not found'});
    } else {
        // A user is found in the database
        bcrypt.compare(password, user.password)
        .then(async isMatch => {
            // Check password for a match
                if (isMatch) {
                    console.log(isMatch);
                    const familyMembers = await db.User.find({
                        lastName: user.lastName
                    });           
                    const payload = {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        bio: user.bio,
                        familyMembers: familyMembers,
                        albums: user.albums
                    };
                  }
        }
    }
}
```

`2` After the user has been identified, Encode a JWT to encrypt the data. Send decoded data to front end.

```js
jwt.encode( JWT_SECRET, payload, (error, token) => {
    if (error) {
        res.status(400).json({ msg: 'Session has ended, please log in again.'});
    }
    console.log('token in jwt sign in', token )
    // decode
    jwt.decode(JWT_SECRET,token,function(err_, decodedPayload, decodedHeader) {
        if(err_) {
            console.error(err_.name, err.message);
        } else {
            console.log('decodepayload', decodedPayload, decodedHeader);
            console.log({
                success: true,
                token: `Bearer ${token}`,
                userData: decodedPayload
            })
            res.json({
                success: true,
                token: `Bearer ${token}`,
                userData: decodedPayload
            });
        }
    });
}
```

INSERT UPDATED SCREEN SHOT BELOW

`3` Verify that model looks like the following code snippet ( [here](https://github.com/romebell/express_authentication/blob/main/solutions.md#1-userjs) )


## `8` Create `index.js` inside `models` folder

The index model is responsible for connecting our models to the mongo database. The index uses the mongoose object document mapper to connect to mongodb.

`1` Require Mongoose and the .env files. Create an undefined variable called connectionString which allows you to conditional set the value for development and production databases.

```js
require('dotenv').config();
const mongoose = require('mongoose');
let connectionString;

if(process.env.NODE_ENV === 'production') {
    connectionString = process.env.DB_URL
} else {
    connectionString = process.env.MONGO_URI
}

```

`2` Connect your database to your application then assign the connection to a variable

```js
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

const db = mongoose.connection;
```

`3` Set up an event listener that will fire once the connection opens for the DB. Export database models to application.

```js
db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database error\n ${error}`);
});

module.exports.User = require('./User');
module.exports.Bio = require('./Bio');
```

## `7` Edit user data

Create edit route for users data then search for user by its mongo _id and update the requested data.

```js
router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('you have connected to the edit route on the api', req.body);
    const _id = req.body.id;
    db.User.findById({ _id })
    .then(async user => {
        console.log('found User in database', user);
        if (!user) {
            return res.status(400).json({ msg: 'User doesnt exist' });
        } else {
            // Update User Info    
            user.firstName = req.body.firstName || user.firstName
            user.lastName = req.body.lastName || user.lastName
            user.email = req.body.email || user.email
            user.password = req.body.password || user.password
            // save information
            await user.save();
            // then convert to json 
            res.json({user});
            console.log('Updating User Info');
     
        }
    })
})

module.exports = router;
```

## `9` Start App and Debug

`1` Start up server and test app

```text
npm start 
or 
nodemon
```

`2` Complete any debugging that needs to happen.

`3` Push final changes to Github.

`4` Make this repo a **Template** on Github for future projects (i.e. Project 3) ✅
