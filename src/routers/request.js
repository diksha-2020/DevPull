const express = require("express");

const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req, resp, next)=>{
    try{
        const ALLOWED_STATUS = ["ignored","interested"];
        const status = req.params.status;

        if(!ALLOWED_STATUS.includes(status)){
            return resp.status(400).json({message: "Inavalid status type: " + status});
        }

        const user = req.user;
        const fromUserId = user._id;
        const fromUserName = user.firstName;
        const toUserId = req.params.toUserId;

        
        const existingConnectionReq = await ConnectionRequest.findOne({$or: [{fromUserId, toUserId},{fromUserId: toUserId, toUserId: fromUserId}]});
        if(existingConnectionReq){
            return resp.status(400).send({message: "ConnectionrRequest is already present"});
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return resp.status(400).json({message: "User does not exist to send request", toUser: toUser});
        }
        const toUserName = toUser.firstName;
        
        const connectionRequest = new ConnectionRequest({fromUserId, fromUserName, toUserId, toUserName, status});
        
        const connectionRequestData = await connectionRequest.save();
        resp.status(200).json({message: `${fromUserName} ${status === "interested" ? `is ${status} in ${toUserName}` : `${status} the connection request of ${toUserName}`}`, connectionRequestData});

    }catch(error){
        resp.status(500).json({message: "Error while sending connection request ",error: error.message});
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, resp, next)=>{
    try{
        const ALLOWED_STATUS = ["accepted","rejected"];
        const status = req.params.status;
        const requestId = req.params.requestId;

        if(!ALLOWED_STATUS.includes(status)){
            return resp.status(400).json({message: "Inavalid status type: " + status});
        } 

        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId : loggedInUser._id,
            status: "interested"
        });

        if(!connectionRequest){
            return resp.status(401).json({message: "Invalid request", connectionRequest});
        }

         
        if(connectionRequest.status !== "interested" ){
            return resp.status(400).json({message: "Can not handle the request", status});
        }
        connectionRequest.status = status;

        const updatedConnectionRequest = await connectionRequest.save();

        resp.status(200).json({message: `${updatedConnectionRequest.fromUserName} ${status } the connection request of ${updatedConnectionRequest.toUserName}}`, updatedConnectionRequest});

    }catch(error){
        resp.status(500).send("Error reviewing checking requests " + error.message);
    }
});



module.exports = requestRouter;