const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    hourly: {
        type: [Number],
        required: true
    },
    daily: {
        type: [Number],
        required: true
    },
    monthly: {
        type: [Number],
        required: true
    }

});

module.exports = mongoose.model('SensorModel', sensorSchema );