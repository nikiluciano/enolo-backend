const mongoose = require('mongoose');

const winePressingProcess = mongoose.Schema({
    description: {
        type: String,
        required: false
    }
});

const bottlingProcess = mongoose.Schema({
    bottles_quantity: {
        type: Number,
        required: true
    },
    bottles_type: {
        type: String,
        required: true
    },
    caps_quantity: {
        type: Number,
        required: true
    },
    tags_quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const confermentProcess = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const destemmingProcess = mongoose.Schema({
    waste: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const rackingProcess = mongoose.Schema({
    description: {
        type: String,
        required: false
    }
});

const refinementProcess = mongoose.Schema({
    description: {
        type: String,
        required: false
    }
});

const winemakingProcess = mongoose.Schema({
    waste: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

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
    },
    conferment_process: {
        _id: false,
        type: confermentProcess,
        default: null
    },
    wine_pressing_process: {
        _id: false,
        type: winePressingProcess,
        default: null
    },
    destemmig_process: {
        _id: false,
        type: destemmingProcess,
        default: null
    },
    winemaking_process: {
        _id: false,
        type: winemakingProcess,
        default: null
    },
    racking_process: {
        _id: false,
        type: rackingProcess,
        default: null
    },
    refinement_process: {
        _id: false,
        type: refinementProcess,
        default: null
    },
    bottling_process: {
        _id: false,
        type: bottlingProcess,
        default: null
    }
});

module.exports = mongoose.model("wine_conferment", wineConferment);
