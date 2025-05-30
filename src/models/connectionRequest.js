const mongoose = require("mongoose");
const User = require("./user");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: User,
    },
    fromUserName: {
        type: String,
        require: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: User,
    },
    toUserName: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["ignored","interested", "accepted", "rejected"],
            message: `{VALUE} is not supported`,
        }
    },
    
},
{
    timestamps: true
}
);

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(this.toUserId)){
        throw new Error("Can not send request to self!!");
    }
    next();
});

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;
