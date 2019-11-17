const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    prediction: {
        type: [Number]
    },
    coordinates: [{
        lat: {type: Number, required: true},
        lng: {type: Number, required: true}
    }],
    waypoints: [{
        lat: {type: Number},
        lng: {type: Number}
    }],
    last_updated: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('RouteModel', routeSchema );