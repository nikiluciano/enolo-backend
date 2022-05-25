const mongoose = require('mongoose');

const format = mongoose.Schema({
    _id: false,

    format: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const bottles = mongoose.Schema({
    bottles_quantity: {
        type: Number,
        required:true
    },
    formats: [
        format
    ]
});

const warehouse = mongoose.Schema({
    bottles: {
         _id: false,
        type : bottles,
        required: true
    },
    caps_quantity: {
        type: Number,
        required:true
    },
    tags_quantity: {
        type: Number,
        required:true
    }
});

module.exports = mongoose.model("warehouse", warehouse);
