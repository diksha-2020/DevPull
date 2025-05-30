const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");


const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const userRouter = require("./routers/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


// --------------------------------------------------------------Database and server Connection-------------------------------------
connectDB().then(()=>{
    console.log("Database connection is successfull!!");
    app.listen(3000, ()=>{
        console.log("Server is listening on port 3000...");
    })
}).catch(error=>{
    console.log("Error while connecting database", error);
});
