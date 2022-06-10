const mongoose = require('mongoose');

const auth = mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    token: {
        type:String,
        required:true
    },
    refreshToken: {
        type:String,
        required:true
    }
},{
    timestamps: {createdAt: true, updatedAt: true}
});

module.exports = mongoose.model("auth",auth);
