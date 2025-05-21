const express = require("express");

const app = express();

app.use("/test", (req, resp)=>{
    resp.send("Hello from server!!");
})

app.get("/user", (req, resp)=>{
    console.log("Users are fetched!!");
    resp.send("Fetched users!!");
});

app.post("/user", (req, resp)=>{
    console.log("User has been created!!");
    resp.send("User has been saved!!");
});

app.delete("/user", (req, resp)=>{
    console.log("User has been deleted!!");
    resp.send("User is deleted!!");
});

app.use("/", (req, resp)=>{
    resp.send("Server is on default route!!");
});


app.listen(3000, ()=>{
    console.log("Server is listning on port 3000...");
})