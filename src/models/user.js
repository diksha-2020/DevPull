const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");

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
    skills: {
        type: [String],
    }
});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jsonWebToken.sign({_id: user._id}, "DD@PRIVETKey#25", {expiresIn: "7d"});
    return token;
};
userSchema.methods.validatePassword = async function(userInputPassword) {
    const user = this;
    const passwordHash = user.password;
    console.log("^isPasswordValid", userInputPassword, "", passwordHash);
    const isPasswordValid = await bcrypt.compare(userInputPassword, passwordHash);
    return isPasswordValid;
}
const User = mongoose.model("User", userSchema);

module.exports = User;