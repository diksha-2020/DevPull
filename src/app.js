const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");


const app = express();
// Keep track of order always
app.use(express.json());


// User sign up
app.post("/signup", async(req, resp)=>{
    const user = new User(req.body);
    try {
        const result = await user.save();
        console.log("User has been created!!", result);
        resp.status(201).send(result);
    } catch(error){
        console.log("Error while creating user", error);
        resp.status(500).send("Error while creating user");
    }
});

// Get all users
app.get("/users", async (req, resp)=>{
    try {
        const users = await User.find({});
        resp.status(200).send(users);
    }catch(error){
        resp.status(500).send(error);
    }
});


// Get user by mail id
app.get("/user", async(req, resp)=>{
    try{
        const reqBody = req.body.emailId;
        const user = await User.where({emailId: reqBody});
        if(user){
            resp.status(200).send(user);
        } else {
            resp.status(204).send();
        }
    }catch(error){
        console.log(error);
        resp.status(500).send(error)
    }
});


// --------------------------------------------------------------Database and server Connection-------------------------------------
connectDB().then(()=>{
    console.log("Database connection is successfull!!");
    app.listen(3000, ()=>{
        console.log("Server is listening on port 3000...");
    })
}).catch(error=>{
    console.log("Error while connecting database", error);
});
