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
    coordinates: {
        type: [[Number]],
        required: true
    }

});

module.exports = mongoose.model('RouteModel', routeSchema );