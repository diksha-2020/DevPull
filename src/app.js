const express = require("express");

const app = express();

app.use("/test", (req, resp)=>{
    resp.send("Hello from server!!");
})

app.listen(3000, ()=>{
    console.log("Server is listning on port 3000...");
})