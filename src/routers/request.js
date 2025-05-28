const express = require("express");

const {userAuth} = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async(req, resp, next)=>{
    try{

        resp.send(req.user.firstName + " is sending a connection request!!");
    }catch(error){
        resp.status(500).send("Error while sending connection request" + error.message);
    }
});

module.exports = requestRouter;