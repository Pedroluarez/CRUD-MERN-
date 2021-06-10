const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
// need to para ma access ang dotenv file
require('dotenv').config();

const app = express();
const port = 3001;


// import the book.js for the db
const userModel = require('./models/users')

//middleware
app.use(express.json())
app.use(cors())


// connect to mongodb
const uri = process.env.DB_URI;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database is connected");
});


// route insert a data
app.post('/insert', async (req, res, next) => {
    const fname = req.body.fname;
    const lname = req.body.lname
    const email = req.body.email
    const password = req.body.password
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state
    const country = req.body.country
    const zipCode = req.body.zipCode
    const cNumber = req.body.cNumber

    const user = new userModel({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        address: address,
        city: city,
        state: state,
        country: country,
        zip: zipCode,
        contact: cNumber,
    });
    try {
        await user.save();
        // response
        res.send("data inserted!");
    } catch (err) {
        res.send("data is not inserted. Error :" + err);
    }
});
// route read the db data
app.get('/read', async (req, res, next) => {
    userModel.find({}, (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    });
});

// bind and listen the connections on the specified host and port 
app.listen(port, () => {
    console.log(`server running in port http://localhost:${port}`)
})

// check http://localhost:3001 