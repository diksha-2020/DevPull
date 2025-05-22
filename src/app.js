const express = require("express");

const app = express();

// const {adminRoutes,userRoutes} = require("./middlewares/admin");
// A Auth middleware that handles all (POST, GET, PATCH, DELETE) the req which are started with /admin and /admin/*
// app.use("/admin", adminRoutes);
// A user middleware that handles all (POST, GET, PATCH, DELETE) the req which are started with /user and /user/*
// app.use("/user", userRoutes);
app.get("/user/getUserData", (req, resp)=>{
    throw new Error("Error");
})
app.use("/", (err, req, resp, next)=>{
    if(err){
        resp.status(500).send("Something went wrong!!");
    }
    resp.send("Hello from server!!");
})



app.listen(3000, ()=>{
    console.log("Server is listning on port 3000...");
})

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