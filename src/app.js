const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
// Keep track of order always


app.post("/signup", async(req, resp)=>{
    console.log("User has been created!!"); 
    const user = new User({
        firstName: "Diksha",
        lastName: "Deshmukh",
        age: 23,
        password: "Diksha@123",
    });
    try{
        const result = await user.save();
        console.log("User has been created!!", result);
        resp.status(201).send(result);
    }catch(error){
        console.log("Error while creating user", error);
        resp.status(500).send("Error while creating user");
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



// -----------------------------------------------------------Route Handling-----------------------------------------------
// app.use("/test", (req, resp)=>{
//     resp.send("Hello from server!!");
// })

// app.get("/user/:userId/:name/:password", (req, resp)=>{
//     console.log("User data is fetched!!");
//     const reqData = req.params;
//     resp.send(reqData);
// });

// app.post("/user", (req, resp)=>{
//     console.log("User has been created!!");
//     resp.send("User has been saved!!");
// });

// app.delete("/user", (req, resp)=>{
//     console.log("User has been deleted!!");
//     resp.send("User is deleted!!");
// });

// app.use("/", (req, resp)=>{
//     resp.send("Server is on default route!!");
// });



// -----------------------------------------------------------Middlewares-------------------------------------------------
// const {adminRoutes,userRoutes} = require("./middlewares/admin");
// A Auth middleware that handles all (POST, GET, PATCH, DELETE) the req which are started with /admin and /admin/*
// app.use("/admin", adminRoutes);
// A user middleware that handles all (POST, GET, PATCH, DELETE) the req which are started with /user and /user/*
// app.use("/user", userRoutes);

// ------------------------------------------------------------Error Handling----------------------------------------------
// app.get("/user/getUserData", (req, resp)=>{
//     throw new Error("Error");
// });


// app.use("/", (err, req, resp, next)=>{
//     if(err){
//         resp.status(500).send("Something went wrong!!");
//     }
//     resp.send("Hello from server!!");
// });





