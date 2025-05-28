const jsonWebtoken = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async(req, resp, next) => {
    try {
        const {access_token} = req.cookies;
        if(!access_token){
            throw new Error("Token is not valid!!, Please login");
        } 
        const validatedToken = await jsonWebtoken.verify(access_token, "DD@PRIVETKey#25");
        if(!validatedToken){
            throw new Error("User is not authenticated!");
        } 
        const {_id} = validatedToken;
        const user = await User.findById(_id);
        if(!user){
            resp.status(401).send("User does not exist!!");
        } 
        req.user = user;
        next(); // Move to request handler for further execustion.
    } catch(error){
        resp.status(400).send(error.message);
    }
}

module.exports = {
    userAuth,
}