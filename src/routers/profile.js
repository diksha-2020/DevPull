const express = require("express");

const {userAuth} = require("../middlewares/auth");

const profileRouter = express.Router();
// Get user profile
profileRouter.get("/profile", userAuth, async(req, resp, next)=>{
    try{
        const user = req.user;
        resp.send(user);
    }catch(error){
        resp.status(400).send(error);
    }
});
module.exports = profileRouter;