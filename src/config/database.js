const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://dikshadeshmukh2016:oVwGgdkG4mRFksrw@democlustor.flgy9rq.mongodb.net/devpull");
}

module.exports=connectDB;
