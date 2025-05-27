const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jsonWebToken = require("jsonwebtoken");


const User = require("./models/user");
const {validateSignUpData}  = require("./utils/validations");

const {userAuth} = require("./middlewares/auth");


const app = express();
// Keep track of order always
app.use(express.json());
app.use(cookieParser());



// User sign up
app.post("/signup", async(req, resp)=>{
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


app.post("/login", async(req, resp)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId});
        
        if(!user){
            throw new Error("Invalid login credentils!!");
        } else {
            const isPasswordValid = bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                throw new Error("Invalid login credentils!!");
            } else {
                const token = await jsonWebToken.sign({_id: user._id},"DD@PRIVETKey#25");
                resp.cookie("token", token, {maxAge: 86400000 });
                resp.status(200).send("Logged in successfully!!");
            }
        }
    } catch(error){
        console.log("Error while logging in user", error);
        resp.status(500).send("Error while login");
    }
});

app.get("/profile", userAuth, async(req, resp)=>{
    try{
        const user = req.user;
        resp.send(user);
    }catch(error){
        resp.status(400).send(error);
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
        const query = User.where({emailId: reqBody});
        const user = await query.findOne();
        if(user){
            resp.status(200).send(user);
        } else {
            resp.status(204).send();
        }
    }catch(error){
        resp.status(500).send(error)
    }
});

// Delete a user by id
app.delete("/user", async(req, resp)=>{
    try{
        const id = req.body.id;
        const user = await User.findByIdAndDelete(id);
        resp.status(200).send("User is deleted");
    }catch(error){
        resp.status(500).send(error);
    }
});

// Update the user data
app.patch("/user", async (req, resp)=>{
    try{
        const userMailId = req.body.id;
        const dataToUpdate = req.body;
        const user = await User.findByIdAndUpdate({_id : userMailId}, dataToUpdate );
        if(user){
            resp.status(200).send(user);
        } else {
            resp.status(200).send();
        }
    }catch(error){
        resp.status(500).send(error);
    }
})


// --------------------------------------------------------------Database and server Connection-------------------------------------
connectDB().then(()=>{
    console.log("Database connection is successfull!!");
    app.listen(3000, ()=>{
        console.log("Server is listening on port 3000...");
    })
}).catch(error=>{
    console.log("Error while connecting database", error);
});
