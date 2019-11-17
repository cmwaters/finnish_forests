require('dotenv').config();
const mongoose = require('mongoose');
const RouteModel = require('../models/routes');
const SensorModel = require('../models/sensors');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
    console.log("Connected to database");
    setup();
    setTimeout(function() {
        db.close();
    }, 200);
});

async function setup() {
    const routes = await RouteModel.find();
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].prediction.length === 0) {
            console.log("Updating the prediction values for the route: " + routes[i].name);
            let result = await update_prediction(routes[i]);
            routes[i].prediction = result;
            routes[i].save();
        }
    }
}

async function update_prediction(route) {
    let prediction_values = [];
    let closest_sensor = await find_closest_sensor(route);
    let now = new Date;
    let day = 6;
    if (now.getDay() !== 0) {
        day = now.getDay() - 1;
    }
    let daily_factor = closest_sensor.daily[day];
    let monthly_factor = closest_sensor.monthly[now.getMonth()];
    for (let i = 5; i <= 20; i++) {
        let prediction = ((closest_sensor.hourly[i]/365) + (daily_factor/52/24) + (monthly_factor/30/24))/3;
        prediction_values.push(prediction);
    }
    return prediction_values;
}

async function find_closest_sensor(route) {
    let shortest_distance = null;
    let chosen_sensor = null;
    let sensors = await SensorModel.find();
    for (let i = 0; i < sensors.length; i++) {
        let distance = Math.pow(Math.pow((sensors[i].latitude - route.coordinates[0].lat),2)
            + Math.pow((sensors[i].longitude - route.coordinates[0].lng),2), 0.5);
        if (shortest_distance === null || distance < shortest_distance) {
            shortest_distance = distance;
            chosen_sensor = sensors[i];
        }
    }
    return chosen_sensor;
}

