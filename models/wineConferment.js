const mongoose = require('mongoose');

const wineConferment = mongoose.Schema({
    status: {
        type: String,
        enum: ["DELIVERED", "PENDING", "READY"],
        required: true
    },
    country: {
        type: String,
        required: true
    },
    supplier: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    typology: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    _idworker: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("wine_conferment", wineConferment);
