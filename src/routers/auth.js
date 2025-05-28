const express = require("express");
const bcrypt = require("bcrypt");

const {validateSignUpData}  = require("../utils/validations");
const User = require("../models/user");


const authRouter = express.Router();

// User sign up
authRouter.post("/signup", async(req, resp, next)=>{
    const user = new User(req.body);
    try {
        validateSignUpData(req);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        const result = await user.save();
        console.log("User has been created!!", result);
        resp.status(201).send(result);
    } catch(error){
        console.log("Error while creating user", error);
        resp.status(500).send("Error while creating user");
    }
});

// User login
authRouter.post("/login", async(req, resp, next)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId});
        
        if(!user){
            throw new Error("Invalid login credentils!!");
        } else {
            const isPasswordValid = await user.validatePassword(password);
            if(!isPasswordValid){
                throw new Error("Invalid login credentils!!");
            } else {
                const token = await user.getJWT();
                resp.cookie("access_token", token, {expires: new Date(Date.now() + 3600000)});
                resp.status(200).send("Logged in successfully!!");
            }
        }
    } catch(error){
        console.log("Error while logging in user", error);
        resp.status(500).send("Error while login");
    }
});

// User logout
authRouter.delete("/logout", async(req, resp, next)=>{
    try{
        // TODO: Clean up from DB or other resourse used by user
        resp.cookie("access_token", null, {expires: new Date(Date.now())}).send("Successfully logged out!!");
    }catch(error){
        resp.status(500).send("Error while logging out" + error.message);
    }
});

// Forget password
authRouter.patch("/forgetPassword", async(req, resp, next)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId});
        if(!user){
            throw new Error("MailId is not associated with any user!");
        }
        const passwordHashToUpdate = await bcrypt.hash(password, 10);
        user.password = passwordHashToUpdate;
        await user.save();
        resp.send(`${user.firstName} , your password reset done successfully!!`);
    }catch(error){
        resp.status(400).send(error.message);
    }
});

module.exports = authRouter;