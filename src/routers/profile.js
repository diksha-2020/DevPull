const express = require("express");

const {userAuth} = require("../middlewares/auth");
const {isProfileUpdateValid}  = require("../utils/validations");

const profileRouter = express.Router();

// Get user profile
profileRouter.get("/profile/watch", userAuth, async(req, resp, next)=>{
    try{
        const user = req.user;
        resp.send(user);
    }catch(error){
        resp.status(400).send(error);
    }
});


// Edit user profile
profileRouter.patch("/profile/edit", userAuth, async(req, resp, next)=>{
    try{
        if(!isProfileUpdateValid(req.body)){
            throw new Error("Fields are not allowed to edit!!")
        }
        const loggedinUser = req.user;
        Object.keys(req.body).forEach(key => 
           loggedinUser[key] = req.body[key]
        );
        await loggedinUser.save();
        resp.send({message:`${loggedinUser.firstName} your profile updated successfully`, data: loggedinUser});
    }catch(error){
        resp.status(400).send(error.message);
    }
});

module.exports = profileRouter;