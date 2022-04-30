const mongoose = require("mongoose");
const loginRes = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:["ADMIN","WORKER"],
        required:true
    }
});

module.exports = mongoose.model("loginRes", loginRes);