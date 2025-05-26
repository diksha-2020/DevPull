const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        default: "",
    },
    about:{
        type: String,
        default: "Tell about yourself..."
    },
    skils: {
        type: [String],
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;