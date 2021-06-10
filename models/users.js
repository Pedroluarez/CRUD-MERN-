// call mongoose
const mongoose = require('mongoose');

// created a schema on the booking database
const UserSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    zip: {
        type: String,
    },
    contact: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

// pass the schema to the database 
const Users = mongoose.model("users", UserSchema)
module.exports = Users;