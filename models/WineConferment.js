const mongoose = require('mongoose');

const winePressingProcess = mongoose.Schema({
    description: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true,
        default: Date.now().toString()
    },
});

const bottles = mongoose.Schema({
    bottles_quantity: {
        type: Number,
        required:true
    },
    format:{
        type: String,
        required: true
    }
});

const bottlingProcess = mongoose.Schema({
    bottles: {
        _id: false,
        type : bottles
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
    },
    date: {
        type: String,
        required: true,
        default: Date.now().toString()
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
    },
    date: {
        type: String,
        required: true,
        default: Date.now().toString()
    }
});

const rackingProcess = mongoose.Schema({
    description: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true,
        default: Date.now().toString()
    }
});

const refinementProcess = mongoose.Schema({
    description: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true,
        default: Date.now().toString()
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
    },
    date: {
        type: String,
        required: true,
        default: Date.now().toString()
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
        required: true,
        default: Date.now().toString()
    },

    quantity: {
        type: Number,
        required: true
    },

    _idworker: {
        type: String,
        required: true
    },

    current_process: {
        type: String,
        enum: [null, "wine_pressing_process", "destemming_process", "winemaking_process", "racking_process", "refinement_process", "bottling_process"],
        default: null
    },

    wine_pressing_process: {
        _id: false,
        type: winePressingProcess,
        default: null
    },
    destemming_process: {
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
},{
    timestamps: {createdAt: true, updatedAt: true}
});

module.exports = mongoose.model("wine_conferment", wineConferment);
