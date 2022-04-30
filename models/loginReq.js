const mongoose = require("mongoose");
const loginReq = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("loginReq", loginReq);
