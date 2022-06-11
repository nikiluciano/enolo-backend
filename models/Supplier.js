const mongoose = require('mongoose');

const supplier = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("supplier", supplier);
