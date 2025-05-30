const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

// Get the all pending connection requests for logged in user
userRouter.get("/user/requests/received", userAuth, async(req, response, next)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({toUserId: loggedInUser._id, status: "interested"})
        .populate("fromUserId", "_id firstName lastName age skills");;
        response.status(200).json({message:"Received requests: ", data: connectionRequests});
    }catch(error){
        response.status(400).send("Something went wrong::", error.message);
    }
});

// To get the all connections of logged in uer.
userRouter.get("/user/connections", userAuth, async(req, response, next)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({$or: [{fromUserId: loggedInUser._id ,status: "accepted"},{ toUserId: loggedInUser._id , status: "accepted"}], })
        .populate("fromUserId", "_id firstName lastName age skills").populate("toUserId", "_id firstName lastName age skills");
        response.status(200).json({message:"Accepted requests: ", data: connectionRequests});
    }catch(error){
        response.status(400).send("Something went wrong::"+error.message);
    }
});

// To get the feed
userRouter.get("/user/feed", userAuth, async(req, response, next)=>{
    try{
        const loggedInUser = req.user;
        const page = req.query.page ;
        const limitRecords = req.query.limit;
        const skipRecords = (page - 1 )*limitRecords;

        console.log("^isNaN(page)", isNaN(page));
        // TODO: Check if page and limit are of type number
        if(limitRecords > 5) {
            throw new Error("Cant fetch "+ limitRecords+ "at a time");
        } 
        if( page <= 0) {
            throw new Error("Cant fetch records");
        }
        // Find all connection request (sent + received)
        const connectionRequests = await ConnectionRequest.find({$or: [{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}]})
        .select("fromUserId toUserId");
        //Ignore the users with whome connection is present 
        const ingoreUsersFromFeed = new Set()
        
         connectionRequests.forEach(request => {
            ingoreUsersFromFeed.add(request.fromUserId.toString());
            ingoreUsersFromFeed.add(request.toUserId.toString());
        });

        const usersOnFeed = await User.find({$and: [
                {_id: {$nin: Array.from(ingoreUsersFromFeed)}},
                {_id: {$ne: loggedInUser._id}}
            ]
        }).skip(skipRecords).limit(limitRecords);

        response.send(usersOnFeed);
    }catch(error){
        response.status(400).send("Something went wrong::" + error.message);
    }
});
module.exports = userRouter;