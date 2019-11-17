require('dotenv').config();
const mongoose = require('mongoose');
const routes = require("./data");
const RouteModel = require('../models/routes');
const SensorModel = require('../models/sensors');
const json_data = require('../../data/counter_simple');
let sensor_data = json_data;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
    console.log("Connected to database");
    populate();
    setTimeout(function() {
        db.close();
    }, 200);
});

function populate() {
    for (let i = 0; i < routes.length; i++) {
        try {
            let route = new RouteModel({
                name: routes[i].name,
                status: routes[i].status,
                coordinates: routes[i].coordinates,
                waypoints: routes[i].waypoints,
                duration: routes[i].duration,
                alerts: routes[i].alerts,
            });
            route.save()
        } catch (e) {
            console.log(e.message);
        }
    }
    for (let j = 0; j < sensor_data.length; j++) {
        try {
            let sensor = new SensorModel({
                latitude: sensor_data[j].latitude,
                longitude: sensor_data[j].longitude,
                hourly: sensor_data[j].hourly,
                daily: sensor_data[j].daily,
                monthly: sensor_data[j].monthly
            });
            sensor.save()
        } catch (e) {
            console.log(e.message);
        }
    }
}


