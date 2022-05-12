const mongoose = require('mongoose');

const warehouse = mongoose.Schema({
    bottles_quantity: {
        type: Number,
        required:true
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
