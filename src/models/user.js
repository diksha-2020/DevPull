const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
    },
    emailId: {
        type: String,
    }
});

const User = mongoose.Model("User", userSchema);

module.exports = User;